const API_BASE_URL = 'https://medical-knowledge-production.up.railway.app/api';

const knowledgeData = [
    {
        id: 1,
        title: "医院智能化综合布线系统设计规范",
        category: "综合布线",
        description: "医院智能化综合布线系统是医疗信息化的基础，涵盖语音、数据、图像、多媒体等多种信息传输需求。",
        content: "医院智能化综合布线系统应满足以下要求：1. 采用模块化、结构化设计，支持未来扩展；2. 满足医疗设备的特殊电磁兼容性要求；3. 关键区域采用冗余设计，确保7×24小时稳定运行；4. 符合《医院建筑智能化系统设计规范》等相关标准。",
        date: "2026-01-15",
        icon: "📡"
    },
    {
        id: 2,
        title: "手术室弱电系统集成方案",
        category: "医疗专项系统",
        description: "现代手术室需要集成多种弱电系统，包括手术示教、麻醉信息、医疗影像等，实现数字化手术室。",
        content: "数字化手术室集成系统包括：1. 手术示教与远程会诊系统；2. 麻醉信息系统(AIS)；3. 医疗影像归档与通信系统(PACS)；4. 手术室环境监控系统；5. 医护对讲与呼叫系统。",
        date: "2026-02-20",
        icon: "🏥"
    },
    {
        id: 3,
        title: "医院安防监控系统建设要点",
        category: "安全防范",
        description: "医院作为人员密集场所，安防监控系统建设至关重要，需覆盖重点区域并满足公安部门要求。",
        content: "医院安防监控系统要点：1. 重点区域全覆盖（出入口、收费处、药房、电梯等）；2. 采用高清摄像机，保留录像不少于30天；3. 集成智能分析功能，如人员聚集检测、遗留物检测；4. 与公安系统联网，符合《安全防范工程技术标准》。",
        date: "2026-03-05",
        icon: "📹"
    },
    {
        id: 4,
        title: "HIS系统与弱电系统集成方案",
        category: "信息化系统",
        description: "医院信息系统(HIS)是医院信息化的核心，需与各弱电系统深度集成，实现数据共享。",
        content: "HIS系统集成内容：1. 与排队叫号系统对接，实现实时叫号；2. 与门禁系统集成，实现权限统一管理；3. 与病房呼叫系统联动，自动记录护理信息；4. 与医疗设备集成，实现数据自动采集。",
        date: "2026-03-18",
        icon: "💻"
    },
    {
        id: 5,
        title: "医用气体监测与报警系统",
        category: "医疗专项系统",
        description: "医用气体（氧气、负压吸引、压缩空气等）是医院正常运行的生命线，需要实时监测。",
        content: "医用气体监测系统功能：1. 实时监测气体压力、流量、纯度；2. 异常情况多级报警（声光、短信、平台）；3. 历史数据记录与趋势分析；4. 与楼宇自控系统联动，实现自动调节。",
        date: "2026-04-02",
        icon: "💨"
    },
    {
        id: 6,
        title: "医院楼宇自控系统节能优化",
        category: "楼宇自控",
        description: "医院建筑能耗高，通过楼宇自控系统实现空调、照明、电梯等设备的智能控制，达到节能目标。",
        content: "节能优化措施：1. 空调系统根据人员密度动态调节；2. 照明采用人体感应+自然光感应控制；3. 电梯群控优化调度；4. 能源管理系统(EMS)实时监控，分析能耗数据。",
        date: "2026-04-20",
        icon: "🌱"
    },
    {
        id: 7,
        title: "医护对讲系统技术标准",
        category: "医护通信",
        description: "医护对讲系统是病房与护士站之间的重要通信工具，直接影响护理质量和效率。",
        content: "医护对讲系统要求：1. 双向语音清晰，无杂音；2. 支持紧急呼叫优先；3. 与HIS系统对接，显示患者信息；4. 具备呼叫记录和统计功能；5. 移动端支持，护士随身接收呼叫。",
        date: "2026-05-01",
        icon: "📞"
    },
    {
        id: 8,
        title: "医院数据中心建设规范",
        category: "信息化系统",
        description: "医院数据中心是信息化系统的核心基础设施，必须保证高可用性、高安全性。",
        content: "数据中心建设要点：1. 机房等级不低于B级，关键系统采用A级标准；2. UPS供电时间不少于4小时，配备柴油发电机；3. 精密空调恒温恒湿控制；4. 完善的消防和安防系统；5. 采用虚拟化和云计算技术，提高资源利用率。",
        date: "2026-05-05",
        icon: "🖥️"
    },
    {
        id: 9,
        title: "排队叫号系统在医院的应用",
        category: "信息化系统",
        description: "排队叫号系统有效改善医院就诊秩序，提升患者就医体验，提高医院管理效率。",
        content: "排队叫号系统功能：1. 多渠道取号（自助机、微信、APP）；2. 分诊叫号与HIS对接；3. 候诊区显示屏实时显示叫号信息；4. 叫号统计与分析，优化科室排班；5. 支持过号重排和优先就诊。",
        date: "2026-05-08",
        icon: "📋"
    },
    {
        id: 10,
        title: "医院智能化系统验收标准",
        category: "工程验收",
        description: "医院智能化系统完工后需进行严格验收，确保系统符合设计要求和相关标准。",
        content: "验收内容包括：1. 设备安装质量检查；2. 系统功能测试；3. 性能指标检测；4. 文档资料验收；5. 人员培训考核；6. 试运行稳定性验证。验收需符合《智能建筑工程质量验收规范》GB50339。",
        date: "2026-05-10",
        icon: "✅"
    }
];

let newsData = [];
let techData = [];

const categories = [
    { name: "综合布线", icon: "📡", count: 15 },
    { name: "医疗专项系统", icon: "🏥", count: 22 },
    { name: "安全防范", icon: "📹", count: 18 },
    { name: "信息化系统", icon: "💻", count: 25 },
    { name: "楼宇自控", icon: "🌱", count: 12 },
    { name: "医护通信", icon: "📞", count: 10 },
    { name: "数据中心", icon: "🖥️", count: 8 },
    { name: "工程验收", icon: "✅", count: 6 }
];

async function fetchAPI(endpoint) {
    try {
        const url = endpoint.startsWith('/api') ? 
            `https://medical-knowledge-production.up.railway.app${endpoint}` :
            `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error.message);
        return null;
    }
}

async function loadDynamicData() {
    const [newsResult, techResult] = await Promise.all([
        fetchAPI('/api/news'),
        fetchAPI('/api/tech')
    ]);

    if (newsResult && newsResult.success) {
        newsData = newsResult.data;
        renderNews();
    }

    if (techResult && techResult.success) {
        techData = techResult.data;
        renderTech();
    }
}

function init() {
    renderCategories();
    renderKnowledgeGrid();
    populateCategoryFilter();
    setupEventListeners();
    loadDynamicData();
}

function renderNews() {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    
    if (newsData.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #888; padding: 40px;">正在加载政策资讯...</p>';
        return;
    }
    
    grid.innerHTML = newsData.slice(0, 6).map(item => `
        <div class="news-card">
            <h3>${item.title}</h3>
            <div class="meta">
                <span>${item.source || '未知来源'}</span> · 
                <span>${item.date || item.pubDate || '未知日期'}</span>
            </div>
            <p>${item.content || item.description || '暂无详情'}</p>
        </div>
    `).join('');
}

function renderTech() {
    const grid = document.getElementById('techGrid');
    if (!grid) return;
    
    if (techData.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #888; padding: 40px;">正在加载技术动态...</p>';
        return;
    }
    
    grid.innerHTML = techData.slice(0, 6).map(item => `
        <div class="tech-card">
            <h3>${item.title}</h3>
            <div class="meta">
                <span>${item.source || '未知来源'}</span> · 
                <span>${item.date || item.pubDate || '未知日期'}</span>
            </div>
            <div class="tags">
                ${(item.tags || ['技术动态']).map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <p>${item.content || item.description || '暂无详情'}</p>
        </div>
    `).join('');
}

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = categories.map(cat => `
        <div class="category-card" data-category="${cat.name}">
            <div class="category-icon">${cat.icon}</div>
            <h3>${cat.name}</h3>
            <p>共 ${cat.count} 篇知识文章</p>
        </div>
    `).join('');
}

function renderKnowledgeGrid() {
    const grid = document.getElementById('knowledgeGrid');
    grid.innerHTML = knowledgeData.slice(0, 6).map(item => `
        <div class="knowledge-card">
            <div class="knowledge-card-content">
                <h3>${item.title}</h3>
                <div class="meta">
                    <span>${item.category}</span> · 
                    <span>${item.date}</span>
                </div>
                <p>${item.description}</p>
                <a href="#" class="read-more" data-id="${item.id}">阅读更多 →</a>
            </div>
        </div>
    `).join('');
}

function populateCategoryFilter() {
    const select = document.getElementById('categoryFilter');
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.name;
        option.textContent = cat.name;
        select.appendChild(option);
    });
}

function performSearch(keyword = '', category = '') {
    let results = knowledgeData;
    
    if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        results = results.filter(item => 
            item.title.toLowerCase().includes(lowerKeyword) ||
            item.description.toLowerCase().includes(lowerKeyword) ||
            item.content.toLowerCase().includes(lowerKeyword)
        );
    }
    
    if (category) {
        results = results.filter(item => item.category === category);
    }
    
    renderSearchResults(results);
}

function renderSearchResults(results) {
    const container = document.getElementById('resultsContainer');
    
    if (results.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #888; padding: 40px;">未找到相关知识内容</p>';
        return;
    }
    
    container.innerHTML = results.map(item => `
        <div class="result-item">
            <span class="category-tag">${item.category}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p style="margin-top: 10px; color: #666;">${item.content}</p>
        </div>
    `).join('');
}

function setupEventListeners() {
    document.getElementById('heroSearchBtn').addEventListener('click', () => {
        const keyword = document.getElementById('heroSearch').value;
        document.getElementById('searchInput').value = keyword;
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
        performSearch(keyword);
    });
    
    document.getElementById('heroSearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('heroSearchBtn').click();
        }
    });
    
    document.getElementById('searchBtn').addEventListener('click', () => {
        const keyword = document.getElementById('searchInput').value;
        const category = document.getElementById('categoryFilter').value;
        performSearch(keyword, category);
    });
    
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('searchBtn').click();
        }
    });
    
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            document.getElementById('categoryFilter').value = category;
            document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
            performSearch('', category);
        });
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const target = link.getAttribute('href');
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

document.addEventListener('DOMContentLoaded', init);