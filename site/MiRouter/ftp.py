from ftplib import FTP


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