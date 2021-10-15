window.onload = function () {
	creatlist();
	drawbooktable("goodbooktablediv");
	fillbooktable();
	pg3_goodbooks_booktable_StyleSetting();
	GBFheight(0, "pg2iframe");
}

var booktable_classname = "booktable";			//定义<table>的classname
var booktable_unit_caption_classname = "th_book";//定义首行表头的classname

var booktable_unit_img = "td_image"			//定义第二列项目的classname
var booktable_unit_jieshao = "td_jieshao";

var booktable_unit_jieshao_par = "td_p_jieshao";
var booktable_unit_jieshao_biaoqian = "td_p_biaoqian";
var bookitem_num = booklist.length;	//定义有多少行+1

function drawbooktable(targetstr3) {
	var div_ = $(addid(targetstr3));
	div_.append("<table class=\"" + booktable_classname + "\"></table>");//添加表格
	var table_ = $("." + booktable_classname);
	var tr_;
	for (var i = 0; i < bookitem_num; i++) {
		table_.append('<tr class="trrow"></tr>');	//添加行元素
		tr_ = $(".trrow").eq(i);
		tr_.append("<td class=\"" + booktable_unit_img + "\"> </td>");
		tr_.append("<td class=\"" + booktable_unit_jieshao + "\"><div class=\"" + booktable_unit_jieshao_par + "\">123</div><p class=\"" + booktable_unit_jieshao_biaoqian + "\">323</p></td>");

		//}
	}
}

function fillbooktable() {
	for (var i = 0; i < booklist.length; i++) {
		$(addcls(booktable_classname) + " " + addcls(booktable_unit_img)).eq(i).html('<img width=' + (unit_width - 5) + 'px src=\"' + booklist[i].imgsrc + '\">');
		$(addcls(booktable_classname) + " " + addcls(booktable_unit_jieshao_par)).eq(i).html(booklist[i].discription);
		$(addcls(booktable_classname) + " " + addcls(booktable_unit_jieshao_biaoqian)).eq(i).html("标签：" + booklist[i].tag);
	}
	$(addid("countbook")).html("已找到<span style=\"color:red\">" + booklist.length + "</span>本");
}
var unit_width = 200;
function pg3_goodbooks_booktable_StyleSetting() {
	$(addcls(booktable_classname)).css({
		"table-layout": "fixed",
		"width": "100%",
	})//定义表格属性
	$(addcls(booktable_unit_img) + "," + addcls(booktable_unit_jieshao)).css({
		"border-collapse": "collapse",
		"border": "rgb(156, 202, 213) 2px solid",
		"text-align": "left",
		"vertical-align": "top",
		"line-height": "2em",
		"height": unit_width + "px",
	});//定义单元格属性
	$(addcls(booktable_unit_img)).css({ "width": unit_width + "px" });//选择名称单元格
	$(addcls(booktable_unit_jieshao)).css({ "padding": "10px 8px" });

	$(addcls(booktable_unit_jieshao_par)).css({ "height": (unit_width - 20 - 16) + "px" });
	$(addcls(booktable_unit_jieshao_biaoqian)).css({ "position": "relative", "vertical-align": "bottom", "line-height": "1em", "margin": "0px" });
}

function addid(targetid) {
	return "#" + targetid.toString();
}
function addcls(targetclass) {
	return "." + targetclass.toString();
}

function bookselect() {
	$(addcls(booktable_classname)).html("");//清除表格内容
	var slt = $("#bookselectlist").find(":selected").val();
	if (slt == "none") {
		bookitem_num = booklist.length;
		drawbooktable("goodbooktablediv");
		fillbooktable();
	}
	else {
		var targetnumber = 0;
		var targetlktion = new Array();
		for (var i = 0; i < booklist.length; i++) {
			if (booklist[i].tag[0] == slt) {
				targetlktion[targetnumber] = i;
				targetnumber++;
			}
		}
		console.log(targetlktion);
		if (targetnumber == 0) {
			alert("未找到书籍");
		}
		else {
			bookitem_num = targetnumber;
			drawbooktable("goodbooktablediv");
			fillselectedtable(targetlktion);
		}
	}
	pg3_goodbooks_booktable_StyleSetting();
	GBFheight(0, "pg2iframe");
}

function fillselectedtable(objlist) {
	for (var i = 0; i < objlist.length; i++) {
		$(addcls(booktable_classname) + " " + addcls(booktable_unit_img)).eq(i).html('<img width=' + (unit_width - 5) + 'px src=\"' + booklist[objlist[i]].imgsrc + '\">');
		$(addcls(booktable_classname) + " " + addcls(booktable_unit_jieshao_par)).eq(i).html(booklist[objlist[i]].discription);
		$(addcls(booktable_classname) + " " + addcls(booktable_unit_jieshao_biaoqian)).eq(i).html("标签：" + booklist[objlist[i]].tag);
	}
	$(addid("countbook")).html("已找到<span style=\"color:red\">" + objlist.length + "</span>本");
}