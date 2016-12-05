
var str="";
var sumValue=0;
$.ajax({
	url: "../other/items.json",
	type: "GET"
}).done(function(data) {
	//先获取网页中的cookie转化成对象-----json.parse将字符串转化为对象
	var cookieObj = JSON.parse($.cookie("init"));
	//console.log(cookieObj);
	//循环data数据------i表示data对象是索引，v是value
	
	
	$.each(data, function(i,v) {
		//console.log(i,v)
		//循环cookie对象index 是第几个对象  val是值
		$.each(cookieObj, function(index, val) {
			if(index==data[i].id)
			{
				str+="<ul class=\"two_ul ult\" id="+index+">";
				str+="<li style=\"width:262px;\" class=\"fir_1\">";
					str+="<input type=\"checkbox\" checked='checked' />";
					str+="<img src=\"../img/other/"+data[i].src[0]+"\" /></li>";
				str+="<li style=\"width:310px;\" class=\"two_li\">";
					str+="<span><a href=\"##\">"+data[i].name+"</a>货号："+data[i].num+"</span>";
					str+="<span>颜色/尺码：</span>";
					str+="<span>"+data[i].proName+"M码</span></li>";
				str+="<li style=\"width:152px;\" class=\"Price\">¥"+data[i].price+"</li>";
				str+="<li style=\"width:152px;\" class=\"four_li\">";
					str+="<span class=\"decs\">-</span>"
					str+="<input type=\"text\" value="+val+" class=\"Pvalue\" />";
					str+="<span class=\"plus\">+</span></li>";
				str+="<li style=\"width:157px; font-weight: 900;\">¥<em class=\"sumMon\">"+val*data[i].price+"</em></li>";
				str+="<li style=\"width:155px;\" class=\"six_li\">";
					str+="<a href=\"##\">加入收藏夹</a><br><button class=\"del\">删除</button></li></ul>";
					
					
					
				sumValue+=val;
			}
		});
	});
	//console.log(cookieObj)
	//console.log(sumValue);
	$(".two_ul").html(str);
	
	//总价
	Total();	
	//-----------------------------------------------全选功能--------------------------
	//当我点击全选按钮的时候
	$('.checked').click(function(event){
		//我先判断下他的prop是不是true如果是------prop是设置checkbox是否为checked
		if($('.checked').prop('checked')==true)
		{
			//如果是的话我就循环所有的checkbox让他们的checked为true
			$.each($('.ult input[type=checkbox] '), function(index, val) {
				$('.ult input[type=checkbox] ').prop('checked',true);
				 
			});
			//并且计算总价Total是总价的函数
			Total();			
		}
		else
		{	//如果不是true的话我就循环所有的checkbox让他们的checked为false
			$.each($('.ult input:checkbox '), function(index, val) {
			 $('.ult input:checkbox ').prop('checked',false);
			});
			//并计算价格，其实我感觉不用计算价格反正都是0
			Total();
			//然后将总价的html为0
			$('.moneyCount').html("0");
			$(".jifen").html("0");
		}
		
	});
	
	//---------------------------------------总价------------------------------------------
	//计算总价
	function Total()
	{
		var Tot=0;	
		//循环所有的checkbox---------延伸：可以这样写：$('.ult input:checkbox')也可以这样写$('.ult input[type=checkbox]')，这里为啥要要用第一种呢？下面你就知道了应为要获取length
		$.each($('.ult input:checkbox '),function(i){
			//console.log(i);
			//如果第I个checkbox为true的话：也就是选中状态的时候
			if($('.ult input:checkbox ').eq(i).prop('checked')==true)
			{
				//我就获取class为.sumMon的html其实就是价格然后赋值给Tot
				Tot+=Number($('.ult .sumMon').eq(i).html());
				//然后将总价的HTML为tot
				$('.moneyCount').html(Tot);				
				$(".jifen").html(Tot);				
			}
		})
	}	
	
	
	//-------------------------------------删除-------------------------------------------
	//循环所有的删除按钮
	$.each($('.del'), function(index, val) {
		//当点击当前的那个删除按钮的时候
		$(this).click(function(event) {
			//我就remove掉他的父级
			$(this).parent().parent().remove();
			//在删除cookie
			//先获取它父级的id其实就是商品的Id
			var a=$(this).parent().parent().attr("id");
			//然后我们将cookie设置成负值这样就把cookie删除掉了，然后子啊remove掉父级
			delete cookieObj[a];
			$.cookie("init",JSON.stringify(cookieObj),{path:'/'})

			//console.log(cookieObj)
			//$.cookie(a,' ',{expires: -1,path:'/'});
			//删除以后再计算下价格
			Total();
		});
	});	
	//-------------------------------------小计价格--------------------------
	//计算小计的价格
	function Subtotal(index)
	{
		//获取第i个商品的数量
		var a=$('.Pvalue').eq(index).val();
		//在获取第I个商品的单价------扩展replace(/\D/g,'')只获取数字
		var b=$('.Price').eq(index).html().replace(/\D/g,'')
		c=a*b;
		//console.log(c)
		//将小计的总价放到.sumMon的html中去
		$('.sumMon').eq(index).html(c);
		console.log(a)
		
	}
	//------------------------------------加减商品-------------------------
	//循环所有减号的按钮
	$.each($('.decs'), function(index, val) {
		//声明一个变量a=0
		var a=0;
		//当我点击当前减号的时候
		$(this).click(function(event) {
			//我先获取.Pvalue里面的val
			a=Number($('.Pvalue').eq(index).val());
			//如果a=1的话我就让他的val还是1------------总不能让他是负值吧？
			if(a==1)
			{
				$('.Pvalue').eq(index).val('1');
			}
			else
			{
				//如果不是1的话我就让他--直到是1为止
				a--	;
			}
			var a1=$(this).parent().parent().attr("id");
			cookieObj[a1]=a;
			$.cookie("init",JSON.stringify(cookieObj),{path:'/'})

			//然后我在让.Pvalue的val是a
			$('.Pvalue').eq(index).val(a);
			//计算下小计----小计里面记得传值哦其实就是索引  然后在计算总价
			Subtotal(index);
			Total();
		});
	});
	//------------------------------点击加号-----------------------------------
	//			循环所有加号
	$.each($('.plus'), function(index, val) {
		//声明变量a=0
		var a=0;
		//当点击当前加号的时候
		$(this).click(function(event) {
			//我先获取.Pvalue里面的val
			a=Number($('.Pvalue').eq(index).val())
				a++;
			var a1=$(this).parent().parent().attr("id")
			cookieObj[a1]=a;
			$.cookie("init",JSON.stringify(cookieObj),{path:'/'})

			//.Pvalue里面的val就等于a
			$('.Pvalue').eq(index).val(a);
			//计算小计  然后计算总价
			Subtotal(index);
			Total();
		});
	});	
	//---------------------------点击每一个checkbox---------------------------
		//循环所有.ult下面的checkbox当我点击的时候如果他的checked的length等于0的话我就让总价的金额为0，其实就是说如果都没有勾选的话那么总价就是0了，只有勾选的才会计算价格
	$.each($('.ult input:checkbox '), function(index, val) {
		//点击当前的checkbox的时候
		$(this).click(function(event) {
			//计算下总价
			Total()
			if($('.ult input:checkbox:checked ').length==0)
			{
				$('.moneyCount').html('0');
			}
		});
	});
		
	//----------------------判断全选按钮------------------------------------------
	//循环所有.ult下面的checkbox
	$('#two_ul .ult input:checkbox ').each(function(){
			//当我点击当前的checkbox
			$(this).click(function(){
				//如果选中input的length与当前checkbox的lengt相等的话我就让全选按钮的勾选框为选中状态否则的话就为不选中状态
				if($('#two_ul .ult input:checkbox:checked ').length==$('#two_ul .ult input:checkbox ').length){
					$('#f1 .checked[type=checkbox] ').prop('checked',true)
				}else{
					$('#f1 .checked[type=checkbox] ').prop('checked',false)
				}
			})
			
	})
});




		
	


