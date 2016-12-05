

/*-------------------商品列表页--------------------------*/


//左侧导航列
$(".j-wrapper").each(function(){			
	$(this).click(function(){
		$(this).find("ul").toggle();
		$(this).siblings().find("ul").hide();
		
	});
})





//商品列表

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
	
var num=0;
$.ajax({
	type:"get",
	dataType:"json",
	url:"../other/items.json",
	success:function(data){		
		//加载购物车数量
		count();				
		var pageLength = 16;//定义每页数据的个数
		var total = data.length;//所有的数据个数
		//console.log(total)   //26
		$(".jilu i").html(total);
		var pageNum = Math.ceil(total/pageLength);//获得页数
		//console.log(pageNum)  //2
		$(".jilu strong").html(pageNum);

		//显示某页数据的函数
		function createPage(n){
			var html="";
			for(var m=n*pageLength;m<Math.min(total,(n+1)*pageLength);m++){
				html+="<li><a href=\"goodsDetail.html?"+data[m].id+" \" target='_black' id=\"aUrl\"><img src=../img/other/"+data[m].src[0]+" /></a>";
				html+="<p><a href=\"##\" id=\"aUrl\">"+data[m].name+"</a></P><span>¥"+data[m].price+".00</span><i>"+data[m].count+"</i>";
				html+="<div class=\"clear\"></div><div class=\"cl\"><a class=\"cart\" href=\"goodsDetail.html?"+data[m].id+" \" target='_black' id=\"aUrl\">加入购物车</a><a class=\"like\" href=\"##\">收藏</a></div></li>";
			}
			$("#goodsUl").html(html);
			//收藏商品
			$.each($(".like"),function(m){
				$(".like").eq(m).click(function(){
					alert("该商品收藏成功");
				});
			});
			
		}
		
		
		createPage(0);  //0 1
		
		//通过页面的个数pageNum来创建按钮
		for(var i=0;i<pageNum;i++){  //0 1
			var a = "<a class='page' href='###'>"+(i+1)+"</a>"
			$(".fenye").append(a);
		}
		
		//点击1 2切换页面
		var n = 1;
		$(".page").each(function(){//不能用a 因为a包括了上一页和下一页
			$(this).click(function(){
				createPage($(this).html()-1)//点击1执行createPage(0)
				n= $(this).html();
				$(".jilu b").html(n);
				console.log(n)
			})			
		});
		
		//上一页
		$(".before").click(function(){
		 	if(n==1){
		 		createPage(n-1);	 		
		 		$(".before").css("display","none");
		 		$(".next").css("display","inline-block");
		 		$(".jilu b").html("1");
		 	}else{		 		
		 		createPage(n-1);
		 		$(".jilu b").html(n-1);
		 		n--;
		 	}
		});
		
		//下一页
		$(".next").click(function(){
		 	if(n==pageNum-1){
		 		createPage(n);
		 		$(".next").css("display","none");
		 		$(".before").css("display","inline-block");
		 		$(".jilu b").html(pageNum);
		 	}else{
		 		createPage(n)		 		
		 		n++;
		 		$(".jilu b").html(n);		 		
		 	}
		});
		
		
	}
});

