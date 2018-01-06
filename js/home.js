var oAd=document.getElementById('ad');
var oBtn=document.getElementById('tg');
var oCb=document.getElementById('cb');
var timerIndex=4;
oBtn.onclick=function(){
	oAd.style.display='none';
}



setTimeout(function(){
   oCb.style.opacity = "0";
   setTimeout(function(){
      oCb.style.display = "none";
      fn();
   },300);
},1000);




function fn(){
   //oCb.style.display='none';
   timerIndex--;
   oBtn.innerHTML='跳过'+timerIndex;
   if (timerIndex>0) {
	   	 setTimeout(function(){
	      fn();
	   },1000);
   }else{
    oAd.style.display='none';
   	document.body.style.overflow='scroll'; 
   }
  
}


var section=document.getElementById('section');
var secInner=section.innerHTML;
var nowHeight=window.screen.height;//当前高度
var allHeight=document.documentElement.scrollHeight;//获取整个html高度。
var secHeight;
var sumHeight

window.onscroll=function(){
   secHeight=document.documentElement.scrollTop||document.body.scrollTop;//滚动条高度
   sumHeight=nowHeight+secHeight+100;//当滚动条下方还未出现的内容高度小于100时，开始增加内容
   console.log(secHeight+"---"+nowHeight+"---"+allHeight);
	if (sumHeight>=allHeight) {
		section.innerHTML+=secInner;
		allHeight=document.documentElement.scrollHeight;//重新获取html插入内容后的高度
	}
}