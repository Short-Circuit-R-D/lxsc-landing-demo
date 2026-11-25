(function(){
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.4});
['polar','fan','sweep'].forEach(id=>rv.observe(document.getElementById(id)));
})();
