(function(){
const r=document.documentElement;document.getElementById('theme').onclick=()=>{const d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);r.dataset.theme=d?'light':'dark'};
})();
