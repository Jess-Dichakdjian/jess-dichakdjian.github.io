// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// entrance animations
window.addEventListener('load', ()=>{
  document.querySelectorAll('.profile, .card').forEach((el,i)=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(8px)';
    setTimeout(()=>{ el.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.2,.9,.2,1)'; el.style.opacity=1; el.style.transform='none'; }, 80*i);
  });
  document.querySelectorAll('.thumb video').forEach(v=>{ v.play().catch(()=>{}); });
});

// Project modal logic
const modal = document.getElementById('modal');
const mTitle = document.getElementById('mTitle');
const mDesc = document.getElementById('mDesc');
const mMedia = document.getElementById('mMedia');
const modalClose = document.getElementById('modalClose');

function openModal(title, desc, media){
  mTitle.textContent = title;
  mDesc.textContent = desc;
  mMedia.innerHTML = media || '';
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  modalClose.focus();
}
function closeModal(){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); mMedia.innerHTML=''; document.body.style.overflow=''; }

document.querySelectorAll('.project').forEach(p=>{
  p.addEventListener('click', ()=>{
    const title = p.dataset.title;
    const desc = p.dataset.desc;
    const media = p.dataset.media; // format type:path
    let html = '';
    if(media){
      const parts = media.split(':');
      const type = parts[0];
      const path = parts.slice(1).join(':');
      if(type==='video') html = '<video controls style="width:100%; border-radius:8px"><source src="'+path+'" type="video/mp4">Your browser does not support video.</video>';
      else if(type==='gif') html = '<img src="'+path+'" alt="'+title+'" style="width:100%; border-radius:8px">';
      else if(type==='image') html = '<img src="'+path+'" alt="'+title+'" style="width:100%; border-radius:8px">';
    }
    openModal(title, desc, html);
  });
  p.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') p.click(); });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

// Contact CTA
document.getElementById('hireBtn').addEventListener('click', ()=>{
  openModal('Contact', 'Email: jessydishakjian@gmail.com • Phone: +39 3514202953 • LinkedIn: https://www.linkedin.com', '');
});

// simple parallax on mouse move
const heroBg = document.querySelector('.hero-bg');
if(heroBg){
  document.querySelector('.hero').addEventListener('mousemove', e=>{
    const rect = heroBg.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    heroBg.style.transform = `translate(${cx*10}px, ${cy*6}px) scale(1.03)`;
    heroBg.style.transition = 'transform 0.12s linear';
  });
}
