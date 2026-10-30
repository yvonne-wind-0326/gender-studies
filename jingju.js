(function () {
  const people = [
    ['梅兰芳', '1894—1961', '青衣、花衫｜梅派创始人', 'jingju-meilan.jpeg', '出身京剧世家，早年从吴菱仙学戏，并受王瑶卿等前辈指导，后曾任中国京剧院院长。', '《霸王别姬》《贵妃醉酒》《天女散花》《宇宙锋》', '端庄典雅，唱腔圆润，身段优美，融合青衣、花旦和刀马旦技艺。'],
    ['程砚秋', '1904—1958', '青衣｜程派创始人', 'jingju-cheng-yanchiu.jpeg', '早年从荣蝶仙学艺，后师从陈啸云，并曾向梅兰芳等前辈学习。', '《荒山泪》《锁麟囊》《春闺梦》《窦娥冤》', '唱腔幽咽婉转、含蓄深沉，擅长塑造命运坎坷的女性人物。'],
    ['尚小云', '1900—1976', '青衣、刀马旦｜尚派创始人', 'jingju-shang-xiaoyun.jpeg', '早年进入三乐科班，曾受陈德霖等名家指导，后创办荣春社培养演员。', '《昭君出塞》《双阳公主》《汉明妃》', '嗓音高亢明亮，动作刚健，擅长塑造英武坚毅的女性人物。'],
    ['荀慧生', '1900—1968', '花旦｜荀派创始人', 'jingju-xun-huisheng.jpeg', '早年学习梆子，后向吴菱仙、陈德霖、王瑶卿等学习京剧。', '《红娘》《金玉奴》《红楼二尤》', '活泼俏丽，念白生动，擅长表现年轻女性的性格与情感。'],
    ['孟小冬', '1908—1977', '女老生｜余派', 'jingju-meng-xiaodong.jpeg', '出身戏曲家庭，1938年正式拜余叔岩为师，成为余派重要传人。', '《搜孤救孤》《洪羊洞》《捉放曹》《空城计》', '嗓音苍劲醇厚，念白稳重，擅长塑造忠义、沉稳的男性人物，被誉为“冬皇”。'],
    ['恩晓峰', '', '女老生', 'jingju-en-xiaofeng.jpeg', '早年学习并模仿谭鑫培的老生唱法，后成为职业演员；正式拜师关系待考。', '以谭派老生戏著称，具体代表演出记录有待进一步核实。', '注重老生唱腔与男性人物气质，曾有“女叫天”之称。'],
    ['王珮瑜', '1978年生', '女老生｜余派', 'jingju-wang-peiyu.jpeg', '毕业于上海市戏曲学校，师从王思及等京剧教师，后进入上海京剧院。', '《搜孤救孤》《空城计》《文昭关》《捉放曹》', '唱腔清醇稳健，注重老生的声音与身段，并通过讲座、新媒体等方式推广京剧。']
  ];
  const works = [
    ['《霸王别姬》', '虞姬（旦角）', '梅兰芳（男旦，饰虞姬）', '楚汉战争末期，项羽兵败被围，虞姬为安慰项羽而舞剑，最终自刎。', 'https://www.bilibili.com/video/BV1jV41167G7/', '京剧 · 男旦', 'jingju-meilan.jpeg'],
    ['《贵妃醉酒》', '杨贵妃（旦角）', '梅兰芳（男旦）', '杨贵妃等待唐明皇赴宴，却得知皇帝去了其他妃嫔处，借酒排遣失落与怨愤。', 'https://www.bilibili.com/video/BV1aa411F78f/', '京剧 · 男旦', 'jingju-meilan.jpeg'],
    ['《锁麟囊》', '薛湘灵（青衣）', '程砚秋（男旦）', '富家女子薛湘灵出嫁时帮助贫困女子，后来遭遇灾难，在困境中得到昔日受助者的回报。', 'https://www.bilibili.com/video/BV1sx411h7fE/', '京剧 · 男旦', 'jingju-cheng-yanchiu.jpeg'],
    ['《昭君出塞》', '王昭君（旦角）', '尚小云（男旦）', '王昭君离开汉宫，远嫁匈奴，途中表达对故乡的思念与复杂情感。', 'https://www.bilibili.com/bangumi/play/ep364779', '京剧 · 男旦', 'jingju-shang-xiaoyun.jpeg'],
    ['《红娘》', '红娘（花旦）', '荀慧生（男旦）', '红娘帮助崔莺莺与张生相爱，并机智应对封建礼教的阻碍。', 'https://www.bilibili.com/video/BV1fZ4y1u7xy/', '京剧 · 男旦', 'jingju-xun-huisheng.jpeg'],
    ['《搜孤救孤》', '程婴（老生）', '孟小冬', '程婴与公孙杵臼为保护赵氏孤儿，牺牲自身利益和生命，最终保存赵氏血脉。', 'https://www.bilibili.com/video/BV1XL4y1v79T/', '京剧 · 女老生', 'jingju-meng-xiaodong.jpeg'],
    ['《空城计》', '诸葛亮（老生）', '孟小冬、王珮瑜（不同版本）', '诸葛亮面对司马懿大军，利用空城与琴声制造疑兵之计，使敌军撤退。', 'https://www.bilibili.com/video/BV1VdiLBoEJH/', '京剧 · 女老生', 'jingju-wang-peiyu.jpeg']
  ];
  const sources = [
    ['京剧男旦与女老生代表演员', '页面 D 模块：人物图片与姓名按《京昆》文档原始顺序对应。'],
    ['视频资料', '页面 F 模块：视频链接来自文档，外部平台的可访问性与使用条件以原平台为准。']
  ];
  function css() {
    if (document.querySelector('#jingjuStyles')) return;
    const style = document.createElement('style'); style.id = 'jingjuStyles';
    style.textContent = '.genre-person-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.genre-person-card{cursor:pointer;background:#ebe6d8;border:1px solid var(--line);transition:.3s}.genre-person-card:hover{transform:translateY(-6px);border-color:var(--gold)}.genre-person-card img{width:100%;height:260px;object-fit:cover;display:block;filter:saturate(.78)}.genre-person-card h3{margin:0;padding:15px 17px 3px;font-size:18px;font-weight:500}.genre-person-card small{display:block;padding:0 17px 16px;color:var(--muted);font-size:12px}.media-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.media-card{display:block;border:1px solid var(--line);background:#e8e1d0;transition:.3s}.media-card:hover{transform:translateY(-5px);border-color:var(--gold)}.media-cover{height:180px;position:relative;overflow:hidden;background:linear-gradient(135deg,#4a3829,#b59b58);display:flex;align-items:flex-end;padding:18px;color:#fff8e8}.media-cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.72}.media-cover span{position:relative;z-index:1;font:12px "Space Grotesk",sans-serif;letter-spacing:.15em}.media-copy{padding:17px}.media-copy h3{margin:0 0 7px;font-size:18px;font-weight:500}.media-copy p{margin:5px 0;font-size:12px;line-height:1.8;color:#625b4f}.media-copy .watch{margin-top:10px}@media(max-width:800px){.genre-person-grid{grid-template-columns:repeat(2,1fr)}.media-grid{grid-template-columns:1fr}}@media(max-width:460px){.genre-person-grid{grid-template-columns:1fr}}'; document.head.appendChild(style);
  }
  function page() {
    return `<section class="page"><div class="page-heading"><div class="eyebrow">02 · Jingju</div><h1>京剧</h1><p>从男旦到女老生，观察唱、念、做、打如何塑造跨性别的舞台人物。</p></div><div class="content-wrap"><section class="section-block"><h2>A　剧种简介</h2><p>京剧形成于清代北京，融合徽剧、汉调、昆曲等艺术元素，是中国最具代表性的传统戏曲剧种之一。京剧以唱、念、做、打为主要表演手段，具有鲜明的脸谱、服饰、音乐和程式化动作，角色主要分为生、旦、净、丑四大行当。男性演员可以扮演女性角色，女性演员也可以扮演男性角色，演员通过唱腔、身段、化妆和服饰塑造不同性别的舞台形象。</p></section><section class="section-block"><h2>B　性别表演时间线</h2><div class="timeline"><div><b>1790年前后</b><span>徽班进京，京剧逐渐形成，继承传统戏曲中的男性旦角表演。</span></div><div><b>19世纪至20世纪初</b><span>男旦成为职业舞台的重要组成部分；女性演员逐渐活跃，女老生等形式得到发展。</span></div><div><b>1920年代</b><span>梅兰芳、尚小云、程砚秋、荀慧生等男旦演员推动旦角艺术发展。</span></div><div><b>1938年</b><span>孟小冬正式拜余叔岩为师，成为余派艺术的重要传人。</span></div><div><b>当代</b><span>男旦传统仍有传承，王珮瑜等演员通过演出、教学与新媒体推广京剧。</span></div></div></section><section class="section-block"><h2>C　角色与选角体系</h2><p>京剧以生、旦、净、丑划分行当，演员的生理性别不一定与角色性别一致。男性演员可以专攻旦行，称为男旦；女性演员也可以专攻生行，其中女老生又称坤生。男旦和女老生并非独立行当，而是演员性别与角色行当之间的特殊组合，演员通过声音、念白、身段和服饰长期塑造舞台性别形象。</p></section><section class="section-block"><h2>D　代表演员与传承</h2><p>人物卡片只呈现姓名与图片；点击后查看师承、代表作品与表演特点。</p><div class="genre-person-grid">${people.map((p,i)=>`<article class="genre-person-card" data-jingju-person="${i}"><img src="${p[3]}" alt="${p[0]}舞台或肖像照片"/><h3>${p[0]}</h3><small>${p[2]}</small></article>`).join('')}</div></section><section class="section-block"><h2>E　京剧跨性别表演技艺</h2><p>京剧男旦与女老生通过唱腔、念白、身段、服饰和程式化动作塑造不同性别的舞台形象。两者并非简单模仿异性，而是遵循旦行和老生行当各自的表演规范。</p><div class="art-grid"><article class="art-card"><h3>男旦</h3><p>从青衣、花旦到刀马旦，演员以旦行规范组织声音、身段、妆容与人物气质。</p></article><article class="art-card"><h3>女老生</h3><p>女性演员通过老生唱腔、念白与步法，塑造忠义、沉稳的中老年男性人物。</p></article></div></section><section class="section-block"><h2>F　代表作品与角色</h2><div class="media-grid">${works.map(w=>`<a class="media-card" href="${w[4]}" target="_blank" rel="noreferrer"><div class="media-cover"><img src="${w[6]}" alt="${w[0]}资料封面"/><span>${w[5]}　↗</span></div><div class="media-copy"><h3>${w[0]}</h3><p>${w[3]}</p><p><b>角色：</b>${w[1]}</p><p><b>演员：</b>${w[2]}</p><span class="watch">打开视频资料 ↗</span></div></a>`).join('')}</div></section><section class="section-block"><h2>G　资料说明</h2><div class="source-list">${sources.map(s=>`<div><b>${s[0]}</b><br/><span>${s[1]}</span></div>`).join('')}</div></section></div></section>`;
  }
  function bind() {
    document.querySelectorAll('[data-jingju-person]').forEach(card => card.addEventListener('click', () => { const p=people[Number(card.dataset.jingjuPerson)]; document.querySelector('#dialogContent').innerHTML=`<div class="dialog-profile"><img src="${p[3]}" alt="${p[0]}"/><div><h2>${p[0]}</h2><div class="meta">${p[1]}　${p[2]}</div><p><b>师承与院团：</b>${p[4]}</p><p><b>代表作品：</b>${p[5]}</p><p><b>表演特点：</b>${p[6]}</p></div></div>`; document.querySelector('#personDialog').showModal(); }));
  }
  function render() { if (location.hash.slice(1) !== 'jingju') return; css(); document.querySelector('#app').innerHTML=page(); window.scrollTo(0,0); bind(); }
  window.addEventListener('hashchange', render); render();
})();
