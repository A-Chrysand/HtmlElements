function GBFheight(offset, targetId, absoluteNum) {
	if (offset == undefined) {
		offset = 0;
	}
	if (absoluteNum != undefined) {
		$("#" + targetId, window.parent.document).css('height', (absoluteNum + offset) + 'px');
		return;
	}
	var height = (document.body.clientHeight) + offset + 10 + 'px';
	$("#" + targetId, window.parent.document).css('height', height);
}
