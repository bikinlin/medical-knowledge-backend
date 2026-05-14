const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const schedule = require('node-schedule');
const { fetchFullContent, fetchBatchContent, getCacheStats } = require('./contentFetcher');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

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
        date: "2026-05-10",
        content: "5G技术在远程手术与医疗弱电系统中的应用取得突破性进展。基于3GPP Release 16标准，5G独立组网（SA）模式下端到端网络切片技术实现了医疗业务的确定性低延迟传输，下行速率可达20Gbps、上行速率达10Gbps，空口时延降至1ms以内，满足远程手术对毫秒级响应的严苛要求。在应用层面，5G+远程手术系统已在多家三甲医院部署，结合4K/8K超高清医学影像传输与力反馈机械臂控制，实现跨地域精准手术操作。在弱电系统方面，5G专网为医院建筑设备监控系统（BAS）、安防监控、能耗管理等弱电子系统提供了高可靠、低延迟的统一承载平台，依据GB 50314-2015《智能建筑设计标准》中关于医疗建筑智能化系统的分级要求，5G网络切片可根据不同弱电子系统的带宽、延迟、安全等级进行差异化资源配置。实施要点包括：需采用独立UPF下沉至院区实现数据本地化处理，满足GB/T 22239-2019等保三级要求；同时需建立5G专网与医院现有局域网的安全互联机制。"
    },
    {
        id: 2,
        title: "AI辅助诊断系统准确率突破95%，智慧医院加速落地",
        tags: ["AI", "智慧医院", "诊断"],
        source: "医疗信息化",
        date: "2026-05-06",
        content: "AI辅助诊断系统在医学影像识别、病理切片分析、基因测序等关键领域准确率已突破95%，推动智慧医院从概念规划进入全面落地阶段。在医学影像领域，基于深度卷积神经网络（DCNN）的AI系统可对CT、MRI、DR等多模态影像进行自动标注与病灶检测，单次阅片时间从传统人工的15-20分钟缩短至30秒以内，符合国家药监局2021年第47号公告中II类或III类医疗器械的管理要求。系统部署方面，依据GB/T 39725-2020《智慧医院信息安全保障体系建设指南》，AI诊断平台需采用私有化部署与云端协同架构，支持多院区数据共享与模型迭代更新。在智慧医院整体架构中，AI系统通过HL7 FHIR标准接口与HIS、PACS、LIS实现深度集成。实施要点包括：AI模型训练需使用经伦理审查批准的脱敏数据集；系统上线前须通过临床验证试验并取得医疗器械注册证；同时需建立AI辅助诊断结果的人工复核机制，确保诊疗安全。"
    },
    {
        id: 3,
        title: "新型医用物联网传感器助力医院弱电智能化升级",
        tags: ["物联网", "弱电智能化", "传感器"],
        source: "医疗器械创新",
        date: "2026-05-01",
        content: "新型医用物联网（IoT）传感器技术正加速推动医院弱电智能化系统的全面升级。当前医用物联网传感器涵盖环境监测（温湿度、PM2.5、CO₂浓度）、生命体征连续监测（心率、血氧、体温、血压）、资产定位追踪（RTLS实时定位系统）、能耗监测等多个类别。在环境监测领域，传感器节点采用NB-IoT或LoRaWAN低功耗广域网协议，单节点电池寿命可达3-5年，数据采集精度：温度±0.1°C、湿度±2%RH、CO₂浓度±50ppm，满足GB 50333-2013《医院洁净手术部建筑技术规范》对手术室温湿度控制的严格要求。在生命体征监测领域，无线穿戴式传感器通过蓝牙5.0/BLE或Zigbee 3.0协议接入病房物联网网关，采样率可达250Hz，延迟低于200ms。弱电智能化集成方面，依据GB 50314-2015《智能建筑设计标准》，物联网传感器数据通过标准化协议（MQTT/CoAP）汇聚至物联网统一管理平台，与BAS、能耗管理系统、护理信息系统实现联动控制。"
    },
    {
        id: 4,
        title: "区块链技术在医疗数据共享与弱电安防中的应用",
        tags: ["区块链", "数据安全", "安防"],
        source: "医疗信息化",
        date: "2026-04-28",
        content: "区块链技术在医疗数据共享与弱电安防领域展现出显著的应用价值。在医疗数据共享方面，基于联盟链架构的医疗数据共享平台采用分布式账本、非对称加密（SM2国密算法）与智能合约技术，实现了患者电子病历、检查检验结果等敏感数据在跨院区、跨机构之间的可信流转，符合GB/T 35273-2020《信息安全技术 个人信息安全规范》的要求。在弱电安防应用中，区块链技术主要用于安防设备身份认证与访问日志的防篡改存储。门禁系统、视频监控系统、入侵报警系统等安防子系统的操作日志与设备状态数据通过哈希值上链存储，依据GB 50348-2018《安全防范工程技术标准》实现了审计追踪的不可抵赖性。智能合约可自动执行安防策略，如发现异常访问行为时自动触发告警并联动门禁系统。实施要点包括：需采用国密算法（SM2/SM3/SM4）满足密码应用安全性评估要求；联盟链节点部署应覆盖主要医疗机构，共识机制采用PBFT以兼顾性能与安全性。"
    },
    {
        id: 5,
        title: "智能病房管理系统全面升级，集成护理呼叫与信息发布",
        tags: ["智能病房", "护理呼叫", "信息发布"],
        source: "智慧医院",
        date: "2026-04-25",
        content: "智能病房管理系统迎来全面升级，护理呼叫与信息发布系统的深度集成成为智慧医院建设的核心模块之一。新一代智能病房管理系统依据GB 50314-2015《智能建筑设计标准》，采用IP网络化架构，将护理呼叫、病房环境监测、患者信息交互、床旁娱乐、医疗设备数据采集等功能整合于统一的软硬件平台。在护理呼叫子系统方面，系统采用基于SIP协议的IP对讲架构，支持多级呼叫转接（病床→护士站→值班室→移动终端），呼叫响应时间≤3秒，依据JGJ 312-2013《医疗建筑电气设计规范》配置不间断电源，确保紧急呼叫在市电中断后至少维持4小时运行。在信息发布子系统方面，病房门口信息显示屏及走廊导诊屏通过数字标牌管理系统统一管控，支持图文、视频、滚动字幕等多种发布形式。实施要点包括：系统需支持与HIS、CIS、EMR的接口对接，采用HL7 V3或FHIR标准实现数据交换；病房弱电布线需采用六类及以上屏蔽双绞线，预留PoE供电能力，符合GB 50311-2016《综合布线系统工程设计规范》要求。"
    },
    {
        id: 6,
        title: "边缘计算技术在医疗设备与楼宇自控中的应用",
        tags: ["边缘计算", "楼宇自控", "医疗设备"],
        source: "技术创新",
        date: "2026-04-20",
        content: "边缘计算技术在医疗设备数据实时处理与楼宇自控（BAS）协同领域获得广泛应用。边缘计算架构通过在医院本地部署边缘节点，将数据计算与分析能力下沉至数据源头，减少对云端依赖。在医疗设备管理方面，边缘计算网关可对CT、MRI、超声、呼吸机、监护仪等设备运行数据进行实时采集与本地分析，采样率可达1kHz，异常检测延迟低于100ms，支持预测性维护功能。在楼宇自控方面，边缘控制器集成暖通空调（HVAC）、照明、给排水、电梯、供配电等子系统的实时控制逻辑，支持Modbus TCP/IP、BACnet/IP、KNX等标准化协议，依据GB 50189-2015《公共建筑节能设计标准》实现能耗优化控制，综合节能率可达15%-25%。实施要点包括：边缘节点需采用工业级硬件，工作温度范围-20°C至70°C，MTBF不低于50000小时；边缘计算平台应支持容器化部署（Docker/Kubernetes），便于应用功能的弹性扩展与版本管理；数据传输安全需满足GB/T 22239-2019等保三级要求，采用TLS 1.3加密通信。"
    }
];

// RSS 源配置 - 医疗弱电智能化专业源
const RSS_SOURCES = {
    news: [
        { name: "国家卫健委", url: "https://www.nhc.gov.cn/xcs/yqfkdt/gzbd_index.shtml", type: "html" },
        { name: "人民网健康", url: "http://www.people.com.cn/rss/health.xml", type: "rss" }
    ],
    tech: [
        { name: "HIT专家网", url: "https://www.hit180.com/feed", type: "rss" }
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

app.get('/api/news', async (req, res) => {
    try {
        res.json({
            success: true,
            data: newsData,
            updateTime: new Date().toISOString()
        });
    } catch (error) {
        res.json({
            success: true,
            data: newsData,
            updateTime: new Date().toISOString()
        });
    }
});

app.get('/api/tech', async (req, res) => {
    try {
        res.json({
            success: true,
            data: techData,
            updateTime: new Date().toISOString()
        });
    } catch (error) {
        res.json({
            success: true,
            data: techData,
            updateTime: new Date().toISOString()
        });
    }
});

app.get('/api/all', async (req, res) => {
    try {
        res.json({
            success: true,
            news: newsData,
            tech: techData,
            updateTime: new Date().toISOString()
        });
    } catch (error) {
        res.json({
            success: true,
            news: newsData,
            tech: techData,
            updateTime: new Date().toISOString()
        });
    }
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
    const cacheStats = getCacheStats();
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        newsCount: newsData.length,
        techCount: techData.length,
        cacheSize: cacheStats.size
    });
});

// 按需抓取单篇文章全文
app.get('/api/article', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ success: false, message: '缺少 url 参数' });
    }
    
    const result = await fetchFullContent(url);
    if (result.success) {
        res.json({ success: true, content: result.content, fromCache: result.fromCache });
    } else {
        res.status(404).json({ success: false, message: '内容获取失败', error: result.error });
    }
});

// 缓存状态
app.get('/api/cache', (req, res) => {
    res.json(getCacheStats());
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