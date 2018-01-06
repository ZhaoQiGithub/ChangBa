window.onload=function(){

var oCont=document.getElementById("content");
var contNav=getByClass(oCont,"cont_nav")[0];
var navA=contNav.getElementsByTagName("a");
var oLine=contNav.getElementsByTagName("span")[0];
var navOff=contNav.offsetTop;
var contList=getByClass(oCont,"cont_list")[0];
var dlFirst=contList.getElementsByTagName("dl")[0];
var lSpeed=0;
var left=0;
navA[1].style.position="relative";
for(var i=0;i<navA.length;i++){
	navA[i].onclick=function(){
		for(var j=0;j<navA.length;j++){
			navA[j].className="";
		}
		this.className="nav_red";
		lineMove(oLine,this.offsetLeft+23);
	}
}

window.onscroll=function(){
	var oTop=0;
	oTop=document.documentElement.scrollTop||document.body.scrollTop;
	if(navOff<oTop+40){
		contNav.style.position="fixed";
		contNav.style.top="40px";
		dlFirst.style.marginTop="40px";
	}else{
		contNav.style.position="relative";
		contNav.style.top="0";
		dlFirst.style.marginTop="0";
	}
}



function lineMove(obj,iTarget){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			//一.计算速度
			lSpeed+=(iTarget-left)/8;
			lSpeed*=0.7;
			//二.弹性摩擦运动
			if(Math.abs(lSpeed)<1 && Math.abs(left-iTarget)<1){
				clearInterval(obj.timer);
				obj.style.left=iTarget+"px";
			}else{
				left+=lSpeed;
				obj.style.left=left+"px";
			}
		},20);
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


}