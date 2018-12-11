var Alipay = {
	sendAlipayCode: function() { //发送短信验证码方法
		var obj = $("#AlipaySmsCode");
		sysIndex.settime(obj);
		var myveriflyTypeID = BASE_VERIFLYTYPEBAlipay;//绑定支付宝校验类型
		var verificationCode = sysUtil.storageUtil.getUserData('Phone');
		var DATACHECK = new Object();
		DATACHECK.veriflyTypeID = myveriflyTypeID;
		DATACHECK.smsPhone = verificationCode;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetSmsCodeData", METHOD_GET, DATACHECK, function(data) {
			if(data.boolResult) {
				//校验成功跳转到下一个页
				sysUtil.commonUtil.alertMsg('发送成功');
				return;
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
				return;
			}
		});

	},
	sendQRcode: function() { //从相册选择
		var self = this;
		plus.gallery.pick(function(p) {
			self.SetLoadHeadImg(p); /*设置图片*/
		}, function(e) {
			console.log("取消选择图片");
		}, {
			filter: "image",
			multiple: false
		});
	},
	SetLoadHeadImg: function(imgPath) {
		var self = this;
		var image = new Image();
		image.src = imgPath;

		AlipayImg.src = imgPath;
		AlipayImg.style.width = "6.5rem";
		AlipayImg.style.height = "6.5rem";
		AlipayImg.style.position = "absolute";
		AlipayImg.style.top = "0%";
		AlipayImg.style.left = "0%";

		//装载图片数据
		image.onload = function() {
			$("#hidAlipayImg").val(sysUtil.commonUtil.getBase64Image(image));
			//self.Alipaying();
		}
	},
	//绑定支付宝
	Alipaying: function() {

		var NickName = $("#NickName").val().trim();
		var UserName = $("#UserName").val().trim();
		var veriflySmsCode = $("#veriflySmsCode").val().trim();
		var QrCode = $("#hidAlipayImg").val().trim();
		if(NickName == '') {
			sysUtil.commonUtil.alertMsg("真实姓名不能为空，请输入真实姓名！");
			return;
		}
		if(UserName == '') {
			sysUtil.commonUtil.alertMsg("支付宝账号不能为空，请输入支付宝账号！");
			return;
		}
		if(veriflySmsCode == '') {
			sysUtil.commonUtil.alertMsg("短信验证码不能为空，请输入短信验证码！");
			return;
		}
		if(QrCode == '') {
			sysUtil.commonUtil.alertMsg("支付宝收款码不能为空，请选择支付宝收款码！");
			return;
		}
		//提交参数到后台
		var DATA = new Object();
		DATA.Token = sysUtil.storageUtil.getUserData("Token");
		DATA.UserId = sysUtil.storageUtil.getUserData("UserID");		
		DATA.NickName = NickName;
		DATA.UserName = UserName;
		DATA.veriflySmsCode = veriflySmsCode;
		DATA.QrCode = QrCode;
		sysUtil.ajaxTool.requestGetData("WebApiAccount", "SetPayAlis", METHOD_POST, DATA, function(data) {
			layer.open({
				content: data.returnMsg,
				skin: 'msg',
				time: 1,
				end: function() {
					if(data.boolResult) {
						//							sysIndex.backMy();
						sysUtil.storageUtil.saveStorageData('IsSetAlipay', true);

						$("#setAlipay").html("已设置");
						$("#setAlipay").removeClass("personel-list-item-clear").addClass("personel-list-item-after");

						//												myApp.getCurrentView().router.load({
						//													url:"pages/my/payment.html"
						//												});
						myApp.getCurrentView().back();
						//mainView.router.back();
						//							$$("#sys-toolbar").show('slow');
						//							myApp.showTab("#tabmy");
						//							SetToobarSelectStyle("mylink");

					} else {
						return;
					}
				}
			})
		});

	},
	//微信页面
	sendWeChatCode: function() { //发送短信验证码方法
		var obj = $("#weChatCode");
		sysIndex.settime(obj);
		var myveriflyTypeID = BASE_VERIFLYTYPEBWeChat;
		var verificationCode = sysUtil.storageUtil.getUserData('Phone');
		var DATACHECK = new Object();
		DATACHECK.veriflyTypeID = myveriflyTypeID;
		DATACHECK.smsPhone = verificationCode;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetSmsCodeData", METHOD_GET, DATACHECK, function(data) {
			if(data.boolResult) {
				//校验成功跳转到下一个页
				sysUtil.commonUtil.alertMsg('发送成功');
				return;
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
				return;
			}
		});

	},
	sendweChatQRcode: function() { //从相册选择
		var self = this;
		plus.gallery.pick(function(p) {
			self.SetLoadWeChatImg(p); /*设置图片*/
		}, function(e) {
			console.log("取消选择图片");
		}, {
			filter: "image",
			multiple: false
		});
	},
	SetLoadWeChatImg: function(imgPath) {
		var self = this;
		var image = new Image();
		image.src = imgPath;

		WeChatSRCode.src = imgPath;
		WeChatSRCode.style.width = "6.5rem";
		WeChatSRCode.style.height = "6.5rem";
		WeChatSRCode.style.position = "absolute";
		WeChatSRCode.style.top = "0%";
		WeChatSRCode.style.left = "0%";

		//装载图片数据
		image.onload = function() {
			$("#hidWeChatImg").val(sysUtil.commonUtil.getBase64Image(image));
			//			self.SubWeChatData();
		}
	},
	//绑定微信
	SubWeChatData: function() {
		var NickName = $("#NickName").val().trim();
		var UserName = $("#UserName").val().trim();
		var weChatSmsCode = $("#WeChatSmsCode").val().trim();
		var QrCode = $("#hidWeChatImg").val().trim();
		if(NickName == '') {
			sysUtil.commonUtil.alertMsg("微信昵称不能为空，请输入微信昵称！");
			return;
		}
		if(UserName == '') {
			sysUtil.commonUtil.alertMsg("微信账号不能为空，请输入微信账号！");
			return;
		}
		if(weChatSmsCode == '') {
			sysUtil.commonUtil.alertMsg("短信验证码不能为空，请输入短信验证码！");
			return;
		}
		if(QrCode == '') {
			sysUtil.commonUtil.alertMsg("微信收款码不能为空，请选择微信收款码！");
			return;
		}
		//提交参数到后台
		var DATA = new Object();
		DATA.UserId = sysUtil.storageUtil.getUserData("UserID");
		DATA.Token = sysUtil.storageUtil.getUserData("Token");
		DATA.NickName = NickName;
		DATA.UserName = UserName;
		DATA.veriflySmsCode = weChatSmsCode;
		DATA.QrCode = QrCode;
		sysUtil.ajaxTool.requestGetData("WebApiAccount", "SetPayWeCharts", METHOD_POST, DATA, function(data) {
			layer.open({
				content: data.returnMsg,
				skin: 'msg',
				time: 1,
				end: function() {
					if(data.boolResult) {
//						sysUtil.storageUtil.saveStorageData('IsSetWeChart', true);
						sysUtil.storageUtil.saveStorageData('IsSetWeChart', true);

						$("#setWeChat").html("已设置");
						$("#setWeChat").removeClass("personel-list-item-clear").addClass("personel-list-item-after");

						//												myApp.getCurrentView().router.load({
						//													url:"pages/my/payment.html"
						//												});
						//sysIndex.backMy();
						myApp.getCurrentView().back();
						//mainView.router.back();
						//							$$("#sys-toolbar").show('slow');
						//							myApp.showTab("#tabmy");
						//							SetToobarSelectStyle("mylink");

					} else {
						return;
					}
				}
			})
		});
	},

	//获取支付宝绑定信息
	GetAlipayData: function() {
		var DATA = new Object();
		DATA.UserId = sysUtil.storageUtil.getUserData("UserID");
		DATA.Token = sysUtil.storageUtil.getUserData("Token");
		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetPayAlis", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				$("#hideAlipayId").val(data.returnData.AliPayID);
				$("#NickName").val(data.returnData.AliPayFullName);
				$("#UserName").val(data.returnData.AliPayUserName);
				var AlipayImgStyle = $("#AlipayImg").attr("src", BASIC_HOST_URL + data.returnData.AliPayQrCode);
				AlipayImgStyle.css("width", "6.5rem");
				AlipayImgStyle.css("height", "6.5rem");
				AlipayImgStyle.css("position", "absolute");
				AlipayImgStyle.css("top", "0%");
				AlipayImgStyle.css("left", "0%");
			}
		});
	},
	//获取微信绑定信息方法
	GetWeChatData: function() {
		var DATA = new Object();
		DATA.UserId = sysUtil.storageUtil.getUserData("UserID");
		DATA.Token = sysUtil.storageUtil.getUserData("Token");
		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetPayWeCharts", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				$("#hidWeChatId").val(data.returnData.WeChartPayID)
				$("#NickName").val(data.returnData.WeChartNickName);
				$("#UserName").val(data.returnData.WeChartUserName);
				var WeChatSRCodeStyle = $("#WeChatSRCode").attr("src", BASIC_HOST_URL + data.returnData.WeChartQrCode);
				WeChatSRCodeStyle.css("width", "6.5rem");
				WeChatSRCodeStyle.css("height", "6.5rem");
				WeChatSRCodeStyle.css("position", "absolute");
				WeChatSRCodeStyle.css("top", "0%");
				WeChatSRCodeStyle.css("left", "0%");
			}
		});
	},
}