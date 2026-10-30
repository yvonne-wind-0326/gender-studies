(function () {
  const style = document.createElement('style');
  style.textContent = '.home-sections.region-links{grid-template-columns:repeat(3,1fr)}.china-options{display:flex;flex-wrap:wrap;gap:14px;margin-top:16px}.region-toggle{background:transparent;border:0;border-bottom:1px solid #b29a57;cursor:pointer;font-family:inherit;padding:0 0 3px}.region-card{cursor:pointer}.region-card:hover{transform:translateY(-5px);border-color:var(--gold)}@media(max-width:800px){.home-sections.region-links{grid-template-columns:1fr}}';
  document.head.appendChild(style);


  function regionPage() {
    return `<section class="page"><div class="page-heading"><div class="eyebrow">06 · Region</div><h1>地域</h1><p>从地域进入剧种。中国展开三个剧种入口，日本与泰国直达对应传统。</p></div><div class="content-wrap"><div class="art-grid"><article class="art-card"><h3>中国　＋</h3><p>点击展开：昆曲、越剧、京剧。</p><button class="watch region-toggle" type="button">展开中国剧种</button><div class="china-options" hidden><a class="watch" href="#kunqu">昆曲　→</a><a class="watch" href="#placeholder-yueju">越剧　→</a><a class="watch" href="#placeholder-jingju">京剧　→</a></div></article><a class="art-card region-card" href="#placeholder-kabuki"><h3>日本　→</h3><p>进入日本歌舞伎具体介绍页面。</p></a><a class="art-card region-card" href="#placeholder-khon"><h3>泰国　→</h3><p>进入泰国孔剧具体介绍页面。</p></a></div></div></section>`;
  }


  function addHomeLinks() {
    if (document.querySelector('.region-links')) return;
    document.querySelector('.top-nav')?.insertAdjacentHTML('beforeend', '<a href="#region">地域</a>');
    const section = document.createElement('section');
    section.className = 'home-sections region-links';
    section.innerHTML = '<a class="notice-panel" href="#compare"><span class="panel-label">COMPARE</span><h2>比较　→</h2><p>按角色、技法、训练与历史语境继续比较不同传统。</p></a><a class="notice-panel" href="#system"><span class="panel-label">PERFORMANCE SYSTEM</span><h2>表演体系　→</h2><p>后续补充不同剧种的角色分类与训练结构。</p></a><a class="notice-panel" href="#region"><span class="panel-label">REGION</span><h2>地域　→</h2><p>从中国、日本和泰国进入对应的剧种介绍页面。</p></a>';
    document.querySelector('#app')?.appendChild(section);
  }


  function renderRegion() {
    const app = document.querySelector('#app');
    if (!app || location.hash.slice(1) !== 'region') return;
    app.innerHTML = regionPage();
    const toggle = app.querySelector('.region-toggle');
    toggle.addEventListener('click', () => {
      const options = app.querySelector('.china-options');
      options.hidden = !options.hidden;
      toggle.textContent = options.hidden ? '展开中国剧种' : '收起中国剧种';
    });
    window.scrollTo(0, 0);
  }


  addHomeLinks();
  renderRegion();
  window.addEventListener('hashchange', renderRegion);
  window.addEventListener('hashchange', () => setTimeout(addHomeLinks, 0));
})();

