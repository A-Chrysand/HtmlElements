var cfa = {
    data: function () {
        return {
            lclist: this.getJSON(),
            f_lclist: []
        }
    },
    methods: {
        getJSON: function () {
            var xhrstr = new XMLHttpRequest()
            xhrstr.open("GET", "./src/a.json");
            xhrstr.responseType = "json"
            xhrstr.onload = response
            xhrstr.send()
            var _this = this	//important! 用_this指代整个组件本体,this随函数变化
            function response(e) {
                if (xhrstr.status == 200) {
                    _this.calcDays(this.response)
                }
            }
        },
        calcDays: function (resp) {
            //创建今日时间对象
            /*var temp_struct_date = new Date()
            var temp_str_todate = temp_struct_date.getFullYear().toString() + '-' + (temp_struct_date.getMonth() + 1).toString() + '-' + temp_struct_date.getDate().toString()
            var obj_today = new Date(Date.parse(temp_str_todate.replace(/-/g, "/")))*/
            var obj_today = new Date()
            var return_data = resp
            //循环修改待渲染数据
            for (let i = 0; i < return_data.length; i++) {
                ///////////////////////////////开始时间转换
                if (return_data[i]["fromtime"] == "$today") {
                    var startLogTimeDate = obj_today
                } else {
                    var startLogTimeDate = new Date(Date.parse(return_data[i]["fromtime"].replace(/-/g, "/")))
                }
                ///////////////////////////////结束时间转换
                if (return_data[i]["totime"] != "？") {
                    var endLogTimeDate = new Date(Date.parse(return_data[i]["totime"].replace(/-/g, "/")))
                    if (endLogTimeDate > startLogTimeDate) {
                        return_data[i]["deltaDays"] = parseInt(Math.abs(endLogTimeDate - startLogTimeDate) / 1000 / 60 / 60 / 24);
                    } else {
                        return_data[i]["deltaDays"] = '0'
                    }
                    return_data[i]["totime"] = return_data[i]["totime"].slice(5, return_data[i]["totime"].length)
                } else {
                    return_data[i]["deltaDays"] = '--'
                    return_data[i]["totime"] = "？"
                }
                //////////////检测是否是today
                if (startLogTimeDate > obj_today) {
                    var float_temp_deltaday = -1 * parseFloat(Math.abs(startLogTimeDate - obj_today) / 1000 / 60 / 60 / 24).toFixed(1);
                    if (float_temp_deltaday > -1) {
                        return_data[i]["deltaDays"] = parseInt(float_temp_deltaday) - 1
                    } else {
                        return_data[i]["deltaDays"] = parseInt(float_temp_deltaday)
                    }
                    return_data[i]["fromtime"] = return_data[i]["fromtime"].slice(5, return_data[i]["fromtime"].length)
                } else {
                    return_data[i]["fromtime"] = "now"
                }
            }
            this.tdsort(return_data)
        },
        tdsort: function (return_data) {
            var temp_deltaday = []
            for (var i = 0; i < return_data.length; i++) {
                if (return_data[i]["deltaDays"] != "--")
                    temp_deltaday.push(return_data[i]["deltaDays"])
                else
                    temp_deltaday.push(999)
            }
            var deltadayindex = []
            var static_delayday_length = temp_deltaday.length
            var max, maxi
            for (var j = 0; j < static_delayday_length; j++) {
                maxi = 0
                max = temp_deltaday[0]
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
            var temp_obj = []
            for (var i = 0; i < static_delayday_length; i++) {
                temp_obj[i] = return_data[deltadayindex[i]]
            }
            return_data = temp_obj
            this.devide(return_data)
        },
        devide: function (datalist) {
            var temp_lclist = []
            var temp_f_lclist = []
            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i]["mark"] == undefined) {
                    temp_lclist.push(datalist[i])
                } else {
                    temp_f_lclist.push(datalist[i])
                }
            }
            this.lclist = temp_lclist
            this.f_lclist = temp_f_lclist
        },
        checkmark: function (inputstring) {
            switch (inputstring) {
                case 0: return false;
                case undefined: return true;
            }

        }
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
				<td v-if="checkmark(item.mark)"  class="list_time">{{item.fromtime}}~{{item.totime}}</td>\
				<td v-if="checkmark(item.mark)"  class="list_deltaDays"><span>{{item.deltaDays}}</span>天</td>\
				<td v-if="checkmark(item.mark)"  class="list_name"><a target="_blank" :href="item.link">{{item.name}}</a><span class="list_inline_note">{{item.note}}</span></td>\
				<td v-if="checkmark(item.mark)"  class="list_method">{{item.method}}</td>\
				<td v-if="checkmark(item.mark)"  class="list_reward">{{item.reward}}</td>\
			</tr>\
            <tr>\
                <td colspan="5">过气活动</td>\
            </tr>\
            <tr class="tr_bk" v-for="item in f_lclist">\
                <td class="list_time">{{item.fromtime}}~{{item.totime}}</td>\
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