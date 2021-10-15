window.onload = function () {
	RDF_collectiontable();
	pg2_collection_collectiontable_StyleSetting();
	
	GBFheight(0, "pg2iframe");

}

var collectionjsonsrc = "../../database/collection.json";
function RDF_collectiontable() {
	$.ajax({
		url: collectionjsonsrc,
		type: 'GET',
		async: false,//使用同步的方式,true为异步方式
		data: {},//这里使用json对象
		success: function (data) {
			var collectionjsonL = data.user1[0].clttitle.length;
			drawcollectionouttable("collectiontablediv", collectionjsonL);
			fillcollectiontable(data.user1, collectionjsonL);
		},
		fail: function () {
			alert("Collectiontable ERROR");
		}
	});
}

var collectiontable_classname = "collectiontable";			//定义<table>的classname
var collectiontable_unit_caption_classname = "th_collection";//定义首行表头的classname
var collectiontable_unit_xuhao = "td_xuhao";				//定义第一列序号的classname
var collectiontable_unit_mingcheng = "td_mingcheng"			//定义第二列项目的classname
var collectiontable_unit_jianjietext = "beiwanglutextunit";
var collectiontable_unit_wangzhi = "td_website";
var collectiontable_unit_goto = "td_go"						//定义第4列状态的classname
function drawcollectionouttable(targetstr3, collectionitem_num) {
	var div_ = $(addid(targetstr3));
	div_.append("<table class=\"" + collectiontable_classname + "\"></table>");//添加表格
	var table_ = $("." + collectiontable_classname);
	var tr_;

	for (var i = 0; i <= collectionitem_num; i++) {
		if (i == 0) {
			//添加周信息
			table_.append('<tr class="' + collectiontable_unit_caption_classname + '"><th class="' + collectiontable_unit_caption_classname + '">序号</th><th class="' + collectiontable_unit_caption_classname + '">名称</th><th class="' + collectiontable_unit_caption_classname + '">简介</th><th class="' + collectiontable_unit_caption_classname + '">网址</th><th class="' + collectiontable_unit_caption_classname + '">立即访问</th></tr >');
		}
		else {
			table_.append('<tr class="num' + i + '"></tr>');	//添加行元素
			tr_ = $(".num" + i);
			tr_.append("<td class=\"" + collectiontable_unit_xuhao + "\"> " + i + " </td>");
			tr_.append("<td class=\"" + collectiontable_unit_mingcheng + "\"> </td>");
			tr_.append("<td class=\"" + collectiontable_unit_jianjietext + "\"  contentEditable=\"true\"></td>");
			tr_.append("<td class=\"" + collectiontable_unit_wangzhi + "\"> </td>");
			tr_.append("<td class=\"" + collectiontable_unit_goto + "\">  </td>");


		}
	}
}


function fillcollectiontable(collectionjson, length) {

	for (var i = 0; i < length; i++) {
		$(addcls(collectiontable_unit_mingcheng)).eq(i).html(collectionjson[0].clttitle[i]);
		$(addcls(collectiontable_unit_jianjietext)).eq(i).html(collectionjson[0].discription[i]);
		$(addcls(collectiontable_unit_wangzhi)).eq(i).html(collectionjson[0].cltsite[i]);
		$(addcls(collectiontable_unit_goto)).eq(i).html('<a target="_blank" href="' + collectionjson[0].cltsite[i] + '">Go↗</a>');

	}
}

function pg2_collection_collectiontable_StyleSetting() {

	$(addcls(collectiontable_classname)).css({
		"table-layout": "fixed",
		"width": "100%",
		"max-width": "800px",
	})//定义表格属性
	$(addcls(collectiontable_classname) + " th").css({
		"border-collapse": "collapse",
		"border": "rgb(156, 202, 213) 2px solid",
		"padding": "10px 8px",
		"background-color": "rgb(193, 235, 248)",
		"text-align": "center",
		"line-height": "2em"
	});//定义表头属性
	$(addcls(collectiontable_unit_caption_classname)).eq(1).css({ "width": "4em" });//选择序号列的宽度
	$(addcls(collectiontable_unit_caption_classname)).eq(2).css({ "width": "6em" });//选择名称列的宽度
	$(addcls(collectiontable_unit_caption_classname)).eq(3).css({ "width": "8em" });//选择简介列的宽度
	$(addcls(collectiontable_unit_caption_classname)).eq(5).css({ "width": "8em" });//选择立即访问列的宽度

	$(addcls(collectiontable_unit_xuhao) + "," + addcls(collectiontable_unit_mingcheng) + "," + addcls(collectiontable_unit_jianjietext) + "," + addcls(collectiontable_unit_wangzhi) + "," + addcls(collectiontable_unit_goto)).css({
		"border-collapse": "collapse",
		"border": "rgb(156, 202, 213) 2px solid",
		"padding": "10px 8px",
		"text-align": "center",
		"line-height": "2em"
	});//定义单元格属性

	$(addcls(collectiontable_unit_xuhao)).css({ "background-color": "rgb(193, 235, 248)" });
	$(addcls(collectiontable_unit_mingcheng)).css({ "text-align": "left" });//选择名称单元格

	$(addcls(collectiontable_unit_jianjietext)).css({
		"text-align": " left",
		"vertical-align": "top",
		"margin": "0px",
		"padding": "0px"
	})

	$(addcls(collectiontable_unit_wangzhi)).css({
		"text-align": " left"
	})
}



function addid(targetid) {
	return "#" + targetid.toString();
}
function addcls(targetclass) {
	return "." + targetclass.toString();
}