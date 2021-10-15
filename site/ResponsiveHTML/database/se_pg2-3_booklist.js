var booklist = creatlist();;
//自然 科学 人文 技术
function creatlist() {
	var ctlist = new Array();
	ctlist[0] = creatobj("bk_cpp", "一本十分有用的C++入门介绍书，可以让你轻松地从入门到放弃", ["技术"], "../../image/img/book/cpp.jpg", "");
	ctlist[1] = creatobj("bk_edmshouce", "一本十分有用的电子舞曲入门手册", ["技术"], "../../image/img/book/edmshouce.jpg", "");
	ctlist[2] = creatobj("bk_geliefu", "《格列佛游记》是英国作家乔纳森·斯威夫特（又译为江奈生·斯威夫特）创作的一部长篇游记体讽刺小说，首次出版于1726年。", ["人文"], "../../image/img/book/geliefu.jpg", "");
	ctlist[3] = creatobj("bk_guojiadili", "《国家地理》是1888年10月美国国家地理协会出版的图书，现在已经成为世界上最广为人知的一本杂志，杂志每年发行12次，但偶尔有特版发布则不在此限。", ["自然"], "../../image/img/book/guojiadili.jpg", "");
	ctlist[4] = creatobj("bk_jisuanjiwangluo", "计算机网络专业教科书", ["技术"], "../../image/img/book/jisuanjiwangluo.jpg", "");
	ctlist[5] = creatobj("bk_makesi", "马克思主义哲学原理是政治教育专业学生的必修课程，是政治教育专业学生必须掌握的马克思主义基础理论知识中的一个重要组成部分。", ["技术"], "../../image/img/book/makesi.jpg", "");
	ctlist[6] = creatobj("bk_pindeshixianzai", "《拼的是现在，比的是将来》是2014年由中国华侨出版社出版的图书，作者是老可。本书针对初入职场的朋友，直指他们的要害与痛点，并提出了一整套切实可行的方案，帮助年轻人摆脱现状。", ["人文"], "../../image/img/book/pindeshixianzai.jpg", "");
	ctlist[7] = creatobj("bk_primere", "一本十分有用的Primere入门介绍书，可以让你轻松地从入门到放弃", ["技术"], "../../image/img/book/primere.jpg", "");
	ctlist[8] = creatobj("bk_qingchunbuying", "《青春不应被浪费》是2014年上海财经大学出版社出版的一本图书，作者是袁岳。", ["人文"], "../../image/img/book/qingchunbuying.jpg", "");
	ctlist[9] = creatobj("bk_santi", "一本十分好看的科幻小说，实属厉害厉害厉害", ["人文"], "../../image/img/book/santi.jpg", "");
	ctlist[10] = creatobj("bk_sheyingbiji", "一本十分有用的摄影教学手册，从构图到拍摄到后期，统统解决", ["技术"], "../../image/img/book/sheyingbiji.jpg", "");
	ctlist[11] = creatobj("bk_shijianjianshi", "伟大科学家霍金的著作，介绍了一些很科学的东西", ["科学"], "../../image/img/book/shijianjianshi.jpg", "");
	ctlist[12] = creatobj("bk_tingzhu", "一本书", ["人文"], "../../image/img/book/tingzhu.jpg", "");
	ctlist[13] = creatobj("bk_xinzhoukan", "一本时尚的杂志，介绍我国一些社会现象", ["人文"], "../../image/img/book/xinzhoukan.jpg", "");
	ctlist[14] = creatobj("bk_zhiyaochufa", "一本书", ["人文"], "../../image/img/book/zhiyaochufa.jpg", "");
	ctlist[15] = creatobj("bk_ziran", "国际著名的科学刊物，一些生物学论文会发表在上面", ["自然"], "../../image/img/book/ziran.jpg", "");
	return ctlist;
}


function creatobj(name, discription, tag, imgsrc, buynow) {
	var newobj = new Object();
	newobj.name = name;
	newobj.discription = discription;
	newobj.tag = tag;
	newobj.imgsrc = imgsrc;
	newobj.buynow = buynow;
	return newobj;
}

/*
var book = new Object();//创建对象的一个实例
book.name = "string";
book.discription = "const string";
book.tag = ["science", "human", "nature", "tech"];
book.imgsrc = "fileurlstring";
book.buynow = "shopurlstring";
*/


//创建方法：是直接全局变量创建，还是函数创建，封装成数组再返回给调用函数????????