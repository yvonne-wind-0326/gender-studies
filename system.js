(function () {
  const docs = window.systemDocuments || [];
  const videos = window.systemVideos || {};
  const app = document.querySelector('#app');
  const colors = ['#b59b58', '#9ba98b', '#b76e45', '#6f7e79', '#8c6b55'];
  const intro = '幕布升起，我们看见一个角色。再走近一些，一个眼神的停留、一次衣袖的起落，都带着反复练习的痕迹，也留着前人传下的分寸。演员跨越性别塑造人物的过程，就藏在这些细微之处。我们循着不同文化中的表演实践，走近声音、动作与穿戴如何共同创造舞台上的性别形象，也追寻那些在一代代身体之间流动的记忆——前人留下的技艺，如何经由今天的身体，成为此刻打动我们的表演。';

  function addStyles() {
    if (document.querySelector('#systemStyles')) return;
    const style = document.createElement('style');
    style.id = 'systemStyles';
    style.textContent = `.system-intro{max-width:820px;margin:0 auto 42px;text-align:center;color:var(--muted);font-size:15px;line-height:2.15}.system-tiles{max-width:1120px;margin:0 auto;display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.system-tile{min-height:230px;padding:26px 18px;display:flex;align-items:flex-end;color:#fffaf0;box-shadow:0 12px 24px rgba(48,41,31,.13);transition:.3s ease}.system-tile:hover{transform:translateY(-8px);box-shadow:0 20px 32px rgba(48,41,31,.2)}.system-tile b{font-size:24px;font-weight:500;letter-spacing:.08em}.system-tile small{display:block;margin-top:10px;font:10px 'Space Grotesk',sans-serif;letter-spacing:.16em;opacity:.8}.system-article{max-width:940px;margin:0 auto}.system-article h2{font-size:25px;font-weight:500;margin:54px 0 15px;padding-top:13px;border-top:1px solid var(--line)}.system-article p{font-size:14px;line-height:2.08;color:#5e584d;margin:11px 0}.system-figure{margin:26px 0 14px;padding:14px;background:#ebe6d8;border:1px solid var(--line);display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.system-figure img{width:100%;height:260px;object-fit:cover;display:block}.system-caption{font-size:12px!important;line-height:1.9!important;color:var(--muted)!important}.system-back{display:inline-flex;margin-top:24px;color:#8a6f34;font-size:12px;border-bottom:1px solid var(--gold);padding-bottom:4px}.system-video-archive{margin:42px 0 54px;padding:28px;background:#eee9dc;border:1px solid var(--line)}.system-video-archive h2{margin:0 0 20px;padding:0;border:0;font-size:22px}.system-video-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.system-video-card{display:block;background:#faf8f0;border:1px solid rgba(92,82,63,.2);color:var(--ink);text-decoration:none;transition:.25s ease;overflow:hidden}.system-video-card:hover{transform:translateY(-4px);box-shadow:0 12px 24px rgba(48,41,31,.14)}.system-video-cover{height:132px;background:linear-gradient(135deg,#a98d48,#4b4031);position:relative;overflow:hidden}.system-video-cover img{width:100%;height:100%;object-fit:cover;display:block;opacity:.9}.system-video-cover:after{content:'↗';position:absolute;right:12px;bottom:10px;width:26px;height:26px;border-radius:50%;background:rgba(255,250,240,.9);color:#5b4d34;text-align:center;line-height:26px;font-size:15px}.system-video-badge{position:absolute;left:12px;top:10px;background:rgba(40,34,27,.78);color:#fffaf0;padding:4px 7px;font:10px 'Space Grotesk',sans-serif;letter-spacing:.12em}.system-video-meta{padding:12px}.system-video-meta b{display:block;font-size:14px;font-weight:500}.system-video-meta small{display:block;margin-top:7px;color:var(--muted);font-size:11px;word-break:break-all}.system-video-ref{color:#8a6f34;text-decoration:underline;text-decoration-color:rgba(181,155,88,.55);text-underline-offset:3px}.system-video-ref:hover{color:#4d3e2a}@media(max-width:900px){.system-tiles{grid-template-columns:repeat(3,1fr)}.system-tile{min-height:180px}.system-video-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.system-tiles{grid-template-columns:1fr 1fr}.system-tile{min-height:150px}.system-tile b{font-size:19px}.system-intro{text-align:left;font-size:14px}.system-figure{grid-template-columns:1fr}.system-figure img{height:230px}.system-video-grid{grid-template-columns:1fr}.system-video-cover{height:150px}}`;
    document.head.appendChild(style);
  }

  function slug(doc) { return `system-${doc.id}`; }
  function landing() {
    const tiles = docs.map((doc, i) => `<a class="system-tile" href="#${slug(doc)}" style="background:${colors[i]}"><span><b>${doc.title}</b><small>打开表演体系 ↗</small></span></a>`).join('');
    return `<section class="page system-page"><div class="page-heading"><div class="eyebrow">05 · Performance System</div><h1>表演体系</h1></div><p class="system-intro">${intro}</p><div class="system-tiles">${tiles}</div></section>`;
  }
  function isHeading(text, index) {
    if (!text) return false;
    if (index === 0) return true;
    if (text.length > 34 || /[。！？：，；]$/.test(text) || /^\[[A-Z]\d+\]/.test(text)) return false;
    return true;
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
  function videoThumb(url) {
    const youtube = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
    if (youtube) return `https://img.youtube.com/vi/${youtube[1]}/hqdefault.jpg`;
    const vimeo = url.match(/vimeo\.com\/(\d+)/);
    return vimeo ? `https://vumbnail.com/${vimeo[1]}.jpg` : '';
  }
  function videoTitle(id) {
    return `${id} 视频资料`;
  }
  function linkifyVideos(text, doc) {
    const map = videos[doc.id] || {};
    let linked = escapeHtml(text).replace(/https?:\/\/[^\s<]+/g, url => `<a class="system-video-ref system-source-link" href="${url}" target="_blank" rel="noopener">${url}</a>`);
    return linked.replace(/\bV\d{2}\b/g, id => map[id] ? `<a class="system-video-ref" href="${escapeHtml(map[id])}" target="_blank" rel="noopener">${id}</a>` : id);
  }
  function videoArchive(doc) {
    const map = videos[doc.id] || {};
    const cards = Object.keys(map).sort().map(id => {
      const url = map[id];
      const thumb = videoThumb(url);
      const cover = thumb ? `<img src="${thumb}" alt="${doc.title} ${id} 视频封面" loading="lazy"/>` : '';
      return `<a class="system-video-card" href="${escapeHtml(url)}" target="_blank" rel="noopener"><div class="system-video-cover">${cover}<span class="system-video-badge">${id}</span></div><div class="system-video-meta"><b>${videoTitle(id)}</b><small>${escapeHtml(new URL(url).hostname)}</small></div></a>`;
    }).join('');
    return cards ? `<section class="system-video-archive"><h2>视频资料</h2><div class="system-video-grid">${cards}</div></section>` : '';
  }
  function article(doc) {
    const body = doc.paragraphs.map((item, i) => {
      const text = item.text || '';
      const image = item.images.length ? `<figure class="system-figure">${item.images.map(src => `<img src="${src}" alt="${doc.title}表演体系图片" loading="lazy"/>`).join('')}</figure>` : '';
      const linkedText = linkifyVideos(text, doc);
      if (i === 0) return `${image}<h1>${linkedText || doc.title}</h1>`;
      if (isHeading(text, i)) return `${image}<h2>${linkedText}</h2>`;
      if (!text) return image;
      const caption = item.text.length < 240 && (/^图\d/.test(item.text) || /摄影版权|图片署名|来源/.test(item.text)) ? ' system-caption' : '';
      return `${image}<p class="${caption.trim()}">${linkedText}</p>`;
    }).join('');
    return `<section class="page system-page"><div class="page-heading"><div class="eyebrow">05 · Performance System</div><h1>${doc.title}</h1><p>完整表演体系文档 · 原文段落与图片按文件顺序呈现</p><a class="system-back" href="#system">← 返回表演体系</a></div><article class="system-article">${body}</article></section>`;
  }
  function render() {
    addStyles();
    const route = location.hash.slice(1);
    if (route === 'system') app.innerHTML = landing();
    else if (route.startsWith('system-')) { const doc = docs.find(d => slug(d) === route); app.innerHTML = doc ? article(doc) : landing(); }
    else return;
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render);
  render();
})();
