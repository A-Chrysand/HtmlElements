var PAST_DAYS = -999
var UNKNOWN_END_DAYS = 0.1


var cfa = {
    data: function () {
        return {
            lclist: this.getJSON(),
            f_lclist: []
        }
    },
    methods: {
        getJSON: function () {
            let xhrstr = new XMLHttpRequest()
            xhrstr.open("GET", "./src/a.json");
            xhrstr.responseType = "json"
            xhrstr.onload = response
            xhrstr.send()
            let _this = this	//important! 用_this指代整个组件本体,this随函数变化
            function response(e) {
                if (xhrstr.status == 200) {
                    _this.inittable(this.response)
                }
            }
        },
        inittable: function (response) {
            let tempList = []
            tempList = this.calcDays(response)
            var tempIndex = this.sortListIndex(tempList)
            this.devideList(tempIndex, tempList)
        },
        calcDays: function (respon) {
            var obj_today = new Date()
            //////////规格化
            for (let i = 0; i < respon.length; i++) {
                ///////////////////////////////开始时间转换
                var startLogTimeDate = new Date(Date.parse(respon[i]["fromtime"].replace(/-/g, "/")))
                ///////////////////////////////结束时间转换
                if (respon[i]["totime"] == "？" || respon[i]["totime"] == "？") {
                    respon[i]["deltaDays"] = UNKNOWN_END_DAYS
                    respon[i]["totime"] = "？"
                }
                else {
                    var endLogTimeDate = new Date(Date.parse(respon[i]["totime"].replace(/-/g, "/")))
                }
                //////////////////////////////过期、now、未开始计算
                if (respon[i]["totime"] != "？") {
                    if (obj_today > endLogTimeDate) { //过期
                        respon[i]["fromtime"] = "过期"
                        respon[i]["totime"] = "过期"
                        respon[i]["deltaDays"] = PAST_DAYS
                    } else if (obj_today < startLogTimeDate) {  //future
                        var float_caledData = -1 * parseFloat(Math.abs(startLogTimeDate - obj_today) / 1000 / 60 / 60 / 24);
                        respon[i]["deltaDays"] = float_caledData
                        respon[i]["fromtime"] = respon[i]["fromtime"].slice(5, respon[i]["fromtime"].length)
                        respon[i]["totime"] = respon[i]["totime"].slice(5, respon[i]["totime"].length - 9)
                    }
                    else {  //now
                        var float_caledData = parseFloat(Math.abs(endLogTimeDate - obj_today) / 1000 / 60 / 60 / 24);
                        respon[i]["deltaDays"] = float_caledData
                        respon[i]["fromtime"] = "now"
                        respon[i]["totime"] = respon[i]["totime"].slice(5, respon[i]["totime"].length - 9)
                    }
                } else {
                    if (obj_today < startLogTimeDate) {  //future
                        var float_caledData = -1 * parseFloat(Math.abs(startLogTimeDate - obj_today) / 1000 / 60 / 60 / 24);
                        respon[i]["deltaDays"] = float_caledData
                        respon[i]["fromtime"] = respon[i]["fromtime"].slice(5, respon[i]["fromtime"].length)
                        //respon[i]["totime"] = respon[i]["totime"].slice(5, respon[i]["totime"].length - 9)
                    }
                    else {  //now
                        respon[i]["fromtime"] = "now"
                    }
                }
                ///////////////////////////后处理
            }
            return respon
        },
        sortListIndex: function (caledData) {
            //future:-xx days || past: -9999days || now: xx days
            var temp_deltaday = []
            for (var i = 0; i < caledData.length; i++) {
                temp_deltaday.push(caledData[i]["deltaDays"])
            }
            var deltadayindex = []
            var max, maxi
            for (var j = 0; j < temp_deltaday.length; j++) {
                maxi = 0
                max = temp_deltaday[0]
                //过期=-999，未知=-888
                for (var i = 0; i < temp_deltaday.length - 1; i++) {
                    if (temp_deltaday[i + 1] >= max) {
                        max = temp_deltaday[i + 1]
                        maxi = i + 1
                    }
                }
                if (temp_deltaday[maxi] >= 0) {
                    deltadayindex.unshift(maxi)
                } else {
                    deltadayindex.push(maxi)
                }
                temp_deltaday[maxi] = -32767
            }
            return deltadayindex
            //deltadayindext同时含有>0和<0的浮点数，并且从大到小排
        },
        devideList: function (indexList, datalist) {
            var temp_lclist = []
            var temp_f_lclist = []
            for (var i = 0; i < indexList.length; i++) {
                var j = indexList[i]
                datalist[j]["dateString"] = datalist[j]["fromtime"] + "~" + datalist[j]["totime"]
                delete (datalist[j]["fromtime"])
                delete (datalist[j]["totime"])
                if (datalist[j]["mark"] == 0) {
                    if (datalist[j]["deltaDays"] > 0) {
                        if (datalist[j]["deltaDays"] > 1) {
                            datalist[j]["deltaDays"] = parseInt(datalist[j]["deltaDays"])
                        }
                        temp_f_lclist.push(datalist[j])
                    }
                    else {
                        if (datalist[j]["deltaDays"] == PAST_DAYS) {
                            datalist[j]["dateString"] = "已过期"
                            datalist[j]["deltaDays"] = "--"
                        }
                        else if (datalist[j]["deltaDays"] == UNKNOWN_END_DAYS) {
                            datalist[j]["deltaDays"] = "--"
                        }
                        datalist[j]["deltaDays"] = parseInt(datalist[j]["deltaDays"])
                        temp_f_lclist.unshift(datalist[j])
                    }
                }
                else {
                    if (datalist[j]["deltaDays"] > 0) { //>0    now
                        if (datalist[j]["deltaDays"] > 1) {
                            datalist[j]["deltaDays"] = parseInt(datalist[j]["deltaDays"])
                        } else {    //不到1天了
                            datalist[j]["deltaDays"] = datalist[j]["deltaDays"].toFixed(1)
                            //datalist[j]["deltaDays"] = '<span style="color:red;">' + datalist[j]["deltaDays"].toFixed(1) + '</span>'
                        }
                        temp_lclist.push(datalist[j])
                    }
                    else {  //<0 future
                        if (datalist[j]["deltaDays"] == PAST_DAYS) {
                            datalist[j]["dateString"] = "已过期"
                            datalist[j]["deltaDays"] = "--"
                        }
                        else if (datalist[j]["deltaDays"] == UNKNOWN_END_DAYS) {
                            datalist[j]["deltaDays"] = "--"
                        }
                        if (datalist[j]["deltaDays"] < -1) {
                            datalist[j]["deltaDays"] = parseInt(datalist[j]["deltaDays"])
                        } else {
                            datalist[j]["deltaDays"] = datalist[j]["deltaDays"].toFixed(1)
                        }
                        temp_lclist.push(datalist[j])
                    }
                }
            }
            this.lclist = temp_lclist
            this.f_lclist = temp_f_lclist
        },
    },
    template: '\
	<div id="div_cf_list" class="table-responsive">\
		<table class="table table_cf_list">\
			<tr class="tr_tablehead">\
				<th class="list_time">活动时间</th>\
				<th class="list_deltaDays">Δd</th>\
				<th class="list_name">活动名称</th>\
				<th class="list_method">活动方式</th>\
				<th class="list_reward">活动主要奖励</th>\
			</tr>\
			<tr v-for="item in lclist">\
				<td class="list_time">{{item.dateString}}</td>\
				<td class="list_deltaDays"><span>{{item.deltaDays}}</span>天</td>\
				<td class="list_name"><a target="_blank" :href="item.link">{{item.name}}</a><span class="list_inline_note">{{item.note}}</span></td>\
				<td class="list_method">{{item.method}}</td>\
				<td class="list_reward">{{item.reward}}</td>\
			</tr>\
            <tr>\
                <td colspan="5">过气活动</td>\
            </tr>\
            <tr class="tr_bk" v-for="item in f_lclist">\
                <td class="list_time">{{item.dateString}}</td>\
                <td class="list_deltaDays"><span>{{item.deltaDays}}</span>天</td>\
                <td class="list_name"><a target="_blank" :href="item.link">{{item.name}}</a><span class="list_inline_note">{{item.note}}</span></td>\
                <td class="list_method">{{item.method}}</td>\
                <td class="list_reward">{{item.reward}}</td>\
            </tr>\
        </table>\
	</div > '
}
var udf = {
    data: function () {
        return {
            msg: "没有了赶紧润"
        }
    },
    template: '\
	<div>\
		<div id="div_file_list" class="table-responsive">\
			<table class="table table_file_list">\
				<tr>\
					<th class="list_name">文件名</th>\
					<th class="list_size">大小</th>\
				</tr>\
				<tr>\
					<td class="list_name"><a href="./anon/Putty/putty-64bit-0.75-installer.msi" download="putty-64bit-0.75-installer.msi">putty-64bit-0.75-installer.msi</a></td>\
					<td class="list_size">2.9MB</td>\
				</tr>\
				<tr>\
					<td class="list_name"><a href="./anon/Office Bat/Office2019_toVolume.bat" download="Office2019_toVolume.bat">Office2019_toVolume.bat</a></td>\
					<td class="list_size">1.25KB</td>\
				</tr>\
				<tr>\
					<td class="list_name"><a href="./anon/Office Bat/Office2016_x86_active.bat" download="Office2016_x86_active.bat">Office2016_x86_active.bat</a></td>\
					<td class="list_size">138B</td>\
				</tr>\
				<tr>\
					<td class="list_name"><a href="./anon/Yuri_s_Revenge_1.001.rar" download="Yuri_s_Revenge_1.001.rar">Yuri_s_Revenge_1.001.rar</a></td>\
					<td class="list_size">265MB</td>\
				</tr>\
				<tr>\
					<td class="list_name"><a href="./anon/7z1900-x64.exe" download="7z1900-x64.exe">7z1900-x64.exe</a></td>\
					<td class="list_size">1.4MB</td>\
			</tr>\
			</table>\
		</div>\
		<p style="margin:0">{{msg}}</p>\
	<div>'
}