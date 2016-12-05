//获取cookie

var UNAME =$.cookie("UNAME");
if(UNAME==undefined){
	
}
else{

	var cookieObj1 = JSON.parse($.cookie("UNAME"));
	//console.log(cookieObj.uName);
	
	$(".no_login").css("display","none");
	
	$(".had_login").css("display","block");
	$("#we").html("<span>Hi,"+cookieObj1.uName+"</span> 欢迎回嘉!");
	$("#we").hover(function(){
		$("#we").css({"color":"#444444","text-decoration":"none"});
	});
	//退出
	$("#exist_text").click(function(){
		$.cookie("UNAME","",{path:'/'});
	});	
}
//购物车的商品总数量	
function count(){
	var init =$.cookie("init");
	if(init==undefined){
		
	}
	else{
		var sum=0;
		var cookieObj = JSON.parse($.cookie("init"));
		$.each(cookieObj, function(index, val) {
			sum+=val;
		});
		//console.log(cookieObj)
		$(".num").html(sum);
	}
}


//搜索
var oTxt = document.getElementById('txt');
oTxt.onkeyup = function() {
	var val = this.value;
	var oScript = document.createElement('script');
	
	oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + val + "&cb=hhl"
	document.body.appendChild(oScript);
	document.body.removeChild(oScript);
}
				

function hhl(data) {
	var oList = document.getElementById('list');
	var html = ''
	if (data.s.length > 0) {
		for (var i = 0; i < data.s.length; i++) {
			html += '<li><a href=\"https://www.baidu.com/s?wd=' + data.s[i] + '\" target=\"_blank\">' + data.s[i] + '</a></li>'
		}
		oList.style.display = 'block';
		oList.innerHTML = html;
	
	}else{
		oList.style.display = 'none';
	}
}