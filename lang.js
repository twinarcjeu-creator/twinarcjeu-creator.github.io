(function(){
  var d=document.documentElement,KEY='twinarc.site.lang',l=null;
  try{l=localStorage.getItem(KEY);}catch(e){}
  if(l!=='fr'&&l!=='en')l=((navigator.language||'fr').slice(0,2)==='fr')?'fr':'en';
  function set(x){d.lang=x;[].forEach.call(document.querySelectorAll('.lang button'),function(b){b.setAttribute('aria-pressed',String(b.dataset.set===x));});try{localStorage.setItem(KEY,x);}catch(e){}}
  set(l);
  [].forEach.call(document.querySelectorAll('.lang button'),function(b){b.addEventListener('click',function(){set(b.dataset.set);});});
})();
