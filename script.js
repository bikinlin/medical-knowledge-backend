const API_BASE_URL = 'https://medical-knowledge-production.up.railway.app/api';

const knowledgeData = [
    {
        id: 1,
        title: "鍖婚櫌鏅鸿兘鍖栫患鍚堝竷绾跨郴缁熻璁¤鑼?,
        category: "缁煎悎甯冪嚎",
        description: "鍖婚櫌鏅鸿兘鍖栫患鍚堝竷绾跨郴缁熸槸鍖荤枟淇℃伅鍖栫殑鍩虹锛屾兜鐩栬闊炽€佹暟鎹€佸浘鍍忋€佸濯掍綋绛夊绉嶄俊鎭紶杈撻渶姹傘€?,
        content: "鍖婚櫌鏅鸿兘鍖栫患鍚堝竷绾跨郴缁熷簲婊¤冻浠ヤ笅瑕佹眰锛?. 閲囩敤妯″潡鍖栥€佺粨鏋勫寲璁捐锛屾敮鎸佹湭鏉ユ墿灞曪紱2. 婊¤冻鍖荤枟璁惧鐨勭壒娈婄數纾佸吋瀹规€ц姹傦紱3. 鍏抽敭鍖哄煙閲囩敤鍐椾綑璁捐锛岀‘淇?脳24灏忔椂绋冲畾杩愯锛?. 绗﹀悎銆婂尰闄㈠缓绛戞櫤鑳藉寲绯荤粺璁捐瑙勮寖銆嬬瓑鐩稿叧鏍囧噯銆?,
        date: "2026-01-15",
        icon: "馃摗"
    },
    {
        id: 2,
        title: "鎵嬫湳瀹ゅ急鐢电郴缁熼泦鎴愭柟妗?,
        category: "鍖荤枟涓撻」绯荤粺",
        description: "鐜颁唬鎵嬫湳瀹ら渶瑕侀泦鎴愬绉嶅急鐢电郴缁燂紝鍖呮嫭鎵嬫湳绀烘暀銆侀夯閱変俊鎭€佸尰鐤楀奖鍍忕瓑锛屽疄鐜版暟瀛楀寲鎵嬫湳瀹ゃ€?,
        content: "鏁板瓧鍖栨墜鏈闆嗘垚绯荤粺鍖呮嫭锛?. 鎵嬫湳绀烘暀涓庤繙绋嬩細璇婄郴缁燂紱2. 楹婚唹淇℃伅绯荤粺(AIS)锛?. 鍖荤枟褰卞儚褰掓。涓庨€氫俊绯荤粺(PACS)锛?. 鎵嬫湳瀹ょ幆澧冪洃鎺х郴缁燂紱5. 鍖绘姢瀵硅涓庡懠鍙郴缁熴€?,
        date: "2026-02-20",
        icon: "馃彞"
    },
    {
        id: 3,
        title: "鍖婚櫌瀹夐槻鐩戞帶绯荤粺寤鸿瑕佺偣",
        category: "瀹夊叏闃茶寖",
        description: "鍖婚櫌浣滀负浜哄憳瀵嗛泦鍦烘墍锛屽畨闃茬洃鎺х郴缁熷缓璁捐嚦鍏抽噸瑕侊紝闇€瑕嗙洊閲嶇偣鍖哄煙骞舵弧瓒冲叕瀹夐儴闂ㄨ姹傘€?,
        content: "鍖婚櫌瀹夐槻鐩戞帶绯荤粺瑕佺偣锛?. 閲嶇偣鍖哄煙鍏ㄨ鐩栵紙鍑哄叆鍙ｃ€佹敹璐瑰銆佽嵂鎴裤€佺數姊瓑锛夛紱2. 閲囩敤楂樻竻鎽勫儚鏈猴紝淇濈暀褰曞儚涓嶅皯浜?0澶╋紱3. 闆嗘垚鏅鸿兘鍒嗘瀽鍔熻兘锛屽浜哄憳鑱氶泦妫€娴嬨€侀仐鐣欑墿妫€娴嬶紱4. 涓庡叕瀹夌郴缁熻仈缃戯紝绗﹀悎銆婂畨鍏ㄩ槻鑼冨伐绋嬫妧鏈爣鍑嗐€嬨€?,
        date: "2026-03-05",
        icon: "馃摴"
    },
    {
        id: 4,
        title: "HIS绯荤粺涓庡急鐢电郴缁熼泦鎴愭柟妗?,
        category: "淇℃伅鍖栫郴缁?,
        description: "鍖婚櫌淇℃伅绯荤粺(HIS)鏄尰闄俊鎭寲鐨勬牳蹇冿紝闇€涓庡悇寮辩數绯荤粺娣卞害闆嗘垚锛屽疄鐜版暟鎹叡浜€?,
        content: "HIS绯荤粺闆嗘垚鍐呭锛?. 涓庢帓闃熷彨鍙风郴缁熷鎺ワ紝瀹炵幇瀹炴椂鍙彿锛?. 涓庨棬绂佺郴缁熼泦鎴愶紝瀹炵幇鏉冮檺缁熶竴绠＄悊锛?. 涓庣梾鎴垮懠鍙郴缁熻仈鍔紝鑷姩璁板綍鎶ょ悊淇℃伅锛?. 涓庡尰鐤楄澶囬泦鎴愶紝瀹炵幇鏁版嵁鑷姩閲囬泦銆?,
        date: "2026-03-18",
        icon: "馃捇"
    },
    {
        id: 5,
        title: "鍖荤敤姘斾綋鐩戞祴涓庢姤璀︾郴缁?,
        category: "鍖荤枟涓撻」绯荤粺",
        description: "鍖荤敤姘斾綋锛堟哀姘斻€佽礋鍘嬪惛寮曘€佸帇缂╃┖姘旂瓑锛夋槸鍖婚櫌姝ｅ父杩愯鐨勭敓鍛界嚎锛岄渶瑕佸疄鏃剁洃娴嬨€?,
        content: "鍖荤敤姘斾綋鐩戞祴绯荤粺鍔熻兘锛?. 瀹炴椂鐩戞祴姘斾綋鍘嬪姏銆佹祦閲忋€佺函搴︼紱2. 寮傚父鎯呭喌澶氱骇鎶ヨ锛堝０鍏夈€佺煭淇°€佸钩鍙帮級锛?. 鍘嗗彶鏁版嵁璁板綍涓庤秼鍔垮垎鏋愶紱4. 涓庢ゼ瀹囪嚜鎺х郴缁熻仈鍔紝瀹炵幇鑷姩璋冭妭銆?,
        date: "2026-04-02",
        icon: "馃挩"
    },
    {
        id: 6,
        title: "鍖婚櫌妤煎畤鑷帶绯荤粺鑺傝兘浼樺寲",
        category: "妤煎畤鑷帶",
        description: "鍖婚櫌寤虹瓚鑳借€楅珮锛岄€氳繃妤煎畤鑷帶绯荤粺瀹炵幇绌鸿皟銆佺収鏄庛€佺數姊瓑璁惧鐨勬櫤鑳芥帶鍒讹紝杈惧埌鑺傝兘鐩爣銆?,
        content: "鑺傝兘浼樺寲鎺柦锛?. 绌鸿皟绯荤粺鏍规嵁浜哄憳瀵嗗害鍔ㄦ€佽皟鑺傦紱2. 鐓ф槑閲囩敤浜轰綋鎰熷簲+鑷劧鍏夋劅搴旀帶鍒讹紱3. 鐢垫缇ゆ帶浼樺寲璋冨害锛?. 鑳芥簮绠＄悊绯荤粺(EMS)瀹炴椂鐩戞帶锛屽垎鏋愯兘鑰楁暟鎹€?,
        date: "2026-04-20",
        icon: "馃尡"
    },
    {
        id: 7,
        title: "鍖绘姢瀵硅绯荤粺鎶€鏈爣鍑?,
        category: "鍖绘姢閫氫俊",
        description: "鍖绘姢瀵硅绯荤粺鏄梾鎴夸笌鎶ゅ＋绔欎箣闂寸殑閲嶈閫氫俊宸ュ叿锛岀洿鎺ュ奖鍝嶆姢鐞嗚川閲忓拰鏁堢巼銆?,
        content: "鍖绘姢瀵硅绯荤粺瑕佹眰锛?. 鍙屽悜璇煶娓呮櫚锛屾棤鏉傞煶锛?. 鏀寔绱ф€ュ懠鍙紭鍏堬紱3. 涓嶩IS绯荤粺瀵规帴锛屾樉绀烘偅鑰呬俊鎭紱4. 鍏峰鍛煎彨璁板綍鍜岀粺璁″姛鑳斤紱5. 绉诲姩绔敮鎸侊紝鎶ゅ＋闅忚韩鎺ユ敹鍛煎彨銆?,
        date: "2026-05-01",
        icon: "馃摓"
    },
    {
        id: 8,
        title: "鍖婚櫌鏁版嵁涓績寤鸿瑙勮寖",
        category: "淇℃伅鍖栫郴缁?,
        description: "鍖婚櫌鏁版嵁涓績鏄俊鎭寲绯荤粺鐨勬牳蹇冨熀纭€璁炬柦锛屽繀椤讳繚璇侀珮鍙敤鎬с€侀珮瀹夊叏鎬с€?,
        content: "鏁版嵁涓績寤鸿瑕佺偣锛?. 鏈烘埧绛夌骇涓嶄綆浜嶣绾э紝鍏抽敭绯荤粺閲囩敤A绾ф爣鍑嗭紱2. UPS渚涚數鏃堕棿涓嶅皯浜?灏忔椂锛岄厤澶囨煷娌瑰彂鐢垫満锛?. 绮惧瘑绌鸿皟鎭掓俯鎭掓箍鎺у埗锛?. 瀹屽杽鐨勬秷闃插拰瀹夐槻绯荤粺锛?. 閲囩敤铏氭嫙鍖栧拰浜戣绠楁妧鏈紝鎻愰珮璧勬簮鍒╃敤鐜囥€?,
        date: "2026-05-05",
        icon: "馃枼锔?
    },
    {
        id: 9,
        title: "鎺掗槦鍙彿绯荤粺鍦ㄥ尰闄㈢殑搴旂敤",
        category: "淇℃伅鍖栫郴缁?,
        description: "鎺掗槦鍙彿绯荤粺鏈夋晥鏀瑰杽鍖婚櫌灏辫瘖绉╁簭锛屾彁鍗囨偅鑰呭氨鍖讳綋楠岋紝鎻愰珮鍖婚櫌绠＄悊鏁堢巼銆?,
        content: "鎺掗槦鍙彿绯荤粺鍔熻兘锛?. 澶氭笭閬撳彇鍙凤紙鑷姪鏈恒€佸井淇°€丄PP锛夛紱2. 鍒嗚瘖鍙彿涓嶩IS瀵规帴锛?. 鍊欒瘖鍖烘樉绀哄睆瀹炴椂鏄剧ず鍙彿淇℃伅锛?. 鍙彿缁熻涓庡垎鏋愶紝浼樺寲绉戝鎺掔彮锛?. 鏀寔杩囧彿閲嶆帓鍜屼紭鍏堝氨璇娿€?,
        date: "2026-05-08",
        icon: "馃搵"
    },
    {
        id: 10,
        title: "鍖婚櫌鏅鸿兘鍖栫郴缁熼獙鏀舵爣鍑?,
        category: "宸ョ▼楠屾敹",
        description: "鍖婚櫌鏅鸿兘鍖栫郴缁熷畬宸ュ悗闇€杩涜涓ユ牸楠屾敹锛岀‘淇濈郴缁熺鍚堣璁¤姹傚拰鐩稿叧鏍囧噯銆?,
        content: "楠屾敹鍐呭鍖呮嫭锛?. 璁惧瀹夎璐ㄩ噺妫€鏌ワ紱2. 绯荤粺鍔熻兘娴嬭瘯锛?. 鎬ц兘鎸囨爣妫€娴嬶紱4. 鏂囨。璧勬枡楠屾敹锛?. 浜哄憳鍩硅鑰冩牳锛?. 璇曡繍琛岀ǔ瀹氭€ч獙璇併€傞獙鏀堕渶绗﹀悎銆婃櫤鑳藉缓绛戝伐绋嬭川閲忛獙鏀惰鑼冦€婫B50339銆?,
        date: "2026-05-10",
        icon: "鉁?
    }
];

let newsData = [];
let techData = [];

const categories = [
    { name: "缁煎悎甯冪嚎", icon: "馃摗", count: 15 },
    { name: "鍖荤枟涓撻」绯荤粺", icon: "馃彞", count: 22 },
    { name: "瀹夊叏闃茶寖", icon: "馃摴", count: 18 },
    { name: "淇℃伅鍖栫郴缁?, icon: "馃捇", count: 25 },
    { name: "妤煎畤鑷帶", icon: "馃尡", count: 12 },
    { name: "鍖绘姢閫氫俊", icon: "馃摓", count: 10 },
    { name: "鏁版嵁涓績", icon: "馃枼锔?, count: 8 },
    { name: "宸ョ▼楠屾敹", icon: "鉁?, count: 6 }
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
        grid.innerHTML = '<p style="text-align: center; color: #888; padding: 40px;">姝ｅ湪鍔犺浇鏀跨瓥璧勮...</p>';
        return;
    }
    
    grid.innerHTML = newsData.slice(0, 6).map(item => `
        <div class="news-card">
            <h3>${item.title}</h3>
            <div class="meta">
                <span>${item.source || '鏈煡鏉ユ簮'}</span> 路 
                <span>${item.date || item.pubDate || '鏈煡鏃ユ湡'}</span>
            </div>
            <p>${item.content || item.description || '鏆傛棤璇︽儏'}</p>
        </div>
    `).join('');
}

function renderTech() {
    const grid = document.getElementById('techGrid');
    if (!grid) return;
    
    if (techData.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #888; padding: 40px;">姝ｅ湪鍔犺浇鎶€鏈姩鎬?..</p>';
        return;
    }
    
    grid.innerHTML = techData.slice(0, 6).map(item => `
        <div class="tech-card">
            <h3>${item.title}</h3>
            <div class="meta">
                <span>${item.source || '鏈煡鏉ユ簮'}</span> 路 
                <span>${item.date || item.pubDate || '鏈煡鏃ユ湡'}</span>
            </div>
            <div class="tags">
                ${(item.tags || ['鎶€鏈姩鎬?]).map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <p>${item.content || item.description || '鏆傛棤璇︽儏'}</p>
        </div>
    `).join('');
}

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = categories.map(cat => `
        <div class="category-card" data-category="${cat.name}">
            <div class="category-icon">${cat.icon}</div>
            <h3>${cat.name}</h3>
            <p>鍏?${cat.count} 绡囩煡璇嗘枃绔?/p>
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
                    <span>${item.category}</span> 路 
                    <span>${item.date}</span>
                </div>
                <p>${item.description}</p>
                <a href="#" class="read-more" data-id="${item.id}">闃呰鏇村 鈫?/a>
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
        container.innerHTML = '<p style="text-align: center; color: #888; padding: 40px;">鏈壘鍒扮浉鍏崇煡璇嗗唴瀹?/p>';
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