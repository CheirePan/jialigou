/*--------------------商品详情页----------------------------*/

//导航     全部商品下的菜单显示/隐藏
$(".titH2").css("cursor", "pointer").click(function() {
	$(".ul_list").slideToggle("slow");
});

var url = location.search; //获取url中"?"符后的字串     //?001
var id = url.substring(1); //001


//cookie

//我先判断一下是否有这个cookie
var init=$.cookie("init");
//如果有的话
if($.cookie("init"))
{
	//我就把这个cookie转换成一个对象存到obj里面---json.parse转化成对象
	obj = JSON.parse($.cookie("init"))			
}
else
{
	//如果没有的话要就把obj设置成一个空的对象，这里一定要写成一个空的对象要不然下面就没办法存进去了-----下面说这个----
	var obj ={};
}

//---------------json------------------------------------
var html = "";
$.ajax({
	type: "get",
	dataType: "json",
	url: "../other/items.json",
	success: function(data) {
		for(var i = 0; i < data.length; i++) {
			if(data[i].id == id) {
				var str = "";
				for(var j = 0; j < data[i].src.length; j++) {
					str += "<span><img src=\"../img/other/" + data[i].src[j] + "\" /></span>";
				}
				$(".ztit").append("<span>" + data[i].name + "</span>");
				html += "<div class=\"con_l left\"><div id=\"box\"><img id=\"mid_img\" src=\"../img/other/" + data[i].src[0] + "\" alt=\"mid\" />";
				html += "<div id=\"mark\"></div><div id=\"opa\"></div></div>";
				html += "<div id=\"big\"><img id=\"bigimg\" src=\"../img/other/" + data[i].src[0] + " \" alt=\"big\"/></div>";
				html += "<div class=\"pic_small\" id=\"small\">" + str + "</div>";
				html += "<div class=\"share clear\"><span>分享到：</span><img src=\"../img/other/share.jpg\" /></div></div>";
				html += "<div class=\"con_r right\"><ul class=\"goods_news clear\"><li class=\"gn_1 left\">" + data[i].name + "</li><li class=\"gn_2 right\">(供货号：<i>" + data[i].num + "</i>)</li></ul>"
				html += "<div class=\"gd_d\"><div class=\"gd_d_1\"><span class=\"w130\">嘉丽价</span><span class=\"gs_price\">¥" + data[i].price + ".00</span></div>";
				html += "<div class=\"gd_d_2\"><span class=\"w130\">积分</span><span>订购此商品可返回<i>" + data[i].jifen + "*2</i>积分</span></div></div>";
				html += "<div class=\"gd_d2 clear\"><span class=\"w130 left\">尺寸</span><div class=\"gd_d2_div left\"><span>" + data[i].proName + "</span>";
				html += "<ul class=\"ulsize\"><li class=\"red\">"+data[i].size[0]+"</li><li>"+data[i].size[1]+"</li><li>"+data[i].size[2]+"</li><li>"+data[i].size[3]+"</li></ul></div></div>";
				html += "<div class=\"gd_num\"><span>数量</span><i><em id='dec'>-</em><input id='count_txt' type=\"text\" value=\"1\" /><em id='add'>+</em> 件</i></div>";
				html += "<div class=\"as\"><i class=\"buy\">立即购买</i><i class=\"cart\">加入购物车</i><i class=\"like\">收藏</i></div></div>";
				$("#con").html(html);
			}
		}
		
//------------------------------放大镜(js)------------------------------------				
		var box = document.getElementById("box");
		var mark = document.getElementById("mark");
		var opa = document.getElementById("opa");
		var big = document.getElementById("big");
		var bigImg = document.getElementById("bigimg");		
		opa.addEventListener("mouseover", fn1, false);
		opa.addEventListener("mouseout", fn3, false);		
		function fn1() {
			mark.style.display = "block";
			big.style.display = "block";
			opa.addEventListener("mousemove", fn2, false);
		}		
		function fn2(e) {
			e = e || window.event;
			var mLeft = e.offsetX - mark.offsetWidth / 2;
			var mTop = e.offsetY - mark.offsetHeight / 2;
			mLeft = Math.max(0, Math.min(mLeft, opa.offsetWidth - mark.offsetWidth));
			mTop = Math.max(0, Math.min(mTop, opa.offsetHeight - mark.offsetHeight));
			mark.style.left = mLeft + "px";
			mark.style.top = mTop + "px";		
			var percentX = mLeft / (opa.offsetWidth - mark.offsetWidth);
			var percentY = mTop / (opa.offsetHeight - mark.offsetHeight);		
			bigImg.style.left = -percentX * (bigImg.offsetWidth - big.offsetWidth) + "px";
			bigImg.style.top = -percentY * (bigImg.offsetHeight - big.offsetHeight) + "px";
		}		
		function fn3() {
			mark.style.display = "none";
			big.style.display = "none";
		}
		
//---------------------------图片切换(选项卡)---------------------------------------------
		var small = document.getElementById('small');
		var small_img = small.getElementsByTagName('img');
		var mid_img = document.getElementById("mid_img");
		var bigimg = document.getElementById('bigimg');
		for(var i = 0; i < small_img.length; i++) {
			small_img[i].onclick = function() {
				mid_img.src = this.src;
				bigimg.src = this.src;
			}
		}
//------------------------------------------------------------------------------------		
		//尺码
		var sizeValue="";
		var sizeli=$(".ulsize li");
		for(var k=0;k<sizeli.length;k++)
		{
			sizeli[k].onclick=function(){
				for(n=0;n<sizeli.length;n++){
					sizeli[n].className="";
				}
				this.className="red";
			}
		}
		
		//商品数量
		var n=1;
		$("#dec").click(function(){
			if(n>1){
				n--;
			}
			$("#count_txt").val(n);
		})
		$("#add").click(function(){
			n++;
			$("#count_txt").val(n);
		})
		
		
		//获取cookie的 val 当进入页面时加载购物车数量
		var sum=0;		
		$.each(obj, function(index, val) {
			sum+=val;
		});
		$(".num").html(sum);	
		//console.log(sum);
		
		//点击购物车事件
		var timer=null;		
		$(".cart").click(function(){
			//location.reload();//重新加载页面
			var num=0;
			//var dot=0;//点击一下
			//console.log(sizeValue=$(".red").html());
			$(".dis").css("display","block");
			clearTimeout(timer);
			timer=setTimeout(function(){
				$(".dis").css("display","none");
			},1500);			
			num++;	
			//dot++;					
			//先获取商品的id
			// 如果这个cookie是undefined的话------如果是空的话就是undefined
			if(init==undefined)
			{
				//我让这个商品点击的次数等于num------对象一个key值一个value值obj[id]就是获取的value值------上面呼应下如果obj不设置成空对象的话是存不进去obj里面去的				
				obj[id]=num*n;
				//因为obj是一个对象所以我们要把他转换成字符串
				var objTostr = JSON.stringify(obj);
				//存入cookie中
				$.cookie("init",objTostr,{expires:7,path:"/"});
				//$(".num").html(num*n);
				$(".num").html(sum+num*n);
			}
			else{
				//init不是undefined的话那么就是有这个cookie
				//如果一个对象里面没有值得话那么就是unfined。var出对象的值如果有一个unfined和一个数值的话会获取数值  举例var a=unfined||0; a 输出的结果是0				
				var num1 = obj[id]||0;
				//然后我让obj[id]的值等于 num1+sum的值-----也就是说当我们第一个进入页面点击的次数加上第二次进入页面点击的次数				
				obj[id] = num1+num*n;				
				//然后我们在讲obj（对象转换成字符串）然后存入cookie
				var objTostr = JSON.stringify(obj);
				$.cookie("init",objTostr,{expires:7,path:"/"});
				//$(".num").html(obj[id]);
				$(".num").html(sum+num*n);
			}
			//重新加载cookie val，以便再次点击此加入购物车时，数量变化
			count();			
		});
		
		//弹出框按钮
		$(".dis i").click(function(){
			$(".dis").css("display","none");
		});
	}
});













