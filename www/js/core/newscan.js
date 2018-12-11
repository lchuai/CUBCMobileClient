var newscan = {
	onmarked: function(type, result) {
		var text = '未知: ';
		switch(type) {
			case plus.barcode.QR:
				text = 'QR: '; // 二维码
				break;
			case plus.barcode.EAN13:
				text = 'EAN13: ';
				break;
			case plus.barcode.EAN8:
				text = 'EAN8: ';
				break;
		}
		console.log(result);
		var reg = new RegExp('"',"g");
        result = result.replace(reg, "");
		//console.log("result"+result);
		
		otherPurseAdress=result;		
		newscan.exitScan();		
	},
	scanPicture: function() {
		plus.gallery.pick(function(path) {
			plus.barcode.scan(path, newscan.onmarked, function(error) {
				plus.nativeUI.alert('无法识别此图片');
			});
		}, function(err) {
			console.log('Failed: ' + err.message);
		});
	},
	scaned: function(adress) {
		otherPurseAdress=adress;
	},
	exitScan: function() {
		scan.close();		
		mainView.router.refreshPreviousPage();
		setTimeout(function(){
			
			mainView.router.back({
			pageName: 'WalletPaymentplus', //页面的data-page值
		});
		},400)
		
	}

}