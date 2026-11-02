function kabukiEscape(value){return String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function kabukiLinks(value){
  const escaped=kabukiEscape(value);
  return escaped.replace(/https?:\/\/[^\s<]+/g,url=>`<a class="kabuki-link" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
}
function kabukiStyles(){
  if(document.querySelector('#kabukiStyles'))return;
  const s=document.createElement('style');s.id='kabukiStyles';
  s.textContent=`
  .kabuki-document{max-width:920px;margin:0 auto}.kabuki-document h2{font-size:27px;font-weight:500;margin:54px 0 18px;padding-top:16px;border-top:1px solid var(--line)}.kabuki-document h2.kabuki-title{margin-top:0;padding-top:0;border-top:0}.kabuki-document h3{font-size:20px;font-weight:500;margin:34px 0 12px;color:#514735}.kabuki-document p{font-size:14px;line-height:2.08;color:#5e584d;margin:11px 0}.kabuki-link{color:#8a6f34;text-decoration:underline;text-decoration-color:rgba(181,155,88,.65);text-underline-offset:3px;overflow-wrap:anywhere}.kabuki-figure{margin:28px 0 12px;padding:14px;background:#ebe6d8;border:1px solid var(--line)}.kabuki-figure img{display:block;width:100%;max-height:620px;object-fit:contain}.kabuki-caption{font-size:12px!important;line-height:1.9!important;color:var(--muted)!important}.kabuki-people-intro{color:var(--muted)!important}.kabuki-people-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:24px 0 34px}.kabuki-person-card{border:1px solid var(--line);background:#f7f4eb;padding:0;text-align:left;cursor:pointer;transition:transform .2s,box-shadow .2s}.kabuki-person-card:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(65,53,32,.12)}.kabuki-person-card img{display:block;width:100%;height:220px;object-fit:cover;background:#ddd7c7}.kabuki-person-card .person-info{padding:14px 15px 16px}.kabuki-person-card h3{margin:0 0 7px;font-size:18px;color:var(--ink)}.kabuki-person-card small{color:var(--muted);line-height:1.6}.kabuki-link-section{margin-top:60px;padding-top:28px;border-top:1px solid var(--line)}.kabuki-link-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.kabuki-link-card{display:block;min-height:150px;padding:0;border:1px solid var(--line);background:#f4f0e4;color:var(--ink);text-decoration:none;overflow:hidden;transition:transform .2s,box-shadow .2s}.kabuki-link-card:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(65,53,32,.12)}.kabuki-link-cover{height:82px;display:flex;align-items:flex-end;padding:12px;background:linear-gradient(135deg,#56634f,#b39b58);color:#fff;font-size:12px;letter-spacing:.08em}.kabuki-link-card:nth-child(3n+2) .kabuki-link-cover{background:linear-gradient(135deg,#754d3d,#c6a66b)}.kabuki-link-card:nth-child(3n) .kabuki-link-cover{background:linear-gradient(135deg,#343b3c,#7d8b75)}.kabuki-link-card img{display:block;width:100%;height:82px;object-fit:cover}.kabuki-link-body{padding:12px 14px 15px}.kabuki-link-body strong{display:block;font-size:14px;font-weight:500;line-height:1.55}.kabuki-link-body small{display:block;margin-top:6px;color:var(--muted);overflow-wrap:anywhere}
  @media(max-width:700px){.kabuki-people-grid,.kabuki-link-grid{grid-template-columns:1fr 1fr}.kabuki-person-card img{height:190px}}
  @media(max-width:480px){.kabuki-people-grid,.kabuki-link-grid{grid-template-columns:1fr}}
  `;document.head.appendChild(s)
}
function kabukiRenderImage(item){return item.images&&item.images.length?`<figure class="kabuki-figure">${item.images.map(src=>`<img src="${src}" alt="歌舞伎文档图片" loading="lazy"/>`).join('')}</figure>`:''}
function kabukiPersonMarkup(doc){
  const people=doc.people||[];
  return `<div class="kabuki-people-grid">${people.map((p,i)=>`<article class="kabuki-person-card" data-kabuki-person="${i}"><img src="${p.img}" alt="${kabukiEscape(p.name)}肖像或剧照" loading="lazy"/><div class="person-info"><h3>${kabukiEscape(p.name)}</h3><small>${kabukiEscape(p.role)}</small></div></article>`).join('')}</div>`
}
function kabukiLinkCards(doc){
  const links=[];const seen=new Set();
  (doc.paragraphs||[]).forEach(item=>{const matches=(item.text||'').match(/https?:\/\/[^\s，。；）)]+/g)||[];matches.forEach(href=>{if(!seen.has(href)){seen.add(href);const before=(item.text||'').split(href)[0].replace(/[｜:：\s]+$/,'');links.push({href,title:before||'外部资料',host:new URL(href).hostname.replace(/^www\./,'')})}})});
  return `<section class="kabuki-link-section"><h2>文档链接与资料入口</h2><p class="kabuki-people-intro">以下封面均为文档中出现的外部资料入口，点击后在新窗口打开原始页面。</p><div class="kabuki-link-grid">${links.map(x=>{const video=x.href.includes('vimeo.com/');const id=video?x.href.split('/').filter(Boolean).pop():'';const cover=video?`<img src="https://vumbnail.com/${id}.jpg" alt="${kabukiEscape(x.title)}视频封面"/>`:`<div class="kabuki-link-cover">${kabukiEscape(x.host)}</div>`;return `<a class="kabuki-link-card" href="${x.href}" target="_blank" rel="noopener noreferrer">${cover}<div class="kabuki-link-body"><strong>${kabukiEscape(x.title||x.host)}</strong><small>${kabukiEscape(x.host)} ↗</small></div></a>`}).join('')}</div></section>`
}
function kabuki(){
  kabukiStyles();const doc=window.kabukiDocument||{paragraphs:[],people:[]};let inPeople=false,inInstitutions=false;let body='';
  (doc.paragraphs||[]).forEach(item=>{
    const t=item.text||'';const style=item.style||'';const image=kabukiRenderImage(item);
    if(t.startsWith('3. 剧种专题页')||t.startsWith('主题：'))return;
    if(t.startsWith('D. 代表演员与传承')){inPeople=true;body+=`<section class="section-block kabuki-people-block"><h2>D　代表演员与传承</h2><p class="kabuki-people-intro">代表人物仅显示姓名与对应图片，点击人物卡片查看完整介绍。</p>${kabukiPersonMarkup(doc)}</section>`;return}
    if(inPeople&&t.startsWith('三、传承机构群体')){inPeople=false;inInstitutions=true;body+=`<section class="section-block"><h3>${kabukiLinks(t)}</h3>`;return}
    if(inPeople)return;
    if(t.startsWith('E.')){inInstitutions=false;body+=`<section class="section-block"><h2>${kabukiLinks(t)}</h2>`;return}
    if(t.startsWith('F.')||t.startsWith('G.')||t==='资料使用说明'){body+=`<section class="section-block"><h2>${kabukiLinks(t)}</h2>`;return}
    if(t.startsWith('A.')||t.startsWith('C.')){body+=`<section class="section-block"><h2>${kabukiLinks(t)}</h2>`;return}
    if(style==='3'||style==='Heading1'||style==='Title'){body+=`${image}<h2 class="${style==='Title'?'kabuki-title':''}">${kabukiLinks(t)}</h2>`;return}
    if(style==='4'||style==='Heading2'){body+=`${image}<h3>${kabukiLinks(t)}</h3>`;return}
    if(/^图\d+/.test(t)){body+=`${image}<p class="kabuki-caption">${kabukiLinks(t)}</p>`;return}
    if(t||image)body+=`${image}${t?`<p>${kabukiLinks(t)}</p>`:''}`;
  });
  return `<section class="page"><div class="page-heading"><div class="eyebrow">03 · Kabuki</div><h1>日本歌舞伎</h1><p>日本古典戏剧中的女形、立役与跨性别角色表演传统。</p></div><article class="kabuki-document">${body}${kabukiLinkCards(doc)}</article></section>`
}
function bindKabukiPeople(){
  document.querySelectorAll('[data-kabuki-person]').forEach(card=>card.addEventListener('click',()=>{const p=(window.kabukiDocument.people||[])[Number(card.dataset.kabukiPerson)];if(!p)return;document.querySelector('#dialogContent').innerHTML=`<div class="dialog-profile"><img src="${p.img}" alt="${kabukiEscape(p.name)}"/><div><h2>${kabukiEscape(p.name)}</h2><div class="meta">${kabukiEscape(p.roman)}　${kabukiEscape(p.years)}<br/>${kabukiEscape(p.role)}</div><p>${kabukiLinks(p.detail)}</p></div></div>`;document.querySelector('#personDialog').showModal()}))
}
