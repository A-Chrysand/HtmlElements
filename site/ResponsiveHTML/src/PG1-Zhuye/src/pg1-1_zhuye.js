var currentuser = JSON.parse(sessionStorage.getItem("file_currentuser"));
var classjsonsrc = "../../database/class.json";		//注意这里是以html文件为起点做相对位置的
var homeworkjson = new Array();
var homeworkjsonsrc = "../../database/homework.json";	//注意这里是以html文件为起点做相对位置的


window.onload = function () {
	RDF_classtable();
	RDF_homeworktable();

	pg1_zhuye_classtable_StyleSetting();
	pg1_zhuye_homeworktable_StyleSetting();

	GBFheight(0, "pg1iframe");
	$("#classtabletitle").html(currentuser.banjistr + "课程表");
	$('#centerpagearea', parent.document).css("height", $("body").css("height"));
}

function RDF_classtable() {
	$.ajax({
		url: classjsonsrc,
		type: 'GET',
		async: false,//使用同步的方式,true为异步方式
		data: {},//这里使用json对象
		success: function (data) {
			drawclasstable("#classtable");
			fillclass(data);
			colorday();
		},
		fail: function () {
			alert("Classtable ERROR");
		}
	});
}

var unit_beiwanglu_classname = "beiwangluunit"//定义首行备忘录单元格
var unit_beiwanglutext_classname = "beiwanglutextunit";	//定义备忘录单元格
var classtable_unit_jieci_classname = "th_course"	//定义首行列单元格的Classname
var classtable_unit_course_classname = "td_course"	//定义单元格的classname
var classtable_unit_week_classname = "headCourse"	//定义首行单元格的classname
var classtable_jieshu = 5;					//定义一天多少节课
var classtable_lie = 8;
var classtable_classname = "tableCourse";
function drawclasstable(TargetClassTableDivId) {
	//更改名称也要改变CSS中的
	var div_ = $(TargetClassTableDivId);
	div_.append("<table class=\"" + classtable_classname + "\"></table>");//添加表格
	var table_ = $("." + classtable_classname);
	var tr_;
	for (var i = 0; i <= classtable_jieshu; i++) {
		if (i == 0) {
			//添加周信息
			table_.append('<tr class="' + classtable_unit_week_classname + '"><th class="' + classtable_unit_jieci_classname + '"></th><th class="' + classtable_unit_jieci_classname + '">周一</th><th class="' + classtable_unit_jieci_classname + '">周二</th><th class="' + classtable_unit_jieci_classname + '">周三</th><th class="' + classtable_unit_jieci_classname + '">周四</th><th class="' + classtable_unit_jieci_classname + '">周五</th><th class="' + classtable_unit_jieci_classname + '">周六</th><th class="' + classtable_unit_jieci_classname + '">周日</th><th class="' + unit_beiwanglu_classname + '">备忘录</th></tr >');
		}
		else {
			//添加节课信息
			table_.append("<tr class=\"j" + i + "\"></tr>");	//\"为转义字符，转"
			tr_ = $(".j" + i);
			tr_.append("<th class=\"" + classtable_unit_jieci_classname + "\">" + i + "</th>");
			for (var j = 1; j <= classtable_lie; j++) {
				if (i == 1 && j == classtable_lie) {
					tr_.append("<td id=\"w" + j + "_j" + i + "\" class=\"" + unit_beiwanglutext_classname + "\" rowspan=\"" + classtable_jieshu + "\" contentEditable=\"true\"></td>");
				}
				else if (j != classtable_lie) {
					tr_.append("<td id=\"w" + j + "_j" + i + "\" class=\"" + classtable_unit_course_classname + "\"></td>");
				}
			}
		}
	}
}

function fillclass(classjson) {
	var i, w, j;
	for (i in classjson[currentuser.banji]) {
		w = classjson[currentuser.banji][i].xingqi.toString();
		j = classjson[currentuser.banji][i].jieci.toString();
		$("#w" + w + "_j" + j).html(classjson[currentuser.banji][i].kemu);
	}
	$(".tableCourse .beiwanglutextunit").html("1、周日晚有班会课");
}

function colorday() {
	var myDate = new Date();/*
	var year = myDate.getFullYear(); //年
	var month = myDate.getMonth() + 1; //月
	var day = myDate.getDate(); //日*/
	var days = myDate.getDay();
	var xingqi;
	var tableday = days;
	switch (days) {
		case 1:
			xingqi = '星期一';
			break;
		case 2:
			xingqi = '星期二';
			break;
		case 3:
			xingqi = '星期三';
			break;
		case 4:
			xingqi = '星期四';
			break;
		case 5:
			xingqi = '星期五';
			break;
		case 6:
			xingqi = '星期六';
			break;
		case 0:
			xingqi = '星期日';
			tableday = 7;
			break;
	}
	$("." + classtable_unit_jieci_classname).eq(tableday).css("color", "red");
	for (var i = 0; i <= 5; i++) {
		$("#w" + tableday + "_j" + i).css("background-color", "rgb(255, 247, 247)");
	}
	//var str = year + "年" + month + "月" + day + "日  " + days;*/
	return days;
}


var hwcharacter = "homework1"
function RDF_homeworktable() {
	$.ajax({
		url: homeworkjsonsrc,
		type: 'GET',
		async: false,//使用同步的方式,true为异步方式
		data: {},//这里使用json对象
		success: function (data) {
			var homeworkLength = data[hwcharacter].length;
			drawhomeworktable("#homeworktable", homeworkLength);
			fillhomework(data[hwcharacter]);
		},
		fail: function () {
			alert("homeworktable ERROR");
		}
	});
}


var homeworktable_classname = "homeworktable";	//定义<table>的classname
var homeworktable_unit_caption_classname = "th_homework";		//定义首行表头的classname
var homeworktable_unit_xuhao = "td_xuhao";					//定义第一列序号的classname
var homeworktable_unit_xiangmu = "td_xiangmu"					//定义第二列项目的classname
var homeworktable_unit_time = "td_time"						//定义第三列时间的classname
var homeworktable_unit_doit = "td_doit"						//定义第四列doit的classname
//更改名称也要改变CSS中的
function drawhomeworktable(targetstr2, homeworktable_hw_num) {

	var div_ = $(targetstr2);
	div_.append("<table class=\"" + homeworktable_classname + "\"></table>");//添加表格
	var table_ = $("." + homeworktable_classname);
	var tr_;


	for (var i = 0; i <= homeworktable_hw_num; i++) {
		if (i == 0) {
			//添加周信息
			table_.append('<tr class="' + homeworktable_unit_caption_classname + '"><th class="' + homeworktable_unit_caption_classname + " " + '">序号</th><th class="' + homeworktable_unit_caption_classname + " " + '">项目</th><th class="' + homeworktable_unit_caption_classname + " " + '">截止时间</th><th class="' + homeworktable_unit_caption_classname + " " + '">Do it</th><th class="' + unit_beiwanglu_classname + '">备忘录</th></tr >');
		}
		else {
			table_.append('<tr class="num' + i + '"></tr>');	//添加行元素
			tr_ = $(".num" + i);
			tr_.append("<td class=\"" + homeworktable_unit_xuhao + "\"> " + i + " </td>");		//添加首列序号
			tr_.append("<td class=\"" + homeworktable_unit_xiangmu + "\"> </td>");		//添加首列序号
			tr_.append("<td class=\"" + homeworktable_unit_time + "\">  </td>");		//添加首列序号
			tr_.append("<td class=\"" + homeworktable_unit_doit + "\"> </td>");		//添加首列序号
			if (i == 1) {
				tr_.append("<td class=\"" + unit_beiwanglutext_classname + "\" rowspan=\"" + homeworktable_hw_num + "\" contentEditable=\"true\"></td>");

			}
		}
	}
}


function fillhomework(hwdata) {
	for (var i in hwdata) {
		$(".td_xiangmu").eq(i).html(hwdata[i].subject + hwdata[i].title);
		$(".td_time").eq(i).html(hwdata[i].month + "月" + hwdata[i].day + "日");
		//由于eq(i=0)时为表头，会把数据写进表头，所以要先++i选择完后再--i读取数据
	}
	$(".td_doit").eq(2).html("<a href=\"https://www.educoder.net/\" target=\"_blank\">edu</a>");
	$(".td_doit").eq(3).html("<a href=\"http://i.chaoxing.com/\" target=\"_blank\">学习通</a>");
	$(".td_doit").eq(4).html("<a href=\"http://i.chaoxing.com/\" target=\"_blank\">学习通</a>");
}


function pg1_zhuye_classtable_StyleSetting() {
	//课程表样式
	$(addcls(classtable_classname)).css({
		"table-layout": "fixed",
		"width": "100%",
		"max-width": "800px",
	})//定义表格属性
	$(addcls(classtable_classname) + " th").css({
		"border-collapse": "collapse",
		"border": "rgb(156, 202, 213) 2px solid",
		"padding": "10px 8px",
		"background-color": "rgb(193, 235, 248)",
		"text-align": "center",
		"line-height": "2em"
	});//定义表头属性
	//$(addcls(classtable_classname) + " tr" + " th").eq(0).css({ "width": "2em" });//选取表格首列(节数列)的css
	$(addcls(classtable_unit_course_classname)).css({
		"border-collapse": "collapse",
		"border": "rgb(156, 202, 213) 2px solid",
		"padding": "2px 2px",
		"text-align": "center",
		"line-height": "1em",
	});//定义单元格属性
	$(addcls(unit_beiwanglu_classname)).css({
		"text-align": "center",
		"color": "darkblue",
		"width": "20%"
	})//定义备忘录表头单元格样式
	$(addcls(unit_beiwanglutext_classname)).css({
		"border-collapse": "collapse",
		"border": "rgb(156, 202, 213) 2px solid",
		"text-align": " left",
		"vertical-align": "top",
		"margin": "0px",
		"padding": "0px"
	})//定义备忘录内容单元格样式
}

function pg1_zhuye_homeworktable_StyleSetting() {
	$(addcls(homeworktable_classname)).css({
		"table-layout": "fixed",
		"width": "100%",
		"max-width": "800px",
	})//定义表格属性
	$(addcls(homeworktable_classname) + " th").css({
		"border-collapse": "collapse",
		"border": "rgb(156, 202, 213) 2px solid",
		"padding": "10px 8px",
		"background-color": "rgb(193, 235, 248)",
		"text-align": "center",
		"line-height": "2em"
	});//定义表头属性
	$(addcls(homeworktable_unit_caption_classname)).eq(1).css({ "width": "4em" });//选择序号列的宽度
	$(addcls(homeworktable_unit_caption_classname)).eq(3).css({ "width": "8em" });//选择截止时间列的宽度
	$(addcls(homeworktable_unit_caption_classname)).eq(4).css({ "width": "6em" });//选择Do it列的宽度
	$(addcls(homeworktable_unit_xuhao) + "," + addcls(homeworktable_unit_xiangmu) + "," + addcls(homeworktable_unit_time) + "," + addcls(homeworktable_unit_doit)).css({
		"border-collapse": "collapse",
		"border": "rgb(156, 202, 213) 2px solid",
		"padding": "10px 8px",
		"text-align": "center",
		"line-height": "2em"
	});//定义单元格属性

	$(addcls(homeworktable_unit_xuhao)).css({ "background-color": "rgb(193, 235, 248)" });
	$(addcls(homeworktable_unit_xiangmu)).css({ "text-align": "left" });//选择项目单元格
}

function addid(targetid) {
	return "#" + targetid.toString();
}
function addcls(targetclass) {
	return "." + targetclass.toString();
}