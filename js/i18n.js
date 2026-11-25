/* i18n scaffold: add T.ar={...} then setLang('ar'); only English is active. Untagged copy still needs data-i18n keys. */
const T={en:{}};function setLang(l){document.documentElement.lang=l;document.documentElement.dir=['ar','he','fa'].includes(l)?'rtl':'ltr';document.querySelectorAll('[data-i18n]').forEach(e=>{const v=(T[l]||{})[e.dataset.i18n];if(v)e.textContent=v})}setLang('en');
