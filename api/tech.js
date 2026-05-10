const axios = require('axios');
const cheerio = require('cheerio');

const sampleTech = [
    { id: 1, title: "5G技术在远程手术中的应用突破", tags: ["5G", "远程医疗"], source: "医疗技术前沿", date: "2026-05-10" },
    { id: 2, title: "AI辅助诊断系统准确率突破95%", tags: ["AI", "诊断"], source: "人工智能医疗", date: "2026-05-06" },
    { id: 3, title: "新型医用物联网传感器研发成功", tags: ["物联网", "传感器"], source: "医疗器械创新", date: "2026-05-01" },
    { id: 4, title: "区块链技术在医疗数据共享中的应用", tags: ["区块链", "数据共享"], source: "医疗信息化", date: "2026-04-28" },
    { id: 5, title: "智能病房管理系统全面升级", tags: ["智能病房", "管理系统"], source: "智慧医院", date: "2026-04-25" },
    { id: 6, title: "边缘计算技术在医疗设备中的应用", tags: ["边缘计算", "医疗设备"], source: "技术创新", date: "2026-04-20" }
];

const RSS_TECH_SOURCES = [
    { name: "36氪", url: "https://36kr.com/feed" },
    { name: "钛媒体", url: "https://www.tmtpost.com/rss" }
];

async function fetchRSS(source) {
    try {
        const response = await axios.get(source.url, {
            timeout: 10000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        const $ = cheerio.load(response.data, { xmlMode: true });
        const items = [];
        $('item').each((i, elem) => {
            if (i < 5) {
                const pubDateText = $(elem).find('pubDate').text().trim();
                items.push({
                    title: $(elem).find('title').text().trim(),
                    link: $(elem).find('link').text().trim(),
                    date: pubDateText ? new Date(pubDateText).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                });
            }
        });
        return items;
    } catch (error) {
        console.log(`Failed to fetch ${source.name}: ${error.message}`);
        return [];
    }
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(200).end();

    let allTech = [...sampleTech];
    for (const source of RSS_TECH_SOURCES) {
        const items = await fetchRSS(source);
        if (items.length > 0) {
            const mapped = items.map((item, i) => ({
                id: Date.now() + i,
                title: item.title,
                tags: ["技术动态"],
                source: source.name,
                date: item.date,
                url: item.link
            }));
            allTech = [...mapped, ...allTech];
        }
    }

    res.status(200).json({
        success: true,
        data: allTech.slice(0, 20),
        updateTime: new Date().toISOString()
    });
};
