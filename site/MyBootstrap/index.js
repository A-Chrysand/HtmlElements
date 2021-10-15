window.onload = function () {
	console.log("done");
}

$(".nav-link:eq(0)").click(function () {
	$("#index_iframe").attr("src", "./src/1_Shouye/Shouye.html");
	$("#index_iframe").css({ "height": "calc(100vh)" });
	$(".nav-link").removeClass("active");
	$(".nav-link:eq(0)").addClass("active");
});

$(".nav-link:eq(1), .dropdown_listlink:eq(0)").click(function () {
	$("#index_iframe").attr("src", "./src/2_MyDevice/L1_DeviceInfo.html");
	$("#index_iframe").css({ "height": "calc(100vh)" });
	$(".nav-link").removeClass("active");
	$(".nav-link:eq(1)").addClass("active");
});


$(".dropdown_listlink:eq(1)").click(function () {
	$("#index_iframe").attr("src", "./src/2_MyDevice/L2_SystemUpdate.html");
	$("#index_iframe").css({ "height": "calc(100vh)" });
	$(".nav-link").removeClass("active");
	$(".nav-link:eq(1)").addClass("active");
});

$(".dropdown_listlink:eq(2)").click(function () {
	$("#index_iframe").attr("src", "./src/2_MyDevice/R_DeviceSetting.html");
	$("#index_iframe").css({ "height": "calc(100vh)" });
	$(".nav-link").removeClass("active");
	$(".nav-link:eq(1)").addClass("active");
});


$(".nav-link:eq(2)").click(function () {
	$("#index_iframe").attr("src", "https://www.baidu.com");
	$("#index_iframe").css({ "height": "calc(100vh)" });
	$(".nav-link").removeClass("active");
	$(".nav-link:eq(2)").addClass("active");
});