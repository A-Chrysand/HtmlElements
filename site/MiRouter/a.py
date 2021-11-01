from filetree import localFileTree
from ftp import ftpconnect, uploadfile
import json
import datetime
import sys


def cutstring(operation_string, splicechar=";", para_num_of_splicechar=0):
	try:
		operation_string.index(splicechar)  # 检测operation_string里是否含有切割标记字符
	except ValueError:
		#print("切割的字符串不含切割标记字符")
		return [operation_string]
	temp = []
	if para_num_of_splicechar:
		num_of_splicechar = para_num_of_splicechar
	else:
		num_of_splicechar = operation_string.count(splicechar)

	# 如果num_of_splicechar设置错误，那么会导致最后一个splicechar之后为一整块(分割不完全)
	for i in range(num_of_splicechar + 1):
		if i != num_of_splicechar:
			temp.append(operation_string[:operation_string.index(splicechar)]
			            )  # 切割从开头到分割标记字符之前的字符串并push到列表中
			operation_string = operation_string.lstrip(
			    temp[i])  # 从左向右删除刚刚切割掉的字符
			operation_string = operation_string.lstrip(
			    splicechar)  # 从左向右删除标记字符
		else:
			temp.append(operation_string)
			break
	return temp


def formatDays(input_daystring):
	strlist = cutstring(input_daystring, "~")
	today = datetime.date.today()  #print(today) >>> 2021-01-01
	return_datelist = []
	##################开始时间
	if strlist[0] == "":
		return_datelist.append(str(today))
	else:
		return_datelist.append(str(today.year) + "-" + strlist[0])
	##################结束时加
	if strlist[1] == "？" or strlist[1] == '?' or strlist[1] == "":
		return_datelist.append("？")
	else:
		return_datelist.append(
		    str(today.year) + "-" + strlist[1] + " 23:59:59")
	return return_datelist


def readfile():
	lclist = []
	with open("./routertext.txt", encoding="utf-8") as txtfile:
		linelist = txtfile.readlines()
		del linelist[0:5]  # 删除第一个元素，txt第前5行是注释
	for i in range(len(linelist)):
		linelist[i] = linelist[i].replace("\t", "")
		linelist[i] = linelist[i].replace("\n", "")
	i = 0
	while i < len(linelist):
		tempdict = {}
		tempdict["name"] = linelist[i]
		# 第一行 活动标题
		i += 1
		temp_calcdate = formatDays(linelist[i])
		# 第二行、活动时间
		tempdict["fromtime"] = temp_calcdate[0]
		tempdict["totime"] = temp_calcdate[1]
		i += 1
		tempdict["method"] = linelist[i]
		# 第三行活动方法F
		i += 1
		tempdict["reward"] = linelist[i]
		# 第四行活动奖励
		i += 1
		temp = cutstring(linelist[i], "；")  # 有几个分隔符填几
		tempdict["link"] = temp[0]
		# 第五行地址
		i += 1
		if len(temp) == 2:
			temp[1] = "(" + temp[1] + ")"
			tempdict["note"] = temp[1]
		elif len(temp) == 3:
			temp[1] = "(" + temp[1] + ")"
			tempdict["note"] = temp[1]
			tempdict["mark"] = int(temp[2])
		lclist.append(tempdict)
	with open("./html/src/a.json", "w") as jsonfile:
		json.dump(lclist, jsonfile)
		print("Json write done")


def main(argv):
	if (len(argv) == 1):  #不填任何参数的Debug用
		readfile()
		return 0
	else:
		if argv[1] == '?' or argv == '？':
			print("无参数 生成json\nargv[1] == a 上传全部文件\nargv[1] == j 生成并上传json")
			return 0
		elif argv[1] == 'a':
			readfile()
			a = localFileTree()
			treelist = a.print_tree("./html/")
			ftp = ftpconnect("192.168.123.1", 21, "root", "26132613")
			for i in range(len(treelist[0])):
				uploadfile(ftp, "/mnt/sda1" + treelist[0][i], treelist[1][i])
				print(treelist[0][i])
		elif argv[1] == 'j':
			readfile()
			ftp = ftpconnect("192.168.123.1", 21, "root", "26132613")
			uploadfile(ftp, "/mnt/sda1/src/a.json", ".\\html\\src\\a.json")
			print('%-30s' % "src/a.json")
		else:
			return 0


main(sys.argv)