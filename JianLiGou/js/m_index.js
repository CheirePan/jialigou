
//加载购物车数量
count();

//二级菜单
var categoryList=document.getElementsByClassName("categoryList");
var children_menu=document.getElementsByClassName("children_menu");

for(var i=0;i<categoryList.length;i++)
{
    categoryList[i].index=i;
    categoryList[i].onmouseover=function(){
        for(var j=0;j<children_menu.length;j++)
        {
            children_menu[j].style.display="none";
        }
        children_menu[this.index].style.display="block";
    }

    categoryList[i].onmouseout=function(){
        for(var j=0;j<children_menu.length;j++) {
            children_menu[j].style.display = "none";
        }
    }
}



//轮播图
var current_img,img_length,time,color = "green";

time = setTimeout(img_auto,3000);

$(".j-slider").children().each(function(){

    $(this).mouseover(function(){

        clearTimeout(time);

        var index = $(this).index();

        $(this).addClass("s-slider-red").removeClass("s-slider-black").siblings().addClass("s-slider-black").removeClass("s-slider-red").parent().siblings().children().eq(index).fadeIn().siblings().fadeOut();

        current_img = index;

    }).mouseout(function(){

        clearTimeout(time);

        img_auto();

    });

});

function img_auto(){

    img_length = $(".j-slider").siblings().children().length;

    if( !(current_img) && current_img != 0 || current_img >= img_length || current_img < 0 ){

        current_img = 0;

    }else{

        $(".j-slider").children().eq(current_img).addClass("s-slider-red").removeClass("s-slider-black").siblings().addClass("s-slider-black").removeClass("s-slider-red").parent().siblings().children().eq(current_img).fadeIn().siblings().fadeOut();

        current_img++;

    }

    time = setTimeout(img_auto,3000);

}



//广告关闭

$(".close").click(function(){
    $("#ad").addClass("hidden");
})





