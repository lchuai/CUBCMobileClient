//邀请好友js

var InviteFriend = {
	login: function() { //登录
		var userName = $("#login_txt_phone").val().trim();
		var passWord = $("#login_txt_pwd").val().trim();

		if(userName == '') {
			sysUtil.commonUtil.alertMsg("手机号不能为空,请输入手机号!");
			return;
		}

		if(passWord == '') {
			sysUtil.commonUtil.alertMsg("密码不能为空,请输入手机号!");
			return;
		}
		var phoneType = "";
		var UUID = "";
		var IMEI = "";
		if(plus.os.name == "iOS") {
			UUID = plus.device.uuid;
			phoneType = "iOS";
		} else if(plus.os.name == "Android") {
			IMEI = plus.device.imei;
			phoneType = "Android";
		}
		//登录
		var DATA = new Object();
		DATA.UserName = userName;
		DATA.PassWord = passWord;
		DATA.LoginMethod = 1;
		DATA.phoneType = phoneType;
		DATA.imei = IMEI;
		DATA.UUID = UUID;
		sysUtil.ajaxTool.requestGetData("WebApiAccount", "UserLogin", METHOD_POST, DATA, function(data) {

			//sysUtil.commonUtil.alertMsg(data.returnMsg);
			layer.open({
				content: data.returnMsg,
				skin: 'msg',
				time: 2,
				end: function() {
					if(data.boolResult) {
						//填充登录后结果
						var returnData = data.returnData;

						sysUtil.storageUtil.saveUserData(returnData);
						sysUtil.storageUtil.saveStorageData('isLogin', true);

						//					myApp.getCurrentView().router.load({
						//						url: "index.html"
						//					});

						//						myApp.getCurrentView().back();
						//
						//						//mainView.router.back();
						//
						//						$$("#sys-toolbar").show('slow');
						//						myApp.showTab("#tabmy");
						//						SetToobarSelectStyle("mylink");
						//sysIndex.GetIndexData();//登录完成初始化首页数据
						//						sysIndex.Myreturn();
						mainView.router.back({
							pageName: 'index', //页面的data-page值
							force: true
						});
						$$("#sys-toolbar").show('slow');
						myApp.showTab("#tabmy");
						SetToobarSelectStyle("indexlink");
						//						sysIndex.GetIndexData();
					}
					if(data.boolResult == false) {
						if(data.returnData == "SMSValidation") {
//							mainView.router.load({
//								url: "pages/my/LoginVerification.html"
//							});
							myApp.getCurrentView().router.load({
								url: "pages/my/LoginVerification.html",
								animatePages:false
							});
						}
					}
				}
			});
		});
	},
	LoginVerificationCode: function() { //注册发短信
		var time = 60 * 1000;
		var setTime = function(ele) {
			if(time > 1000) {
				time = time - 1000;
				ele.innerText = "获取中" + (time / 1000) + "s";
				ele.setAttribute('disabled', true);
				setTimeout(function() {
					setTime(ele);
				}, 1000)
			} else {
				ele.innerText = "获取验证码";
				ele.removeAttribute('disabled');
				time = 60 * 1000;
			}
		}
		var registPhone = $("#loginVerification_txt_phone").val().trim();
		if(registPhone == '') {
			sysUtil.commonUtil.alertMsg("手机号不能为空,请输入手机号!");
			return;
		}

		//获取验证码
		var DATA = new Object();
		DATA.veriflyTypeID = BASE_VERIFLYTYPEBlogin;
		DATA.smsPhone = registPhone;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetSmsCodeData", METHOD_GET, DATA, function(data) {

			if(data.boolResult) {

				sysUtil.commonUtil.alertMsg("获取验证码成功,请录入注册!");

				//$("#hidRegistSmsCode").val(data.returnMsg);

				setTime(document.getElementById('btnloginVerificationCode'));
			} else {
				sysUtil.commonUtil.alertMsg("获取验证码失败,请稍后再试!");
				return;
			}
		});
	},
	VerificationSubmitLogin: function() { //注册按钮
		var userName = $("#loginVerification_txt_phone").val().trim();
		var loginCode = $("#txtloginVerificationCode").val().trim();

		if(userName == '') {
			sysUtil.commonUtil.alertMsg("手机号不能为空,请输入手机号!");
			return;
		}

		if(loginCode == '') {
			sysUtil.commonUtil.alertMsg("密码不能为空,请输入手机号!");
			return;
		}
		var phoneType = "";
		var UUID = "";
		var IMEI = "";
		if(plus.os.name == "iOS") {
			UUID = plus.device.uuid;
			phoneType = "iOS";
		} else if(plus.os.name == "Android") {
			IMEI = plus.device.imei;
			phoneType = "Android";
		}
		//登录
		var DATA = new Object();
		DATA.UserName = userName;
		DATA.loginCode = loginCode;
		DATA.LoginMethod = 1; //登录类型为 1（手机登录）
		DATA.phoneType = phoneType;
		DATA.imei = IMEI;
		DATA.UUID = UUID;
		sysUtil.ajaxTool.requestGetData("WebApiAccount", "VerificationUserLogin", METHOD_POST, DATA, function(data) {

			//sysUtil.commonUtil.alertMsg(data.returnMsg);
			layer.open({
				content: data.returnMsg,
				skin: 'msg',
				time: 1,
				end: function() {
					if(data.boolResult) {
						//填充登录后结果
						var returnData = data.returnData;

						sysUtil.storageUtil.saveUserData(returnData);
						sysUtil.storageUtil.saveStorageData('isLogin', true);

						//					myApp.getCurrentView().router.load({
						//						url: "index.html"
						//					});

						//						myApp.getCurrentView().back();
						//
						//						//mainView.router.back();
						//
						//						$$("#sys-toolbar").show('slow');
						//						myApp.showTab("#tabmy");
						//						SetToobarSelectStyle("mylink");
						//sysIndex.GetIndexData();//登录完成初始化首页数据
						//						sysIndex.Myreturn();
						mainView.router.back({
							pageName: 'index', //页面的data-page值
							force: true
						});
						$$("#sys-toolbar").show('slow');
						myApp.showTab("#tabmy");
						SetToobarSelectStyle("indexlink");
						//						sysIndex.GetIndexData();
					}
				}
			});
		});
	},
	registerCode: function() { //注册发短信
		var time = 60 * 1000;
		var setTime = function(ele) {
			if(time > 1000) {
				time = time - 1000;
				ele.innerText = "获取中" + (time / 1000) + "s";
				ele.setAttribute('disabled', true);
				setTimeout(function() {
					setTime(ele);
				}, 1000)
			} else {
				ele.innerText = "获取验证码";
				ele.removeAttribute('disabled');
				time = 60 * 1000;
			}
		}
		var registPhone = $("#txtRegistPhone").val().trim();

		if(registPhone == '') {
			sysUtil.commonUtil.alertMsg("手机号不能为空,请输入手机号!");
			return;
		}

		//获取验证码
		var DATA = new Object();
		DATA.veriflyTypeID = BASE_VERIFLYTYPEBREGIST;
		DATA.smsPhone = registPhone;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetSmsCodeData", METHOD_GET, DATA, function(data) {

			if(data.boolResult) {

				sysUtil.commonUtil.alertMsg("获取验证码成功,请录入注册!");

				//$("#hidRegistSmsCode").val(data.returnMsg);

				setTime(document.getElementById('btnRegistGetSmsCode'));
			} else {
				sysUtil.commonUtil.alertMsg("获取验证码失败,请稍后再试!");
				return;
			}
		});
	},
	registerSubmit: function() { //注册按钮
		var registPhone = $("#txtRegistPhone").val().trim();
		var registRegistPwd = $("#txtRegistPwd").val().trim();
		var registInvitationCode = $("#txtRegistInvitationCode").val().trim();
		var registSmsCode = $("#txtRegistSmsCode").val().trim();

		if(registPhone == '') {
			sysUtil.commonUtil.alertMsg("手机号不能为空,请输入手机号!");
			return;
		}

		if(registRegistPwd == '') {
			sysUtil.commonUtil.alertMsg("密码不能为空,请输入密码!");
			return;
		}

		if(registInvitationCode == '') {
			sysUtil.commonUtil.alertMsg("推荐码不能为空,请输入推荐码!");
			return;
		}

		if(registSmsCode == '') {
			sysUtil.commonUtil.alertMsg("验证码不能为空,如果未获取，请先点击获取验证码!");
			return;
		}

		//校验校验码是否有效
		var DATACHECK = new Object();
		DATACHECK.VeriflyTypeID = BASE_VERIFLYTYPEBREGIST;
		DATACHECK.VeriflyPhone = registPhone;
		DATACHECK.VeriflySmsCode = registSmsCode;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "CheckVerifySmsData", METHOD_GET, DATACHECK, function(data) {

			if(data.boolResult) {
				//校验成功进行注册

				var DATAREGIST = new Object();
				DATAREGIST.UserName = registPhone;
				DATAREGIST.PassWord = registRegistPwd;
				DATAREGIST.TrueName = '';
				DATAREGIST.IDCard = '';
				DATAREGIST.InviteUserId = 0;
				DATAREGIST.InviteType = 0;
				DATAREGIST.InvitationCode = registInvitationCode;
				DATAREGIST.RegionSource = BASE_APPREGIST;

				sysUtil.ajaxTool.requestGetData("WebApiAccount", "Registed", METHOD_POST, DATAREGIST, function(data) {

					sysUtil.commonUtil.alertMsg(data.returnMsg);
					if(data.boolResult) { //注册成功返回登录页面
						//							mainView.router.load({
						//								url: "pages/my/login.html"
						//							});

						//注册完成跳转到首页
						window.location.reload();
						return;

					} else {
						return;
					}
				});

			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
				return;
			}
		});
	},
	VerifyRealname: function() { //实名认证
		if(!sysUtil.storageUtil.hasLogin()) {
			sysUtil.commonUtil.alertMsg("未登录，请登录后再做实名认证!");
			return;
		}

		var TrueName = $("#txtVerifyRealNameTrueName").val().trim();
		var IdCard = $("#txtVerifyRealNameIdCard").val().trim();

		var Agreement = $("#cboxVerifyRealNameAgreement").is(':checked');

		if(TrueName == '') {
			sysUtil.commonUtil.alertMsg("姓名不能为空,请输入姓名!");
			return;
		}

		if(IdCard == '') {
			sysUtil.commonUtil.alertMsg("身份证号不能为空,请输入身份证号!");
			return;
		}

		if(!Agreement) {
			sysUtil.commonUtil.alertMsg("请选择同意承诺!");
			return;
		}

		//实名认证
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.TrueName = TrueName;
		DATA.IdCard = IdCard;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "VerifyIdCard", METHOD_GET, DATA, function(data) {

			layer.open({
				content: data.returnMsg,
				skin: 'msg',
				time: 1,
				end: function() {
					if(data.boolResult) {

						//					myApp.getCurrentView().router.load({
						//						url:"index.html"
						//					});
						sysIndex.GetUserInfoSetStatus();
						setTimeout(function() {
							myApp.getCurrentView().back();

							$$("#sys-toolbar").show('slow');
							myApp.showTab("#tabmy");
							SetToobarSelectStyle("mylink");
						}, 200);

					} else {
						return;
					}
				}
			})
		});
	},
	GetUserInvite: function(InviteType) { //获取邀请用户信息
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.InviteType = InviteType;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiInvitefriends", "GetUserInvite", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					var returnThisData = data.returnData;

					var UserInvite;
					if(InviteType == 1) {
						$("#BlockQRCode").attr('src', sysUtil.storageUtil.getUserData('Block1QRCode'));
						UserInvite = $("#UserInvite01");
					} else {
						$("#BlockQRCode").attr('src', sysUtil.storageUtil.getUserData('Block2QRCode'));
						UserInvite = $("#UserInvite02");
					}
					UserInvite.html("");
					for(var i = 0; i < returnThisData.ListInviteUser.length; i++) {
						var listhtml = "";
						var IsUserDPI = "未实名认证";
						if(returnThisData.ListInviteUser[i].IsUserDPI > 0) {
							IsUserDPI = "已实名认证";
						}
						listhtml += "<div class='index-content-fist-list same-style'>";
						listhtml += "<div class='index-content-fist-list-img'>";
						listhtml += '<img src="' + returnThisData.ListInviteUser[i].Gravatar + '"></div>';
						listhtml += "<div class='index-content-fist-list-word'>";
						listhtml += "<div class='index-content-fist-list-name'>";
						listhtml += returnThisData.ListInviteUser[i].UserPhone;
						listhtml += "<span class='index-content-fist-list-time'>" + returnThisData.ListInviteUser[i].RegisterTime + "</span>";
						listhtml += "</div>";
						if(returnThisData.ListInviteUser[i].IsUserDPI > 0) {
							listhtml += "<div class='index-content-fist-list-vertify'>";
							listhtml += "<img src='img/index/nameLogo.png' />";
							listhtml += "<span>" + IsUserDPI + "</span>";
							listhtml += "</div>";
						} else {
							listhtml += "<div class='index-content-fist-list-vertify noVerify'>";
							listhtml += "<img src='img/index/nameLogoNO.png' />";
							listhtml += "<span>" + IsUserDPI + "</span>";
							listhtml += "</div>";
						}

						listhtml += "</div>";
						listhtml += "</div>";
						UserInvite.append(listhtml);
					}
					$("#Performance").html(returnThisData.Performance)
				}
			});
		}, 500)
	},
	Getnvitecopy: function(ele, InviteType) { //获取邀请码数据,linkType为操作类型，1为文字邀请，2为链接邀请

		var Copytext = '邀请码：';
		if(InviteType == 1) {
			Copytext += sysUtil.storageUtil.getUserData('InvitationCode1');
		} else {
			Copytext += sysUtil.storageUtil.getUserData('InvitationCode2');
		}

		if(plus.os.name == "Android") {
			var Context = plus.android.importClass("android.content.Context");
			var main = plus.android.runtimeMainActivity();
			var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
			plus.android.invoke(clip, "setText", Copytext);
		} else {
			var UIPasteboard = plus.ios.importClass("UIPasteboard");
			//这步会有异常因为UIPasteboard是不允许init的，init的问题会在新版中修改 
			var generalPasteboard = UIPasteboard.generalPasteboard();
			// 设置/获取文本内容: www.bcty365.com
			generalPasteboard.setValueforPasteboardType("testValue", Copytext);
		}
		sysUtil.commonUtil.alertMsg("复制成功!" + Copytext);
	},
	binding: function() { //绑定手机号
		if(!sysUtil.storageUtil.hasLogin()) {
			sysUtil.commonUtil.alertMsg("未登录，请登录后再做实名认证!");
			return;
		}

		var oldPhone = $("#txtOldPhone").val().trim();

		if(oldPhone == '') {
			sysUtil.commonUtil.alertMsg("原手机号不能为空,请输入手机号!");
			return;
		}

		//校验原手机号
		var DATA = new Object();

		DATA.PhoneVeriflyUserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.PhoneVeriflyPhone = oldPhone;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "CheckBandingPhone", METHOD_GET, DATA, function(data) {

			layer.open({
				content: data.returnMsg,
				skin: 'msg',
				time: 1,
				end: function() {
					if(data.boolResult) {
						//填充登录后结果
						//var returnData = data.returnData;

						myApp.getCurrentView().router.load({
							url: "pages/my/bindingNext.html"
						});
					} else {
						return;
					}
				}

			});

		});
	},
	bindingiphone: function() { //获取验证码按钮事件
		var time = 60 * 1000;
		var setTime = function(ele) {
			if(time > 1000) {
				time = time - 1000;
				ele.innerText = "获取中" + (time / 1000) + "s";
				ele.setAttribute('disabled', true);
				setTimeout(function() {
					setTime(ele);
				}, 1000)
			} else {
				ele.innerText = "获取验证码";
				ele.removeAttribute('disabled');
				time = 60 * 1000;
			}
		}
		if(!sysUtil.storageUtil.hasLogin()) {
			sysUtil.commonUtil.alertMsg("未登录，请登录后再做绑定新手机号!");
			return;
		}

		var newPhone = $("#txtNewPhone").val().trim();

		if(newPhone == '') {
			sysUtil.commonUtil.alertMsg("新手机号不能为空,请输入手机号!");
			return;
		}

		//获取验证码
		var DATA = new Object();
		DATA.veriflyTypeID = BASE_VERIFLYTYPEBBAIND;
		DATA.smsPhone = newPhone;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetSmsCodeData", METHOD_GET, DATA, function(data) {

			if(data.boolResult) {

				sysUtil.commonUtil.alertMsg("获取验证码成功,请录入使用!");

				//填充登录后结果
				var returnData = data.returnData;

				$("#hidSmsCode").val(data.returnMsg);

				setTime(document.getElementById('btnGetSmsCode'));
			} else {
				sysUtil.commonUtil.alertMsg("获取验证码失败,请稍后再试!");
				return;
			}
		});
	},
	btnBindNextSubmit: function() { //绑定手机号确定按钮事件
		if(!sysUtil.storageUtil.hasLogin()) {
			sysUtil.commonUtil.alertMsg("未登录，请登录后再做实名认证!");
			return;
		}

		var newPhone = $("#txtNewPhone").val().trim();

		var smsCode = $("#txtSmsCode").val().trim();

		if(newPhone == '') {
			sysUtil.commonUtil.alertMsg("新手机号不能为空,请输入手机号!");
			return;
		}

		if(smsCode == '') {
			sysUtil.commonUtil.alertMsg("验证码不能为空,如果未获取，请先点击获取验证码!");
			return;
		}

		if($("#hidSmsCode").val() != smsCode) {
			sysUtil.commonUtil.alertMsg("验证码错误，请重新获取!");
			return;
		}

		//校验校验码是否有效
		var DATACHECK = new Object();
		DATACHECK.VeriflyTypeID = BASE_VERIFLYTYPEBBAIND;
		DATACHECK.VeriflyPhone = newPhone;
		DATACHECK.VeriflySmsCode = smsCode;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "CheckVerifySmsData", METHOD_GET, DATACHECK, function(data) {

			if(data.boolResult) {
				//校验成功进行绑定

				var DATABANDING = new Object();
				DATA.Token = sysUtil.storageUtil.getUserData("Token");
				DATABANDING.BindingPhoneUserID = sysUtil.storageUtil.getUserData("UserID");
				DATABANDING.BindingPhone = newPhone;

				sysUtil.ajaxTool.requestGetData("WebApiAccount", "BandingPhoneData", METHOD_GET, DATABANDING, function(data) {

					sysUtil.commonUtil.alertMsg(data.returnMsg);
					if(data.boolResult) { //绑定成功返回到我的页面
						sysIndex.Myreturn();
					} else {
						return;
					}
				});

			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
				return;
			}
		});
	},
	btnResetPwdNext: function() { //重置登录密码页面
		if(!sysUtil.storageUtil.hasLogin()) {
			sysUtil.commonUtil.alertMsg("未登录，请登录后再做实名认证!");
			return;
		}

		var oldPwd = $("#txtOldPwd").val().trim();

		if(oldPwd == '') {
			sysUtil.commonUtil.alertMsg("原密码不能为空,请输入原登录密码!");
			return;
		}

		//校验原登录密码
		var DATA = new Object();
		DATA.SetloginUserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.SetOldLoginType = BASE_LOGINTYPEMOBILE;
		DATA.SetOldPwd = oldPwd;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "OldPasswordCheckData", METHOD_GET, DATA, function(data) {

			sysUtil.commonUtil.alertMsg(data.returnMsg);

			if(data.boolResult) {
				//跳转到下一页重置密码页面
				myApp.getCurrentView().router.load({
					url: "pages/my/ResetPasswordNext.html"
				});
			} else {
				return;
			}
		});
	},
	btnConfirmPwd: function() { //重置登录密码设置页面
		if(!sysUtil.storageUtil.hasLogin()) {
			sysUtil.commonUtil.alertMsg("未登录，请登录后再做实名认证!");
			return;
		}

		var newPwd = $("#txtNewPwd").val().trim();

		var confirmPwd = $("#txtConfirmPwd").val().trim();

		if(newPwd == '') {
			sysUtil.commonUtil.alertMsg("新密码不能为空,请输入新登录密码!");
			return;
		}

		if(confirmPwd == '') {
			sysUtil.commonUtil.alertMsg("确认密码不能为空,请输入新确认密码!");
			return;
		}

		if(newPwd != confirmPwd) {
			sysUtil.commonUtil.alertMsg("两次密码不一至,请重新输入!");
			return;
		}

		//校验原登录密码
		var DATA = new Object();
		DATA.UserLoginUserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.SetNewLoginPwd = confirmPwd;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "SettingLoginPasswordData", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				//跳转到首页我的界面
				sysUtil.commonUtil.alertMsg(data.returnMsg);
				sysIndex.Myreturn();
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}
		});
	},
	btnForgetSmsCode: function() { //忘记密码验证码按钮事件
		var time = 60 * 1000;
		var setTime = function(ele) {
			if(time > 1000) {
				time = time - 1000;
				ele.innerText = "获取中" + (time / 1000) + "s";
				ele.setAttribute('disabled', true);
				setTimeout(function() {
					setTime(ele);
				}, 1000)
			} else {
				ele.innerText = "获取验证码";
				ele.removeAttribute('disabled');
				time = 60 * 1000;
			}
		}
		var forgetPhone = $("#txtForgetPhone").val().trim();

		if(forgetPhone == '') {
			sysUtil.commonUtil.alertMsg("手机号不能为空,请输入手机号!");
			return;
		}

		//获取验证码
		var DATA = new Object();
		DATA.veriflyTypeID = BASE_VERIFLYTYPEBFORGET;
		DATA.smsPhone = forgetPhone;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetSmsCodeData", METHOD_GET, DATA, function(data) {

			if(data.boolResult) {

				sysUtil.commonUtil.alertMsg("获取验证码成功,请录入找回密码!");

				//$("#hidRegistSmsCode").val(data.returnMsg);

				setTime(document.getElementById('btnForgetSmsCode'));
			} else {
				sysUtil.commonUtil.alertMsg("获取验证码失败,请稍后再试!");
				return;
			}
		});
	},
	btnForgetPwdNext: function() { //校验验证码和手机号是否在系统里存在
		var forgetPhone = $("#txtForgetPhone").val().trim();

		var forgetPwdSmsCode = $("#txForgetPwdSmsCode").val().trim();

		if(forgetPhone == '') {
			sysUtil.commonUtil.alertMsg("手机号不能为空,请输入手机号码!");
			return;
		}

		if(forgetPwdSmsCode == '') {
			sysUtil.commonUtil.alertMsg("验证码不能为空,请输入或者重新获取!");
			return;
		}

		//校验验证码和手机号是否在系统里存在
		var DATACHECK = new Object();
		DATACHECK.VeriflyTypeID = BASE_VERIFLYTYPEBFORGET;
		DATACHECK.VeriflyPhone = forgetPhone;
		DATACHECK.VeriflySmsCode = forgetPwdSmsCode;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "CheckVerifySmsData", METHOD_GET, DATACHECK, function(data) {

			if(data.boolResult) {
				//校验成功跳转到下一个页

				myApp.getCurrentView().router.load({
					url: "pages/my/ForgetPasswordNext.html?userPhone=" + forgetPhone
				});
				//				mainView.router.load({
				//					pageName: 'login'
				//				})
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
				return;
			}
		});
	},
	ForgetPasswordNext: function(userForgetPhone) { //忘记登录密码设置页面
		var newPwd = $("#txtForgetPwdNewPwd").val().trim();

		var confirmPwd = $("#txtForgetPwdConfirmPwd").val().trim();

		if(newPwd == '') {
			sysUtil.commonUtil.alertMsg("新密码不能为空,请输入新登录密码!");
			return;
		}

		if(confirmPwd == '') {
			sysUtil.commonUtil.alertMsg("确认密码不能为空,请输入新确认密码!");
			return;
		}

		if(newPwd != confirmPwd) {
			sysUtil.commonUtil.alertMsg("两次密码不一至,请重新输入!");
			return;
		}

		//校验原登录密码
		var DATA = new Object();
		DATA.UserForgetPhone = userForgetPhone;
		DATA.SetNewLoginPwd = confirmPwd;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "SettingForgetPasswordData", METHOD_GET, DATA, function(data) {

			//			sysUtil.commonUtil.alertMsg(data.returnMsg);
			layer.open({
				content: data.returnMsg,
				skin: 'msg',
				time: 1,
				end: function() {
					if(data.boolResult) {
						//跳转到登录页面
						$$("#sys-toolbar").hide('slow');
						mainView.router.back({
							pageName: 'login',
							force: true
						});
						//						myApp.getCurrentView().router.load({
						//							url: "pages/my/login.html"
						//						});
						mainView.router.reloadPreviousPage({
							pageName: 'login'
						})
					} else {
						return;
					}
				}
			});

		});
	},
	payment: function() { //收付款设置	
		//判断是否绑定银行卡
		if(sysUtil.storageUtil.getUserData('IsSetBankCard') == "true") {
			$("#setBankCard").html("已设置");
			$("#setBankCard").removeClass("personel-list-item-clear").addClass("personel-list-item-after");
		} else {
			$("#setBankCard").removeClass("personel-list-item-after").addClass("personel-list-item-clear");
		}
		//判断是否绑定支付宝
		//alert("支付宝"+sysUtil.storageUtil.getUserData('IsSetAlipay') );
		if(sysUtil.storageUtil.getUserData('IsSetAlipay') == "true") {

			$("#setAlipay").html("已设置");
			$("#setAlipay").removeClass("personel-list-item-clear").addClass("personel-list-item-after");
		} else {
			$("#setAlipay").removeClass("personel-list-item-after").addClass("personel-list-item-clear");
		}
		//判断是否绑定微信
		if(sysUtil.storageUtil.getUserData('IsSetWeChart') == "true") {
			$("#setWeChat").html("已设置");
			$("#setWeChat").removeClass("personel-list-item-clear").addClass("personel-list-item-after");
		} else {
			$("#setWeChat").removeClass("personel-list-item-after").addClass("personel-list-item-clear");
		}
	},
	mymodify: function() { //修改资金密码判断有没有设置过
		if(sysUtil.storageUtil.getUserData('IsSetDealPwd') == "true") {
			$("#Fundpasswordset").html("修改资金密码");
			$("#myNewfundPassword").html("新资金密码");
			$("#OriginalFundpassword").css("display", "block");
		} else {
			$("#Fundpasswordset").html("设置资金密码");
			$("#OriginalFundpassword").css("display", "none");
		}
	},
	modify: function() { //修改资金密码
		var mygetUserData = sysUtil.storageUtil.getUserData("UserID");
		var OriginalFundpassword = $("#OriginalFundinput").val().trim();
		var modifyFundPassword = $("#modifyFundPasswordinput").val().trim();
		var entermodifyFundPassword = $("#entermodifyFundPasswordinput").val().trim();
		var modifyverifiCationcode = $("#modifyverifiCationcodeinput").val().trim();
		if(sysUtil.storageUtil.getUserData('IsSetDealPwd') == "true") {
			if(OriginalFundpassword == '') {
				sysUtil.commonUtil.alertMsg("原始资金密码不能为空!");
				return;
			} else if(modifyFundPassword == '') {
				sysUtil.commonUtil.alertMsg("资金密码不能为空!");
				return;
			} else if(modifyFundPassword.length < 6) {
				sysUtil.commonUtil.alertMsg("密码长度不能少于6位!");
				return;
			} else if(entermodifyFundPassword == '') {
				sysUtil.commonUtil.alertMsg("二次密码不能为空!");
				return;
			} else if(modifyFundPassword != entermodifyFundPassword) {
				sysUtil.commonUtil.alertMsg("二次密码不一致!");
				return;
			} else if(modifyverifiCationcode == '') {
				sysUtil.commonUtil.alertMsg("请输入短信验证码!");
				return;
			} else {
				var DATACHECK = new Object();
				DATACHECK.Token = sysUtil.storageUtil.getUserData("Token");
				DATACHECK.UserID = mygetUserData;
				DATACHECK.BeforeFundCode = OriginalFundpassword;
				DATACHECK.CurrentFundCodeOne = modifyFundPassword;
				DATACHECK.CurrentFundCodeTwo = entermodifyFundPassword;
				DATACHECK.veriflySmsCode = modifyverifiCationcode;

				sysUtil.ajaxTool.requestGetData("WebApiAccount", "SetFundCode", METHOD_GET, DATACHECK, function(data) {
					if(data.boolResult) {
						//校验成功跳转到下一个页
						sysIndex.GetUserInfoSetStatus();
						sysUtil.commonUtil.alertMsg(data.returnMsg);
						sysIndex.Myreturn();
						return;
					} else {
						sysUtil.commonUtil.alertMsg(data.returnMsg);
						return;
					}
				});
			}

		} else {
			if(modifyFundPassword == '') {
				sysUtil.commonUtil.alertMsg("资金密码不能为空!");
				return;
			} else if(modifyFundPassword.length < 6) {
				sysUtil.commonUtil.alertMsg("密码长度不能少于6位!");
				return;
			} else if(entermodifyFundPassword == '') {
				sysUtil.commonUtil.alertMsg("二次密码不能为空!");
				return;
			} else if(modifyFundPassword != entermodifyFundPassword) {
				sysUtil.commonUtil.alertMsg("二次密码不一致!");
				return;
			} else if(modifyverifiCationcode == '') {
				sysUtil.commonUtil.alertMsg("请输入短信验证码!");
				return;
			} else {
				var DATACHECK = new Object();
				DATACHECK.UserID = mygetUserData;
				DATACHECK.Token = sysUtil.storageUtil.getUserData("Token");
				DATACHECK.BeforeFundCode = OriginalFundpassword;
				DATACHECK.CurrentFundCodeOne = modifyFundPassword;
				DATACHECK.CurrentFundCodeTwo = entermodifyFundPassword;
				DATACHECK.veriflySmsCode = modifyverifiCationcode;

				sysUtil.ajaxTool.requestGetData("WebApiAccount", "SetFundCode", METHOD_GET, DATACHECK, function(data) {
					if(data.boolResult) {
						//校验成功跳转到下一个页
						sysIndex.GetUserInfoSetStatus();
						sysUtil.commonUtil.alertMsg(data.returnMsg);
						sysIndex.Myreturn();
						return;
					} else {
						sysUtil.commonUtil.alertMsg(data.returnMsg);
						return;
					}
				});
			}
		}
	},
	bankCard: function() { //设置银行卡
		if(sysUtil.storageUtil.getUserData('IsSetBankCard') == "true") {
			$("#bankCard_callback").html("修改实名银行卡");
			$("#banCard_confirm").html("修改");
			var mygetUserData = sysUtil.storageUtil.getUserData("UserID");

			var DATACHECK = new Object();
			DATACHECK.Token = sysUtil.storageUtil.getUserData("Token");
			DATACHECK.UserID = mygetUserData;

			sysUtil.ajaxTool.requestGetData("WebApiAccount", "GetBankCard", METHOD_GET, DATACHECK, function(data) {
				if(data.boolResult) {
					//校验成功跳转到下一个页
					$("#banCard_names").val(data.returnData.FullName);
					$("#banCard_numbers").val(data.returnData.CardCode);
					$("#banCard_Banks").val(data.returnData.OpenBank);
					$("#banCard_Branchs").val(data.returnData.OpeningBranch);

				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					return;
				}
			});
		}
	},
	bankCardClick: function() { //确定按钮事件
		var mygetUserData = sysUtil.storageUtil.getUserData("UserID");
		var myName = $("#banCard_names").val().trim();
		var myNumber = $("#banCard_numbers").val().trim();
		var myBank = $("#banCard_Banks").val().trim();
		var myBranch = $("#banCard_Branchs").val().trim();
		var mySMS = $("#banCard_SMS").val().trim();
		var re = /^[0-9]+.?[0-9]*$/;
		if(myName == '') {
			sysUtil.commonUtil.alertMsg("请输入姓名!");
			return;
		} else if(myNumber == '') {
			sysUtil.commonUtil.alertMsg("请输入银行卡号!");
			return;
		} else if(!re.test(myNumber)) {
			sysUtil.commonUtil.alertMsg("银行卡号格式错误!");
			return;
		} else if(myBank == '') {
			sysUtil.commonUtil.alertMsg("请输入开户行!");
			return;
		} else if(myBranch == '') {
			sysUtil.commonUtil.alertMsg("请输入开户支行!");
			return;
		} else if(banCard_SMS == '') {
			sysUtil.commonUtil.alertMsg("请输入短信验证码!");
			return;
		} else {
			var DATACHECK = new Object();
			DATACHECK.UserID = mygetUserData;
			DATACHECK.Token = sysUtil.storageUtil.getUserData("Token");
			DATACHECK.FullName = myName;
			DATACHECK.CardCode = myNumber;
			DATACHECK.OpenBank = myBank;
			DATACHECK.veriflySmsCode = mySMS;
			DATACHECK.OpeningBranch = myBranch;

			sysUtil.ajaxTool.requestGetData("WebApiAccount", "SetBankCard", METHOD_GET, DATACHECK, function(data) {
				if(data.boolResult) {
					//校验成功跳转到下一个页
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					//						sysIndex.backMy();
					sysUtil.storageUtil.saveStorageData('IsSetBankCard', true);

					$("#setBankCard").html("已设置");
					$("#setBankCard").removeClass("personel-list-item-clear").addClass("personel-list-item-after");

					//												myApp.getCurrentView().router.load({
					//													url:"pages/my/payment.html"
					//												});
					//sysIndex.backMy();
					myApp.getCurrentView().back();
					return;
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					return;
				}
			});
		}
	}
}