$(function(){
	var canvas=$('#canvas').get(0);
	var ctx=canvas.getContext("2d");
	var sep=40;
	var sr=3;
	var br=18;
	var kaiguan=true;
	var zi={};
	var audio=$("audio").get(0);
	function l(x){
		return (x+0.5)*sep+0.5;
	}
	function circle(x,y){
		ctx.save();
		ctx.translate(l(x),l(y));
		ctx.beginPath();
		ctx.arc(0,0,sr,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
// 计时
		var v=1800;
		var vb=60;
		var vh=60;
		var tm;
	function time(){
		v=Math.floor(v);
		var s=v%60;
		s=(s<10)?("0"+s):s;
		var m=v/60;
		m=Math.floor(m);
		m=(m<10)?("0"+m):m;
		v--;		
		$("#time").html(m+":"+s);

	}
	function timeb(){
		vb=Math.floor(vb);
		var s=vb%60;
		s=(s<10)?("0"+s):s;
		var m=vb/60;
		m=Math.floor(m);
		m=(m<10)?("0"+m):m;
		vb--;		
		$("#wtime").html(m+":"+s);
	}
	function timeh(){
		vh=Math.floor(vh);
		var s=vh%60;
		s=(s<10)?("0"+s):s;
		var m=vh/60;
		m=Math.floor(m);
		m=(m<10)?("0"+m):m;
		vh--;		
		$("#htime").html(m+":"+s);
	}
// 画棋盘
	function drawqipan(){
		ctx.save();
		ctx.strokeStyle="#605e63";
		ctx.beginPath();
		for (var i = 0; i <15; i++) {
			ctx.moveTo(l(0),l(i));
			ctx.lineTo(l(14),l(i));
			ctx.moveTo(l(i),l(0));
			ctx.lineTo(l(i),l(14));
		};
		
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
		circle(3,3);
		circle(3,11);
		circle(11,3);
		circle(11,11);
		circle(7,7);
	}
	drawqipan();
// 画子
	function drawzi(x,y,color){
		ctx.save();
		ctx.translate(l(x),l(y));
		ctx.beginPath();
		ctx.arc(0,0,br,0,Math.PI*2);
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 3;
		ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
		if (color=="black") {
			var b=ctx.createRadialGradient(-10,-10,0,0,0,50);
			b.addColorStop(0,'#fff');
			b.addColorStop(0.1,'#000');
			b.addColorStop(1,'#000');
			ctx.fillStyle=b;
		}else{
			var b=ctx.createRadialGradient(-15,-15,0,0,0,50);
			b.addColorStop(0,'#fff');
			b.addColorStop(0.1,'#eee');
			b.addColorStop(1,'#333');
			ctx.fillStyle=b;
		}
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		zi[x+"_"+y]=color;
	}
// 判断当前点击的是否有落子
	// function(x,y){
	// 	return
	// }
// 落子
	var t;
	var t1;
	$(canvas).on("click",function(e){
		var x=Math.floor(e.offsetX/sep);
		var y=Math.floor(e.offsetY/sep);
		if (zi[x+"_"+y]) {
			return;
		}
		if (kaiguan) {
			drawzi(x,y,'black');
			 t=setInterval(timeb,1000);
			 // t=setInterval(render,1000);
			 // clearInterval(t1);
			 // sb1=0;
			 // miaozhen1();
			 vb=60;
			 timeb();
			 clearInterval(t1);
			
			
		}else{
			drawzi(x,y,'white');
			// t1=setInterval(render1,1000);
			// clearInterval(t);
			// sb=0;
			// miaozhen();
			t1=setInterval(timeh,1000);
			vh=60;
			timeh();
			clearInterval(t);
			
			
		}		
		kaiguan=!kaiguan;
		audio.play();
	})
// 秒表图
// var canvas1=$('#white-biao').get(0);
// var ctx1=canvas1.getContext("2d");
// var canvas2=$('#black-biao').get(0);
// var ctx2=canvas2.getContext("2d");
// var sb=0;
// 画针
// function miaozhen(){
// 		ctx1.clearRect(0,0,188,190);
//  		ctx1.save();
//  		ctx1.translate(94,95);
//  		ctx1.rotate(Math.PI/180*6*sb);
// 		ctx1.beginPath();
// 		ctx1.arc(0,0,10,0,Math.PI*2);
// 		ctx1.moveTo(0,10);
// 		ctx1.lineTo(0,30);
// 		ctx1.moveTo(0,-10);
// 		ctx1.lineTo(0,-70);
// 		ctx1.closePath();
// 		ctx1.stroke();
// 		ctx1.restore();
// 		sb++;
// 		console.log(sb);
//  	}
//  	var sb1=0;
// function miaozhen1(){
// 		ctx2.clearRect(0,0,188,190);
//  		ctx2.save();
//  		ctx2.translate(94,95);
//  		ctx2.rotate(Math.PI/180*6*sb1);
// 		ctx2.beginPath();
// 		ctx2.arc(0,0,10,0,Math.PI*2);
// 		ctx2.moveTo(0,10);
// 		ctx2.lineTo(0,30);
// 		ctx2.moveTo(0,-10);
// 		ctx2.lineTo(0,-70);
// 		ctx2.closePath();
// 		ctx2.stroke();
// 		ctx2.restore();
// 		sb1++;
//  	}
 	// function render(){
 	// 	miaozhen();
 	// }
 	// function render1(){
 	// 	miaozhen1();
 	// }
 	// render();
 	// render1();

// 点击进入页面
 $("#jinru").on("click",function(){
 	$("#dbg").css("display","none");
 })
// 字体变大
$("#dianji.dj").hover(function(){
	var index=$(this).index();
	$(".dj").eq(index).css("font-size","26px");
},function(){
	$(".dj").css("font-size","20px")
})
// 左侧点击事件
	$("#dianji .dj:nth-of-type(1)").on("click",function(){
			$("#xuanguan").css("display","block");
			$("#change").removeClass().addClass("active");	

	})
	$("#dianji .dj:nth-of-type(2)").on("click",function(){
		$("#time").css("display","block")	
		tm=setInterval(time,1000);

	})
	$("#dianji .dj:nth-of-type(3)").on("click",function(){
	 	clearInterval(tm);			 
	})
	$("#change .dj").on("click",function(){
		$("#xuanguan").css("display","none");
		$("#change").removeClass().addClass("active1");	
	})
//设置页面
	$("#shezhi").on("click",function(){
		$("#sz-main").css("display","block");
		$("#main").css("display","block");
		$(".op").css("display","block");
	}) 
	$("#sz-main").on("click",function(){
		$("#sz-main").css("display","none");
		$("#main").css("display","none");
		$(".op").css("display","none");
	})
})