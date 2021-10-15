/*---------------------全局设置---------------------*/
var nav_ul_width = 70;					//设置导航栏总宽度
var bol = 1;							//设置1向上翻 -1向下翻
var height = 36;						//设置导航栏高度
var deg = 90;							//设置翻转角度
var donghuashijian = 0.1;				//设置动画时间
var frontcolor = "rgb(136,205,241)";	//设置滑块前面颜色
var backcolor = "pink";					//设置滑块背面颜色
/*---------------------全局设置---------------------*/
document.documentElement.style.setProperty('--nvwid', nav_ul_width + "%");
document.documentElement.style.setProperty('--nvmarginleft', (100 - nav_ul_width) / 2 + "%");
document.documentElement.style.setProperty('--hei', height);
document.documentElement.style.setProperty('--dg', deg);
document.documentElement.style.setProperty('--donghuashijian', donghuashijian);
document.documentElement.style.setProperty('--frontcolor', frontcolor);
document.documentElement.style.setProperty('--backcolor', backcolor);
if (bol == 1)//向上翻
{
    document.documentElement.style.setProperty('--A1', '1');
    document.documentElement.style.setProperty('--A2', '1');
    document.documentElement.style.setProperty('--d1', '1');
    document.documentElement.style.setProperty('--d2', '-1');
}
else {//向下翻
    document.documentElement.style.setProperty('--A1', '1');
    document.documentElement.style.setProperty('--A2', '-1');
    document.documentElement.style.setProperty('--d1', '-1');
    document.documentElement.style.setProperty('--d2', '1');
}

window.onload = function () {
    var hz_tab = document.getElementById("horzionalnav");
    var hz_nav_ul = hz_tab.getElementsByTagName("ul")[0];
    var hz_nav_li = hz_nav_ul.getElementsByTagName("li");
    var hz_nav_iframe = hz_tab.getElementsByTagName("iframe");
    for (i = 0, len = hz_nav_li.length; i < len; i++) {
        hz_nav_li[i].index = i;
        hz_nav_li[i].onclick = function () {
            for (var n = 0; n < len; n++) {
                hz_nav_li[n].className = "hz_nav_li_showone";
                hz_nav_iframe[n].className = "hz_nav_li_hiddenone";
            }
            this.className = "hz_nav_li";
            hz_nav_iframe[this.index].className = "";
        }
    }
    document.getElementById("adoplayer").volume = 0.7;
    alert("制作：\n班级\n姓名\n学号");
}



