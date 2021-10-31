import os
import json
from ftplib import FTP
import datetime
import sys
from filetree import localFileTree


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


def CalcDeltaDays(input_daystring):
	"""
    数据格式<string>xx-xx(过去的时间)
    <string>xx-xx(未到的时间)
    <string>(无，未知开始时间)
    <string>？(未知结束时间)
    """
	strlist = cutstring(input_daystring, "~")
	today = datetime.date.today()
	datelist = []
	if strlist[0] == "":
		# date0 = today
		datelist.append("$today")
	else:
		temp_time = str(int(today.year)) + "-" + strlist[0]
		# date0 = datetime.datetime.strptime(temp_time, "%Y-%m-%d").date()
		datelist.append(
		    str(datetime.datetime.strptime(temp_time, "%Y-%m-%d").date()))
	if strlist[1] == "":
		# date1 = today
		datelist.append("$today")
	elif strlist[1] == "？":
		# date1 = datetime.date(int(today.year), 12, 31)
		# datelist.append(str(datetime.date(int(today.year), 12, 31)))
		datelist.append("？")
	else:
		temp_time = str(today.year) + "-" + strlist[1]
		# date1 = datetime.datetime.strptime(temp_time, "%Y-%m-%d").date()
		datelist.append(
		    str(datetime.datetime.strptime(temp_time, "%Y-%m-%d").date()))

	# deltadate = date1 - date0
	# deltadate = cutstring(str(deltadate), " ", 1)
	# datelist.append(deltadate[0])
	return datelist


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
		temp_calcdate = CalcDeltaDays(linelist[i])
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


# 连接ftp
def ftpconnect(host, port, username, password):
	ftp = FTP()
	# 打开调试级别2，显示详细信息
	# ftp.set_debuglevel(2)
	ftp.connect(host, port)
	ftp.login(username, password)
	return ftp


# 从本地上传文件到ftp
def uploadfile(ftp, remotepath, localpath):
	bufsize = 1024
	fp = open(localpath, "rb")
	ftp.storbinary("STOR " + remotepath, fp, bufsize)
	ftp.set_debuglevel(0)
	print('%-14s' % "ftp done", end="")
	fp.close()


def main(argv):
	if argv[1] == '?' or argv == '？':
		print("无参数 生成并上传json\nargv[1] == a 上传全部文件\nargv[1] == t 只生成json")
		return 0
	else:
		readfile()
	if (argv[1] == 't'):
		return 0
	else:
		if len(argv) == 1:
			# 上传文件，第一个是要上传到ftp服务器路径下的文件，第二个是本地要上传的的路径文件
			ftp = ftpconnect("192.168.123.1", 21, "root", "26132613")
			uploadfile(ftp, "/mnt/sda1/src/a.json", ".\\html\\src\\a.json")
			print('%-30s' % "src/a.json")

		elif len(argv) == 2:
			if argv[1] == "a":
				a = localFileTree()
				treelist = a.print_tree("./html/")
				ftp = ftpconnect("192.168.123.1", 21, "root", "26132613")
				for i in range(len(treelist[0])):
					uploadfile(ftp, "/mnt/sda1" + treelist[0][i],
					           treelist[1][i])
					print(treelist[0][i])
		else:
			print("unuploaded")


if __name__ == "__main__":
	main(sys.argv)
