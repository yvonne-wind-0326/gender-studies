(function () {
  'use strict';
  const docs = window.repairedArticles || {};
  const escape = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function figures(block, route, doc) {
    const short = doc.title.replace(/的舞台性别$|跨性别角色表演体系$/g, '');
    const alt = route === 'guide' ? '入门指南文档图片' : route.startsWith('system-') ? short + '表演体系图片' : short + '文档图片';
    return (block.figures || []).map(f => `<figure class="restored-figure"><img src="${escape(f.src)}" alt="${escape(alt)}" loading="lazy">${f.caption ? `<figcaption>${f.caption}</figcaption>` : ''}</figure>`).join('');
  }
  function player(b) {
    return `<div class="restored-video" data-video-slot="${escape(b.slot)}"><div class="restored-player"><iframe src="${escape(b.src)}" title="${escape(b.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><a class="restored-video-backup" href="https://www.youtube.com/watch?v=${escape(b.id)}" target="_blank" rel="noopener noreferrer">在YouTube打开 ↗</a></div>`;
  }
  function table(b, i) {
    const row = (cells, head) => `<tr>${cells.map(c => { const tag = head ? 'th' : 'td'; return `<${tag}${head ? ' scope="col"' : ''}${c.span > 1 ? ` colspan="${c.span}"` : ''}>${c.html}</${tag}>`; }).join('')}</tr>`;
    return `<div class="restored-table-wrap" tabindex="0" role="region" aria-label="表格 ${i}"><table><thead>${row(b.rows[0], true)}</thead><tbody>${b.rows.slice(1).map(r => row(r, false)).join('')}</tbody></table></div>`;
  }
  function article(doc, route) {
    let count = 0, section = '';
    const blocks = doc.blocks.map(b => {
      if (b.kind === 'title' || b.kind === 'skip' || b.consumed) return '';
      const image = figures(b, route, doc);
      if (b.kind === 'table') return table(b, ++count);
      if (b.kind === 'player') return player(b);
      if (b.kind === 'heading') {
        if (b.level === 2) section = b.text;
        // Reading/viewing entry names are labels within their formal section.
        if (route === 'guide' && /初学者推荐(?:阅读|观看)/.test(section) && b.level > 2) return `${image}<p class="restored-label"><strong>${b.html}</strong></p>`;
        return `${image}<h${b.level}>${b.html}</h${b.level}>`;
      }
      if (!b.text) return image;
      let content = b.html;
      if (route === 'guide' && section === '术语表' && b.kind === 'p') {
        const colon = content.indexOf('：');
        if (colon > 0) content = `<strong>${content.slice(0, colon)}</strong>${content.slice(colon)}`;
      }
      const source = /^\[S\d+\]/.test(b.text);
      if (b.kind === 'label' || b.kind === 'video-title') content = `<strong>${content}</strong>`;
      return `${image}<p class="${source ? 'restored-source' : 'restored-' + b.kind}">${content}</p>`;
    }).join('');
    const back = route.startsWith('system-') ? ['system', '返回表演体系'] : route.startsWith('compare-') ? ['compare', '返回比较轮盘'] : null;
    return `<section class="page restored-page"><header class="page-heading"><h1>${escape(doc.title)}</h1>${back ? `<a class="restored-back" href="#${back[0]}">← ${back[1]}</a>` : ''}</header><article class="restored-article" data-restored-route="${route}">${blocks}</article></section>`;
  }
  function styles() {
    if (document.getElementById('contentRepairStyles')) return;
    const s = document.createElement('style'); s.id = 'contentRepairStyles';
    s.textContent = `
      .restored-article{max-width:940px;margin:auto;font-size:15px;line-height:2;color:#5e584d;overflow-wrap:anywhere}
      .restored-page .page-heading{max-width:940px}.restored-page h1{font-size:clamp(30px,4.6vw,54px)}
      .restored-article h2{font-size:27px;line-height:1.5;font-weight:600;color:var(--ink);margin:60px 0 22px;padding-top:20px;border-top:1px solid var(--line)}
      .restored-article h3{font-size:21px;line-height:1.6;font-weight:600;color:var(--ink);margin:32px 0 14px}
      .restored-article h4{font-size:18px;font-weight:600;line-height:1.6;color:var(--ink);margin:25px 0 12px}
      .restored-article p{font-size:15px;line-height:2;margin:12px 0;white-space:normal}
      .restored-article strong{font-weight:700;color:var(--ink)}
      .restored-article .restored-label{margin-top:25px}.restored-article .restored-video-title{margin:28px 0 8px;font-size:17px}
      .restored-article .restored-video-meta{font-size:13px;color:var(--muted);margin:6px 0}.restored-article .restored-video-hint{font-size:14px;border-left:2px solid var(--gold);padding-left:14px;margin:14px 0}
      .restored-article a,.restored-back{color:#8a6f34;text-decoration:underline;text-underline-offset:3px}
      .restored-article .restored-source,.restored-article .restored-caption{font-size:12px;line-height:1.85;color:var(--muted)}
      .restored-table-wrap{max-width:100%;overflow-x:auto;margin:24px 0 30px;border:1px solid var(--line);background:rgba(255,255,255,.2)}
      .restored-table-wrap table{border-collapse:collapse;width:100%;min-width:500px;text-align:left;font-size:14px;line-height:1.9}
      .restored-table-wrap th{background:#e5deca;font-weight:600;color:var(--ink)}
      .restored-table-wrap th,.restored-table-wrap td{padding:15px 18px;border-bottom:1px solid var(--line);vertical-align:top}
      .restored-table-wrap tr:last-child td{border-bottom:0}.restored-table-wrap th:first-child,.restored-table-wrap td:first-child{width:24%;border-right:1px solid var(--line)}
      .restored-figure{margin:28px auto;max-width:100%;padding:14px;background:#ebe6d8;border:1px solid var(--line)}
      .restored-figure img{display:block;width:100%;height:auto;max-height:none;object-fit:contain}
      .restored-figure figcaption{margin-top:12px;font-size:12px;line-height:1.85;color:var(--muted)}
      .restored-video{margin:20px 0 32px}.restored-player{position:relative;aspect-ratio:16/9;width:100%;background:#191919}
      .restored-player iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.restored-video-backup{display:inline-block;margin-top:9px;font-size:12px}
      @media(max-width:600px){.restored-article p{font-size:14px}.restored-article h2{font-size:23px;margin-top:42px}.restored-article h3{font-size:19px}.restored-figure{padding:8px}.restored-table-wrap th,.restored-table-wrap td{padding:11px 13px}}
    `; document.head.appendChild(s);
  }
  function render() {
    const route = location.hash.slice(1), doc = docs[route];
    if (!doc) return;
    styles(); document.getElementById('app').innerHTML = article(doc, route); window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render); render();
})();
