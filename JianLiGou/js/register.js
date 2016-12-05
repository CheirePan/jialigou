//X按钮
$("#userName").keydown(function(event) {
	$("#i_close1").css("display","block");
	$("#i_close1").click(function(){
		$("#userName").val('');
		$("#ds1").css("display","none");
	})

});
$("#password").keydown(function(event) {
	$("#i_close2").css("display","block");
	$("#i_close2").click(function(){
		$("#password").val('');
		$("#ds2").css("display","none");
	})

});
$("#repassword").keydown(function(event) {
	$("#i_close3").css("display","block");
	$("#i_close3").click(function(){
		$("#repassword").val('');
		$("#ds3").css("display","none");
	})

});

$("#yanma").keydown(function(event) {
	$("#i_close3").css("display","block");
	$("#i_close3").click(function(){
		$("#yanma").val('');
		$("#ds3").css("display","none");
	})

});



//注册验证
var tel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
var pword = /^\w{6,18}$/;			//8-12位字符

$("#re_login").click(function(){    
	if(tel.test($("#userName").val())&&pword.test($("#password").val())&&$("#password").val()==$("#repassword").val()){
		$(".display_no").css("display","none"); 		
		var uName=$("#userName").val();
		var uPassword=$("#password").val();
	    var url="../../User/CheckUserNameGet";
	    $.ajax(url,{
	        data:{
	            username:uName,
	        },
	        success:function(data){
	            if(data==1){
	                alert("该用户名已经被注册了");
	                $(".login_input input").val("");
	                $(".i_close").css("display","none"); 
	            }else{
					var url="../../User/registerGet";
					$.ajax(url,{
						data:{
							name:uName,
							password:uPassword
						},
						success:function(data){
							alert("恭喜您注册成功");
							window.location.href="login.html";
							//window.location.href="../index.html?name="+uName;
						}
					});
	            }
	        }
	    });
	}
	else{
		if(tel.test($("#userName").val()))
		{
			$("#ds1").css("display","none");
			if(pword.test($("#password").val()))
			{
				$("#ds2").css("display","none");
				if($("#password").val()==$("#repassword").val()){						
					$("#ds3").css("display","none");
				}
				else{
					$("#ds3").css("display","block");
					$("#ds3").html("密码不一致");
				}
			}
			else{
				
				$("#ds2").css("display","block");
				$("#ds2").html("请填写6-18位字符");	
			}
			
		}
		else{
			$("#ds1").css("display","block");
		}						
	}		        
});




//随机产生验证码
yan();
$("#yan").click(function(){
	yan();
})

function yan(){
	//可直接用字符串拼接，，也可以使用数组，，push 方法    最后再转成字符串	
	var str="";
	for(var i=0;i<4;i++)
	{						// 随机出来 0,1,2,3,4,5,6,7,8,9    %2  则为   0 , 1  
		var isNum=parseInt(Math.random()*10)%2;   // 随机出来    0,1,0,0,0,1,1,0,1.......   
		if(isNum){    //假设随机出来的是 isNum==1   为数字     0 则为字母 
			str+=(parseInt(Math.random()*10));
		}
		else{
			var isA=parseInt(Math.random()*10)%2;  //   同上来作是大写还是小写的判断条件
			if(isA)
			{				
				str+=(String.fromCharCode(parseInt(Math.random()*26) + 65));
			}
			else{				
				str+=(String.fromCharCode(parseInt(Math.random()*26) + 97));
			}			
		}
	}	
	$("#yan").html(str);
}


//登录验证
$("#login").on("click",function(){
 	if(tel.test($("#userName").val())&&pword.test($("#password").val())&&$("#yanma").val()==$("#yan").html())
	{
		$(".display_no").css("display","none");
	    var uName=$("#userName").val();
		var uPassword=$("#password").val();
	    var url="../../User/loginGet";   
	    $.ajax(url,{
	        data:{
	            name:uName,
	            password:uPassword
	        },
	        success:function(data){
	        	if(data==1){
	        		alert("成功登录");
	        		var UNAME = $.cookie("UNAME");
			        if($.cookie("UNAME")){
						obj = JSON.parse($.cookie("UNAME"))
					}else{
						var obj ={
							uName
						}
					}
					if(UNAME==undefined)
					{
						var objTostr = JSON.stringify(obj);
						console.log(objTostr)
						$.cookie("UNAME",objTostr,{expires:7,path:"/"});
					}
					else{
						var objTostr = JSON.stringify(obj);
						console.log(objTostr)
						 $.cookie("UNAME",objTostr,{expires:7,path:"/"});
					}	        		
                  	window.location.href="../index.html";
	        	}
	        	else{
	        		alert("用户名或密码有误");
	        	}
	        }
	    });
	}
	else{
		if(tel.test($("#userName").val()))
		{
			$("#ds1").css("display","none");
			if(pword.test($("#password").val()))
			{
				$("#ds2").css("display","none");
				if($("#yanma").val()==$("#yan").html()){						
					$("#ds3").css("display","none");
				}
				else{
					$("#ds3").css("display","block");
					$("#ds3").html("验证码不一致");
				}
			}
			else{
				
				$("#ds2").css("display","block");
				$("#ds2").html("请填写6-18位字符");	
			}
			
		}
		else{
			$("#ds1").css("display","block");
		}						
	}		        
});

