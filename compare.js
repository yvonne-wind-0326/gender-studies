(function () {
  const docs = window.compareDocuments || [];
  const app = document.querySelector('#app');
  const colors = ['#b59b58','#9ba98b','#b76e45','#6f7e79','#8c6b55','#c5b584','#7c8c6b','#9a7663','#a58a55','#72818b'];

  function addStyles() {
    if (document.querySelector('#compareStyles')) return;
    const style = document.createElement('style'); style.id = 'compareStyles';
    style.textContent = `.compare-wheel-wrap{max-width:1120px;margin:0 auto;padding:16px 0 70px}.compare-wheel{position:relative;width:min(760px,86vw);height:min(760px,86vw);margin:20px auto 60px;border-radius:50%;background:radial-gradient(circle,#f7f3e9 0 20%,transparent 20.2%),radial-gradient(circle,rgba(178,154,87,.11) 0 48%,transparent 48.3%),radial-gradient(circle,transparent 0 61%,rgba(48,41,31,.12) 61.2% 61.45%,transparent 61.7%);border:1px solid var(--line)}.compare-wheel:before,.compare-wheel:after{content:"";position:absolute;inset:10%;border:1px dashed rgba(178,154,87,.45);border-radius:50%;pointer-events:none}.compare-wheel:after{inset:26%;border-style:solid;opacity:.45}.compare-center{position:absolute;inset:34%;display:grid;place-items:center;text-align:center;color:var(--gold);font-size:clamp(21px,3vw,34px);font-weight:500;letter-spacing:.14em;z-index:1}.compare-center small{display:block;margin-top:8px;font:10px "Space Grotesk",sans-serif;letter-spacing:.18em;color:var(--muted)}.compare-node{position:absolute;left:50%;top:50%;width:clamp(120px,18vw,170px);min-height:92px;padding:15px 12px;display:flex;align-items:center;justify-content:center;text-align:center;border:1px solid rgba(48,41,31,.15);box-shadow:0 12px 22px rgba(48,41,31,.11);transform:translate(-50%,-50%) rotate(var(--angle)) translateY(calc(min(-30vw,-220px))) rotate(calc(var(--angle) * -1));color:#fffaf0;transition:.3s ease;z-index:2}.compare-node:hover{transform:translate(-50%,-50%) rotate(var(--angle)) translateY(calc(min(-30vw,-220px) - 8px)) rotate(calc(var(--angle) * -1));box-shadow:0 20px 30px rgba(48,41,31,.2)}.compare-node b{font-size:clamp(15px,1.7vw,20px);font-weight:500;line-height:1.35}.compare-node small{display:block;margin-top:6px;font:10px "Space Grotesk",sans-serif;opacity:.78;letter-spacing:.08em}.compare-intro{max-width:760px;margin:0 auto 10px;text-align:center;color:var(--muted);font-size:14px;line-height:2}.compare-index{max-width:860px;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.compare-index a{padding:18px 20px;background:#ebe6d8;border:1px solid var(--line);transition:.25s}.compare-index a:hover{border-color:var(--gold);transform:translateY(-4px)}.compare-index b{font-size:18px;font-weight:500}.compare-index small{display:block;margin-top:6px;color:var(--muted);font:11px "Space Grotesk",sans-serif}.compare-page .page-heading{margin-bottom:38px}.compare-article{max-width:940px;margin:0 auto}.compare-article .compare-block{margin:28px 0}.compare-article h2{font-size:25px;font-weight:500;margin:54px 0 15px;padding-top:13px;border-top:1px solid var(--line)}.compare-article h3{font-size:19px;font-weight:500;margin:30px 0 10px;color:#5f5237}.compare-article p{font-size:14px;line-height:2.08;color:#5e584d;margin:11px 0}.compare-figure{margin:26px 0 14px;padding:14px;background:#ebe6d8;border:1px solid var(--line);display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.compare-figure img{width:100%;height:260px;object-fit:cover;display:block}.compare-caption{font-size:12px!important;line-height:1.9!important;color:var(--muted)!important;margin-top:10px!important}.compare-back{display:inline-flex;margin-top:24px;color:#8a6f34;font-size:12px;border-bottom:1px solid var(--gold);padding-bottom:4px}@media(max-width:800px){.compare-wheel{width:92vw;height:92vw}.compare-node{width:116px;min-height:82px;padding:11px 8px;transform:translate(-50%,-50%) rotate(var(--angle)) translateY(calc(min(-36vw,-175px))) rotate(calc(var(--angle) * -1))}.compare-node:hover{transform:translate(-50%,-50%) rotate(var(--angle)) translateY(calc(min(-36vw,-175px) - 6px)) rotate(calc(var(--angle) * -1))}.compare-figure{grid-template-columns:1fr}.compare-figure img{height:230px}}@media(max-width:520px){.compare-wheel{width:96vw;height:96vw}.compare-node{width:94px;min-height:72px}.compare-node b{font-size:13px}.compare-node small{font-size:8px}.compare-index{grid-template-columns:1fr}.compare-article h2{font-size:22px}.compare-article h3{font-size:17px}}`;
    document.head.appendChild(style);
  }

  function slug(doc) { return `compare-${doc.id}`; }
  function wheel() {
    const nodes = docs.map((doc, i) => `<a class="compare-node" href="#${slug(doc)}" style="--angle:${i * 36}deg;background:${colors[i]}" aria-label="打开${doc.title}"><span><b>${doc.title}</b><small>打开比较文档 ↗</small></span></a>`).join('');
    const index = docs.map((doc, i) => `<a href="#${slug(doc)}"><b>${String(i + 1).padStart(2, '0')}　${doc.title}</b><small>比较文档 · ${doc.paragraphs.length} 个内容段落</small></a>`).join('');
    return `<section class="page compare-page"><div class="page-heading"><div class="eyebrow">04 · Compare</div><h1>比较</h1><p>选择一组剧种，进入完整的比较档案。轮盘中的十个标题对应文件夹内的十份 Word 文档，正文、来源索引与图片均按原文顺序保留。</p></div><div class="compare-wheel-wrap"><div class="compare-wheel"><div class="compare-center">比较<small>10 ARCHIVES</small></div>${nodes}</div><div class="compare-index">${index}</div></div></section>`;
  }

  function isHeading(text, index) {
    if (!text) return false;
    if (index === 0 || text === '来源索引') return true;
    if (text.length > 32 || /[。！？：，；]$/.test(text) || /^\[S\d+\]/.test(text)) return false;
    return true;
  }
  function article(doc) {
    const body = doc.paragraphs.map((item, i) => {
      const text = item.text || '';
      const image = item.images.length ? `<figure class="compare-figure">${item.images.map(src => `<img src="${src}" alt="${doc.title}文档图片" loading="lazy"/>`).join('')}</figure>` : '';
      if (i === 0) return `${image}<h1>${text || doc.title}</h1>`;
      if (isHeading(text, i)) return `${image}<h2>${text}</h2>`;
      if (!text) return image;
      const caption = i > 0 && item.text && /\[S\d+\]/.test(item.text) && item.text.length < 240 ? ' compare-caption' : '';
      return `${image}<p class="${caption.trim()}">${text}</p>`;
    }).join('');
    return `<section class="page compare-page"><div class="page-heading"><div class="eyebrow">04 · Compare Archive</div><h1>${doc.title}</h1><p>完整比较文档 · 原文段落与图片按文件顺序呈现</p><a class="compare-back" href="#compare">← 返回比较轮盘</a></div><article class="compare-article">${body}</article></section>`;
  }
  function render() {
    addStyles();
    const route = location.hash.slice(1);
    if (route === 'compare') app.innerHTML = wheel();
    else if (route.startsWith('compare-')) { const doc = docs.find(d => slug(d) === route); app.innerHTML = doc ? article(doc) : wheel(); }
    else return;
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render); render();
})();
