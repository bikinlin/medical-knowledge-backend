const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const schedule = require('node-schedule');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let newsData = [
    {
        id: 1,
        title: "国家卫健委发布《医院信息化建设标准与规范》",
        source: "国家卫生健康委员会",
        date: "2026-05-08",
        url: "https://www.nhc.gov.cn"
    },
    {
        id: 2,
        title: "新版《医疗建筑智能化系统设计标准》GB51348-2025正式实施",
        source: "住房和城乡建设部",
        date: "2026-05-05",
        url: "https://www.mohurd.gov.cn"
    },
    {
        id: 3,
        title: "关于推进智慧医院建设的指导意见",
        source: "国家发改委",
        date: "2026-04-28",
        url: "https://www.ndrc.gov.cn"
    },
    {
        id: 4,
        title: "医疗数据安全管理办法出台，强化患者隐私保护",
        source: "国家网信办",
        date: "2026-04-20",
        url: "https://www.cac.gov.cn"
    },
    {
        id: 5,
        title: "医保信息化建设三年行动计划启动",
        source: "国家医保局",
        date: "2026-04-15",
        url: "https://www.nhsa.gov.cn"
    },
    {
        id: 6,
        title: "医院弱电系统工程验收规范更新",
        source: "中国工程建设标准知识服务网",
        date: "2026-04-10",
        url: "https://www.ccsn.org.cn"
    }
];

let techData = [
    {
        id: 1,
        title: "5G技术在远程手术与医疗弱电系统中的应用突破",
        tags: ["5G", "远程医疗", "弱电系统"],
        source: "医疗技术前沿",
        date: "2026-05-10"
    },
    {
        id: 2,
        title: "AI辅助诊断系统准确率突破95%，智慧医院加速落地",
        tags: ["AI", "智慧医院", "诊断"],
        source: "医疗信息化",
        date: "2026-05-06"
    },
    {
        id: 3,
        title: "新型医用物联网传感器助力医院弱电智能化升级",
        tags: ["物联网", "弱电智能化", "传感器"],
        source: "医疗器械创新",
        date: "2026-05-01"
    },
    {
        id: 4,
        title: "区块链技术在医疗数据共享与弱电安防中的应用",
        tags: ["区块链", "数据安全", "安防"],
        source: "医疗信息化",
        date: "2026-04-28"
    },
    {
        id: 5,
        title: "智能病房管理系统全面升级，集成护理呼叫与信息发布",
        tags: ["智能病房", "护理呼叫", "信息发布"],
        source: "智慧医院",
        date: "2026-04-25"
    },
    {
        id: 6,
        title: "边缘计算技术在医疗设备与楼宇自控中的应用",
        tags: ["边缘计算", "楼宇自控", "医疗设备"],
        source: "技术创新",
        date: "2026-04-20"
    }
];

// RSS 源配置 - 医疗弱电智能化专业源
const RSS_SOURCES = {
    news: [
        { name: "人民网健康", url: "http://www.people.com.cn/rss/health.xml", type: "rss" },
        { name: "国家卫健委", url: "https://www.nhc.gov.cn/xcs/yqfkdt/gzbd_index.shtml", type: "html" }
    ],
    tech: [
        { name: "HIT专家网", url: "https://www.hit180.com/feed", type: "rss" },
        { name: "Medical Device Network", url: "https://www.medicaldevice-network.com/feed/", type: "rss" }
    ]
};

// 获取国家卫健委新闻 (HTML 解析)
async function fetchNHCNews() {
    try {
        const response = await axios.get('https://www.nhc.gov.cn/xcs/yqfkdt/gzbd_index.shtml', {
            timeout: 15000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        const $ = cheerio.load(response.data);
        const items = [];
        $('.zxxx_list li a').each((i, elem) => {
            if (i < 5) {
                let href = $(elem).attr('href') || '';
                if (href && !href.startsWith('http')) {
                    href = 'https://www.nhc.gov.cn' + href;
                }
                items.push({
                    title: $(elem).text().trim(),
                    link: href,
                    pubDate: new Date().toISOString().split('T')[0],
                    description: ''
                });
            }
        });
        return items;
    } catch (error) {
        console.log(`获取国家卫健委新闻失败: ${error.message}`);
        return [];
    }
}

async function fetchRSSData(source) {
    try {
        const response = await axios.get(source.url, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        const $ = cheerio.load(response.data, { xmlMode: true });
        const items = [];
        
        $('item').each((i, elem) => {
            if (i < 5) {
                items.push({
                    title: $(elem).find('title').text().trim(),
                    link: $(elem).find('link').text().trim(),
                    pubDate: new Date($(elem).find('pubDate').text().trim()).toISOString().split('T')[0]
                });
            }
        });
        
        return items;
    } catch (error) {
        console.log(`Failed to fetch ${source.name}: ${error.message}`);
        return [];
    }
}

async function updateNewsFromAPI() {
    console.log(`[${new Date().toLocaleString()}] 正在更新政策资讯 (医疗专业源)...`);
    
    for (const source of RSS_SOURCES.news) {
        let items = [];
        if (source.type === 'rss') {
            items = await fetchRSSData(source);
        } else if (source.type === 'html') {
            if (source.name === '国家卫健委') {
                items = await fetchNHCNews();
            }
        }
        
        if (items.length > 0) {
            const newNews = items.map((item, index) => ({
                id: Date.now() + index + Math.random(),
                title: item.title,
                source: source.name,
                date: item.pubDate || new Date().toISOString().split('T')[0],
                url: item.link || '',
                description: item.description || ''
            }));
            
            newsData = [...newNews, ...newsData].slice(0, 30);
            console.log(`从 ${source.name} 获取了 ${items.length} 条政策资讯`);
        }
    }
}

async function updateTechFromRSS() {
    console.log(`[${new Date().toLocaleString()}] 正在更新技术动态 (医疗信息化源)...`);
    
    for (const source of RSS_SOURCES.tech) {
        const items = await fetchRSSData(source);
        if (items.length > 0) {
            const newTech = items.map((item, index) => ({
                id: Date.now() + index + Math.random(),
                title: item.title,
                tags: ["医疗信息化"],
                source: source.name,
                date: item.pubDate || new Date().toISOString().split('T')[0],
                url: item.link || ''
            }));
            
            techData = [...newTech, ...techData].slice(0, 30);
            console.log(`从 ${source.name} 获取了 ${items.length} 条技术动态`);
        }
    }
}

app.get('/api/news', (req, res) => {
    res.json({
        success: true,
        data: newsData,
        updateTime: new Date().toISOString()
    });
});

app.get('/api/tech', (req, res) => {
    res.json({
        success: true,
        data: techData,
        updateTime: new Date().toISOString()
    });
});

app.get('/api/all', (req, res) => {
    res.json({
        success: true,
        news: newsData,
        tech: techData,
        updateTime: new Date().toISOString()
    });
});

app.post('/api/update', async (req, res) => {
    try {
        await updateNewsFromAPI();
        await updateTechFromRSS();
        res.json({
            success: true,
            message: '数据更新成功',
            updateTime: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '更新失败: ' + error.message
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        newsCount: newsData.length,
        techCount: techData.length
    });
});

const rule = new schedule.RecurrenceRule();
rule.hour = 6;
rule.minute = 0;

const dailyJob = schedule.scheduleJob('0 6 * * *', async () => {
    console.log('执行每日自动更新任务...');
    await updateNewsFromAPI();
    await updateTechFromRSS();
});

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║   医疗弱电智能化知识库后端服务已启动                           ║
║   服务器地址: http://localhost:${PORT}                           ║
║                                                               ║
║   API接口:                                                    ║
║   - GET  /api/news    - 获取政策资讯                           ║
║   - GET  /api/tech    - 获取技术动态                           ║
║   - GET  /api/all     - 获取全部数据                           ║
║   - POST /api/update  - 手动更新数据                           ║
║   - GET  /api/health  - 健康检查                              ║
║                                                               ║
║   自动更新: 每天早上6:00执行                                   ║
╚═══════════════════════════════════════════════════════════════╝
    `);
    
    setTimeout(() => {
        updateNewsFromAPI();
        updateTechFromRSS();
    }, 3000);
});

module.exports = app;