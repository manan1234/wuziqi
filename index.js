$(function(){
	var canvas=$('#canvas').get(0);
	var ctx=canvas.getContext("2d");
	var sep=40;
	var sr=3;
	var br=18;
	var kaiguan=true;
	var qizi={};
	var audio=$("audio").get(0);
	var AI=false;
	var gamestate="pause";
	var kongbai={};
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
// 判断输赢
	function lj(a,b){
		return a+"_"+b;
	}
	function panduan(x,y,color) {
		var row=1;
		var line=1;
		var zX=1;
		var yX=1;
		var i;
		i=1 ; while ( qizi[lj(x+i,y)] === color ) { row++ ; i++ ; }
		i=1 ; while ( qizi[lj(x-i,y)] === color ) { row++ ; i++ ; }

		i=1 ; while ( qizi[lj(x,y-i)] === color ) { line++ ; i++ ; }
		i=1 ; while ( qizi[lj(x,y+i)] === color ) { line++ ; i++ ; }

		i=1 ; while ( qizi[lj(x+i,y+i)] === color ) { zX++ ; i++ ; }
		i=1 ; while ( qizi[lj(x-i,y-i)] === color ) { zX++ ; i++ ; }

		i=1 ; while ( qizi[lj(x+i,y-i)] === color ) { yX++ ; i++ ; }
		i=1 ; while ( qizi[lj(x-i,y+i)] === color ) { yX++ ; i++ ; }
		return Math.max(row,line,zX,yX);
	}
	function intel(){
		var max=-Infinity;
		var max2=-Infinity;
		var pos={};
		var pos2={}
		for (var k in kongbai) {
			var x=parseInt(k.split("_")[0]);
			var y=parseInt(k.split("_")[1]);
			var q=panduan(x,y,"black");
			if (q>max) {
				max=q;
				pos={x:x,y:y};
			}
		}
		for (var k in kongbai) {
			var x=parseInt(k.split("_")[0]);
			var y=parseInt(k.split("_")[1]);
			var q=panduan(x,y,"white");
			if (q>max2) {
				max2=q;
				pos2={x:x,y:y};
			}
		}
		if (max>max2) {
			return pos;
		}else{
			return pos2;
		}
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
		for (var i = 0; i <15; i++) {
			for (var j = 0; j <15; j++) {
				kongbai[lj(i,j)]=true;
			}
		}
	}
	drawqipan();
// 画子

	function drawzi(x,y,color){
		gamestate="play";
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
		qizi[x+"_"+y]=color;
		delete kongbai[lj(x,y)]
		gamestate="play";
	}

// 生成棋谱
 function chessManual(){
 	ctx.save();
 	ctx.font = "20px serif";
	var i=1;
	ctx.textAlign="center";
	ctx.textBaseline="middle";
	for (var k in qizi) {
		if (qizi[k]=="black") {
		ctx.fillStyle="#fff";
		}else{
			ctx.fillStyle="black";
		}
		var arr=k.split("_");
		ctx.fillText(i++,l(parseInt(arr[0])),l(parseInt(arr[1])));
	}	
	ctx.restore();
	if ($(".box").find("img").length) {
		$(".box").find("img").attr("src",canvas.toDataURL());
	}else{
		$("<img>").attr("src",canvas.toDataURL()).appendTo(".box");
	}
	if ($(".box").find("a").length) {
		$(".box").find("a").attr("href",canvas.toDataURL());
	}else{
		$("<a>").attr("href",canvas.toDataURL()).attr("download","qipu.png").appendTo(".box")
	}
	
 }
// 落子
	var t;
	var t1;	
	function luozi(e){
		var x=Math.floor(e.offsetX/sep);
		var y=Math.floor(e.offsetY/sep);
		if (qizi[x+"_"+y]) {
			return;
		}
		if (AI) {
			drawzi(x,y,'black');
			if (panduan(x,y,"black")>=5) {
		     	$("#always").css("display","block");
		     	$("#win").css("display","block");
		     	$("#yin").css("display","block");
		     	$("#lose").css("display","block");
		     	$("#canvas").off("click");
				$("#ad").get(0).pause();

		     }
			var p=intel();
			drawzi(p.x,p.y,"white");
			if (panduan(p.x,p.y,"white")>=5) {
		     	$("#always").css("display","block");
		     	$("#win").css("display","block");
		     	$("#shu").css("display","block");
		     	$("#lose").css("display","block");
		     	$("#canvas").off("click");
		     	$("#ad").get(0).pause();
		     };
			return false;
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
		     if (panduan(x,y,"black")>=5) {
		     	$("#always").css("display","block");
		     	$("#win").css("display","block");
		     	$("#yin").css("display","block");
		     	$("#lose").css("display","block");
		     	$("#canvas").off("click");
		     	$("#ad").get(0).pause();
		     }
			
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
			if (panduan(x,y,"white")>=5) {
		     	$("#always").css("display","block");
		     	$("#win").css("display","block");
		     	$("#shu").css("display","block");
		     	$("#lose").css("display","block");
		     	$("#canvas").off("click");
		     	$("#ad").get(0).pause();
		     };
		}		
		kaiguan=!kaiguan;
		audio.play();
		
	}
	$(canvas).on("click",luozi)
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
 	$("#ad").get(0).play();
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
	var ts=0;
	$("#dianji .dj:nth-of-type(2)").on("click",function(){
		$("#time").css("display","block")	;
		if(ts%2==0){
			tm=setInterval(time,1000);
			$("#dianji .dj:nth-of-type(2)").html("暂停游戏")
		}else{
			clearInterval(tm);
			$("#dianji .dj:nth-of-type(2)").html("开始游戏")

		}
		ts++;

	})
	$("#dianji .dj:nth-of-type(3)").on("click",function(){
	 	chessManual();
	 	$(".box").show();			 
	})
	$("#dianji .dj:nth-of-type(4)").on("click",again);
	$("#change .dj").on("click",function(){
		$("#xuanguan").css("display","none");
		$("#change").removeClass().addClass("active1");	
	})
	$("#dianji .dj:nth-of-type(5)").on("click",function(){
	 	$("#dbg").css("display","block");
	 	$("#ad").get(0).pause();		 
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
// 再来一局
function again(){
	$("#always").css("display","none");
	$("#win").css("display","none");
	$("#shu").css("display","none");
	$("#yin").css("display","none");
	$("#lose").css("display","none");
	ctx.clearRect(0,0,600,600);
	drawqipan();
	kaiguan=true;
	gamestate="pause";
	qizi={};
	$(canvas).off('click').on('click',luozi);
	$("#ad").get(0).play();
}
$("#lose").on("click",again);

//生成棋谱
$("#scqp").on("click",function(){
	chessManual();
	$(".box").show();	
}) 
// 点击叉号关闭棋谱
$("#fork").on("click",function(){
	$(".box").hide();
	ctx.clearRect(0,0,600,600);
	drawqipan();
	for(var i in qizi){
		var arr=i.split("_");
		drawzi(parseInt(arr[0]),parseInt(arr[1]),qizi[i]);
	}
})
// AI
$("#change .dj:nth-of-type(1)").on("click",function(){
	if (gamestate==="play") {
		return;
	}
	else{
		AI=true;
	}
	console.log(gamestate);
})
$("#change .dj:nth-of-type(2)").on("click",function(){
	if (gamestate==="play") {
		return;
	}
	else{
		AI=false;
	}
	console.log(gamestate);
})
	

})