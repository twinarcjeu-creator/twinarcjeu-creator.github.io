/* mini démo animée : deux orbes reliées par un fil, des ennemis qui arrivent */
(function(){
  var svg=document.getElementById('demo');if(!svg)return;
  var NS='http://www.w3.org/2000/svg',W=300,H=400;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);(p||svg).appendChild(e);return e;}
  var defs=el('defs',{});
  var gl=el('filter',{id:'gl',x:'-50%',y:'-50%',width:'200%',height:'200%'},defs);el('feGaussianBlur',{stdDeviation:'3.5',result:'b'},gl);var mg=el('feMerge',{},gl);el('feMergeNode',{in:'b'},mg);el('feMergeNode',{in:'SourceGraphic'},mg);
  for(var i=0;i<14;i++)el('line',{x1:0,x2:W,y1:i*30,y2:i*30,stroke:'rgba(25,240,255,.05)'});
  for(var j=0;j<11;j++)el('line',{y1:0,y2:H,x1:j*30,x2:j*30,stroke:'rgba(25,240,255,.05)'});
  var wire=el('path',{fill:'none',stroke:'#19f0ff','stroke-width':3,'stroke-linecap':'round',filter:'url(#gl)'});
  var oa=el('circle',{r:12,fill:'#05060d',stroke:'#19f0ff','stroke-width':3,filter:'url(#gl)'});
  var ob=el('circle',{r:12,fill:'#05060d',stroke:'#ff2d95','stroke-width':3,filter:'url(#gl)'});
  var en=[];for(var k=0;k<7;k++){en.push({g:el('g',{filter:'url(#gl)'}),a:Math.random()*6.28,r:130+Math.random()*60,s:.3+Math.random()*.25,h:[350,215,135,52,28,272,172][k]});
    var e=en[k];el('polygon',{points:'0,-9 8,6 -8,6',fill:'hsl('+e.h+',100%,60%)'},e.g);}
  function frame(t){
    t=t/1000;
    var ax=150+Math.cos(t*.9)*70,ay=250+Math.sin(t*1.3)*40,bx=150-Math.cos(t*.9+.4)*70,by=250-Math.sin(t*1.1)*40;
    oa.setAttribute('cx',ax);oa.setAttribute('cy',ay);ob.setAttribute('cx',bx);ob.setAttribute('cy',by);
    var mx=(ax+bx)/2,my=(ay+by)/2+Math.sin(t*5)*6;
    wire.setAttribute('d','M'+ax+' '+ay+' Q'+mx+' '+my+' '+bx+' '+by);
    en.forEach(function(e,i){
      e.r-=e.s*1.2;if(e.r<18){e.r=190;e.a=Math.random()*6.28;}
      var x=150+Math.cos(e.a+t*.15)*e.r*1.0,y=190+Math.sin(e.a+t*.15)*e.r*.95;
      e.g.setAttribute('transform','translate('+x+' '+y+') rotate('+(Math.atan2(my-y,mx-x)*57.3+90)+')');
    });
    if(!reduce)requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
