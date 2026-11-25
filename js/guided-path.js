(function(){
/* guided path: scroll drives the stage */
const stage=document.querySelector('.stage'),arts=[...document.querySelectorAll('.path article')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){arts.forEach(a=>a.classList.toggle('on',a===e.target));stage.dataset.a=e.target.dataset.s}}),{rootMargin:'-45% 0px -45% 0px'});arts.forEach(a=>io.observe(a));
})();
