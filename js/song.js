window.onload=function(){
var oMaskl=document.getElementById("mask_l");
var oMaskr=document.getElementById("mask_r");
var oDian=document.getElementById("dian");
var oLt=document.getElementById("lt");

oDian.onclick=function(){
	oMaskr.style.display="block";
	oMaskl.style.display="none";
	startMove(oMaskr,"left",0);
	oTop=0;
}
oLt.onclick=function(){
	oMaskl.style.display="block";
	startMove(oMaskr,"left",320,function(){
		oMaskr.style.display="none";
	});
	
	
	
}


var oBner=document.getElementById("banner");
var bnerUl=oBner.getElementsByTagName("ul")[0];
var bnerLi=bnerUl.getElementsByTagName("li");
var bnerP=oBner.getElementsByTagName("p")[0];
var bnerSpan=bnerP.getElementsByTagName("span");
var timer=null;
var iNow=0;
bnerUl.innerHTML+=bnerUl.innerHTML;
bnerUl.style.width=bnerLi.length*bnerLi[0].offsetWidth+"px";

autoPlay();
function autoPlay(){
	clearInterval(timer);
	timer=setInterval(function(){
		iNow++;
		if(iNow==bnerSpan.length){
			iNow=0;
		}
		tab();
	},2500);
}
for(var i=0;i<bnerSpan.length;i++){
	bnerSpan[i].index=i;
	bnerSpan[i].onclick=function(){
		for(var j=0;j<bnerSpan.length;j++){
			bnerSpan[j].className=" ";
		}
		this.className="white";
		if(bnerUl.offsetLeft<-bnerUl.offsetWidth/2){
	 		bnerUl.style.left=0;
		 }
		startMove(bnerUl,"left",-bnerLi[this.index].offsetLeft);
	}
}
function tab(){
		for(var x=0;x<bnerSpan.length;x++){
			bnerSpan[x].className="";
		}
		bnerSpan[iNow].className="white";
		if(bnerUl.offsetLeft<-bnerUl.offsetWidth/2){
	 		bnerUl.style.left=0;
		 }
			startMove(bnerUl,"left",-bnerLi[iNow].offsetLeft);
	}


var oCont=document.getElementById("content");
var oAd=getByClass(oCont,"ad")[0];
var adA=oAd.getElementsByTagName("a");
var oNav=getByClass(oCont,"nav")[0];
var navLi=oNav.getElementsByTagName("li");
var navA=oNav.getElementsByTagName("a");
var navP=navLi[navLi.length-1];
var navMsg=getByClass(oCont,"nav_Msg")[0];
var navPosi=getByClass(oCont,"nav_posi")[0];
var oSection=navPosi.getElementsByTagName("section");
var navOff=oNav.offsetTop;
var lSpeed=0;
var left=0;
navPosi.innerHTML+=navPosi.innerHTML;
navPosi.style.width=oSection.length*oSection[0].offsetWidth+"px";
for(var ai=0;ai<adA.length;ai++){
	adA[ai].onclick=function(){
		for(var Ai=0;Ai<adA.length;Ai++){
			adA[Ai].style.opacity="0.7";
		}
		this.style.opacity="1";
	}
}
window.onscroll=function(){
	var oTop=0;
	oTop=document.documentElement.scrollTop||document.body.scrollTop;
	if(navOff<oTop+40){
		oNav.style.position="fixed";
		oNav.style.top="40px";
	}else{
		oNav.style.position="relative";
		oNav.style.top="0";
	}
}

for(var i=0;i<navA.length;i++){
	navA[i].index=i;
	navA[i].onclick=function(){
		for(var j=0;j<navA.length;j++){
			navA[j].className="";
		}
		this.className="red";
		lineMove(navP,navLi[this.index].offsetLeft+4);
		if(navPosi.offsetLeft<-navPosi.offsetWidth/2){
	 		navPosi.style.left=0;
		 }
		startMove(navPosi,"left",-oSection[this.index].offsetLeft);
	}
}




function lineMove(obj,iTarget){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			//一.计算速度
			lSpeed+=(iTarget-left)/3;
			lSpeed*=0.6;
			//二.弹性摩擦运动
			if(Math.abs(lSpeed)<1 && Math.abs(left-iTarget)<1){
				clearInterval(obj.timer);
				obj.style.left=iTarget+"px";
			}else{
				left+=lSpeed;
				obj.style.left=left+"px";
			}
		},30);
	}


function getByClass(oParent,oClass){
	var allEle=document.getElementsByTagName("*");
	var aResult=[];

	for(var i=0;i<allEle.length;i++){
		if(allEle[i].className==oClass){
			aResult.push(allEle[i]);
		}

	}
	return aResult;
}

	function getStyle(obj,attr){//1.获取css内嵌样式中某个属性的值
		if(obj.currentStyle){//IE
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	}
//obj:元素名称, attr:属性, iTarget:目的地, fn:回调函数
	function startMove(obj,attr,iTarget,fn){//2.缓动框架
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var iCur=0;
			if(attr=="opacity"){
				iCur=parseInt(parseFloat(getStyle(obj,attr))*100);//原有的alpha
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}

			var iSpeed=(iTarget-iCur)/8;
			iSpeed=iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed) ;//1.速度

			if(iTarget==iCur){//2.判断是否到达目的地
				clearInterval(obj.timer);
				if(fn) fn(); //停止后,执行回调函数.
			}else{
				if(attr=="opacity"){
					iCur += iSpeed;
					obj.style.opacity=iCur/100;
					obj.style.filter='alpha(opacity:'+iCur+')';
				}else{
					obj.style[attr]=iCur+iSpeed+"px";
				}				
			}
		},8);
	}
	function startMove1(obj,attr,iTarget,fn){//2.缓动框架
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var iCur=0;
			if(attr=="opacity"){
				iCur=parseInt(parseFloat(getStyle(obj,attr))*100);//原有的alpha
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}

			var iSpeed=(iTarget-iCur)/8;
			iSpeed=iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed) ;//1.速度

			if(iTarget==iCur){//2.判断是否到达目的地
				clearInterval(obj.timer);
				if(fn) fn(); //停止后,执行回调函数.
			}else{
				if(attr=="opacity"){
					iCur += iSpeed;
					obj.style.opacity=iCur/100;
					obj.style.filter='alpha(opacity:'+iCur+')';
				}else{
					obj.style[attr]=iCur+iSpeed+"px";
				}				
			}
		},50);
	}

	
}