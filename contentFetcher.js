/**
 * contentFetcher.js - 全文内容抓取模块
 * 支持网站：人民网健康、HIT专家网、国家卫健委
 * 功能：抓取文章全文内容 + 内存缓存
 */

const axios = require('axios');
const cheerio = require('cheerio');

// 内存缓存 { url: { content, fetchTime } }
const contentCache = new Map();
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6小时缓存

// 通用请求配置
const REQUEST_CONFIG = {
    timeout: 15000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
    }
};

/**
 * 清理HTML内容，提取纯文本
 */
function cleanHtml(html) {
    return html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<p[^>]*>/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#\d+;/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/[ \t]+/g, ' ')
        .trim();
}

/**
 * 网站特定内容提取规则
 */
const SITE_EXTRACTORS = {
    // 人民网健康
    'health.people.com.cn': {
        extract: ($) => {
            // 人民网健康文章内容通常在 .box_con 或 .article 内容区
            let content = '';
            
            // 尝试多种选择器
            const selectors = ['.box_con', '.article_content', '#p_content', '.text_c'];
            for (const sel of selectors) {
                const el = $(sel);
                if (el.length && el.text().trim().length > 100) {
                    content = el.html();
                    break;
                }
            }
            
            // 如果都没找到，尝试获取 rm_txt_con 类
            if (!content) {
                const el = $('.rm_txt_con');
                if (el.length) content = el.html();
            }
            
            return cleanHtml(content || '');
        }
    },
    
    // HIT专家网
    'www.hit180.com': {
        extract: ($) => {
            let content = '';
            const selectors = ['.entry-content', '.post-content', 'article .content'];
            for (const sel of selectors) {
                const el = $(sel);
                if (el.length && el.text().trim().length > 100) {
                    content = el.html();
                    break;
                }
            }
            return cleanHtml(content || '');
        }
    },
    
    // 国家卫健委
    'www.nhc.gov.cn': {
        extract: ($) => {
            let content = '';
            const selectors = ['.con', '.article', '#content', '.content'];
            for (const sel of selectors) {
                const el = $(sel);
                if (el.length && el.text().trim().length > 100) {
                    content = el.html();
                    break;
                }
            }
            return cleanHtml(content || '');
        }
    }
};

/**
 * 获取网站域名
 */
function getDomain(url) {
    try {
        const matches = url.match(/^https?:\/\/([^\/]+)/);
        return matches ? matches[1] : '';
    } catch {
        return '';
    }
}

/**
 * 获取文章全文内容
 * @param {string} url - 文章URL
 * @param {boolean} forceRefresh - 是否强制刷新缓存
 * @returns {Promise<{success: boolean, content: string, error?: string}>}
 */
async function fetchFullContent(url, forceRefresh = false) {
    if (!url || !url.startsWith('http')) {
        return { success: false, content: '', error: '无效的URL' };
    }
    
    // 检查缓存
    if (!forceRefresh && contentCache.has(url)) {
        const cached = contentCache.get(url);
        if (Date.now() - cached.fetchTime < CACHE_TTL) {
            return { success: true, content: cached.content, fromCache: true };
        }
        contentCache.delete(url);
    }
    
    try {
        const response = await axios.get(url, REQUEST_CONFIG);
        const $ = cheerio.load(response.data);
        
        // 获取域名，选择对应的提取器
        const domain = getDomain(url);
        let content = '';
        
        // 查找匹配的提取器
        let matchedExtractor = null;
        for (const [pattern, extractor] of Object.entries(SITE_EXTRACTORS)) {
            if (domain.includes(pattern) || pattern.includes(domain)) {
                matchedExtractor = extractor;
                break;
            }
        }
        
        if (matchedExtractor) {
            content = matchedExtractor.extract($);
        } else {
            // 通用提取：尝试常见的文章内容选择器
            const genericSelectors = [
                'article', '.article', '.post-content', '.entry-content',
                '.content', '#content', '.main-content', '.article-content',
                '.news-content', '.detail-content'
            ];
            for (const sel of genericSelectors) {
                const el = $(sel);
                if (el.length && el.text().trim().length > 100) {
                    content = cleanHtml(el.html() || '');
                    break;
                }
            }
        }
        
        // 如果内容太短，可能提取失败
        if (content.length < 50) {
            return { success: false, content: '', error: '内容提取失败或内容过短' };
        }
        
        // 存入缓存
        contentCache.set(url, { content, fetchTime: Date.now() });
        
        return { success: true, content, fromCache: false };
    } catch (error) {
        return { success: false, content: '', error: error.message };
    }
}

/**
 * 批量获取文章内容（带并发控制）
 * @param {Array<{url: string}>} items - 文章列表
 * @param {number} concurrency - 并发数
 * @returns {Promise<Array>} - 带有 content 字段的文章列表
 */
async function fetchBatchContent(items, concurrency = 3) {
    const results = [];
    
    for (let i = 0; i < items.length; i += concurrency) {
        const batch = items.slice(i, i + concurrency);
        const promises = batch.map(async (item) => {
            if (!item.url && !item.link) return { ...item, content: item.content || item.description || '' };
            
            const url = item.url || item.link;
            const result = await fetchFullContent(url);
            
            return {
                ...item,
                content: result.success ? result.content : (item.content || item.description || ''),
                contentFetched: result.success,
                fromCache: result.fromCache || false
            };
        });
        
        const batchResults = await Promise.all(promises);
        results.push(...batchResults);
        
        // 批次间延迟，避免被限流
        if (i + concurrency < items.length) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    
    return results;
}

/**
 * 清理过期缓存
 */
function cleanCache() {
    const now = Date.now();
    for (const [url, cached] of contentCache) {
        if (now - cached.fetchTime > CACHE_TTL) {
            contentCache.delete(url);
        }
    }
}

// 每30分钟清理一次缓存
setInterval(cleanCache, 30 * 60 * 1000);

/**
 * 获取缓存统计
 */
function getCacheStats() {
    return {
        size: contentCache.size,
        entries: Array.from(contentCache.entries()).map(([url, data]) => ({
            url: url.substring(0, 80),
            contentLength: data.content.length,
            ageMinutes: Math.round((Date.now() - data.fetchTime) / 60000)
        }))
    };
}

module.exports = {
    fetchFullContent,
    fetchBatchContent,
    cleanCache,
    getCacheStats
};
