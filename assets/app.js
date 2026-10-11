/* Small, dependency-free interactions. All project content is present in the HTML. */
(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const closeMenu = () => { nav?.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); menu?.setAttribute('aria-label','打开导航'); };
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open?'关闭导航':'打开导航'); nav.classList.toggle('open',open);
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    let count=0;
    document.querySelectorAll('[data-category]').forEach(card=>{const visible=filter==='all'||card.dataset.category===filter;card.hidden=!visible;if(visible)count++;});
    document.querySelector('#filter-status').textContent=`显示 ${count} 个${filter==='all'?'':button.textContent}项目`;
  }));
  const galleryImage=document.querySelector('#gallery-image');
  document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{
    galleryImage.src=button.dataset.image;galleryImage.alt=button.dataset.caption;
    document.querySelector('#gallery-caption').textContent=button.dataset.caption;
    document.querySelectorAll('[data-image]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  }));
  const dialog=document.querySelector('.image-dialog');
  document.querySelector('.image-enlarge')?.addEventListener('click',()=>{
    dialog.querySelector('img').src=galleryImage.src;dialog.querySelector('img').alt=galleryImage.alt;dialog.querySelector('p').textContent=galleryImage.alt;dialog.showModal();
  });
  dialog?.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
})();
