let techData = [
    { id: 1, title: "5G技术在远程手术中的应用突破", tags: ["5G", "远程医疗"], source: "医疗技术前沿", date: "2026-05-10" },
    { id: 2, title: "AI辅助诊断系统准确率突破95%", tags: ["AI", "诊断"], source: "人工智能医疗", date: "2026-05-06" },
    { id: 3, title: "新型医用物联网传感器研发成功", tags: ["物联网", "传感器"], source: "医疗器械创新", date: "2026-05-01" },
    { id: 4, title: "区块链技术在医疗数据共享中的应用", tags: ["区块链", "数据共享"], source: "医疗信息化", date: "2026-04-28" },
    { id: 5, title: "智能病房管理系统全面升级", tags: ["智能病房", "管理系统"], source: "智慧医院", date: "2026-04-25" },
    { id: 6, title: "边缘计算技术在医疗设备中的应用", tags: ["边缘计算", "医疗设备"], source: "技术创新", date: "2026-04-20" }
];

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.json({
        success: true,
        data: techData,
        updateTime: new Date().toISOString()
    });
};