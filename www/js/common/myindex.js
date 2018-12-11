//我的页面js

var sysMy = {
	CheckType: 0,
	exit: function() { //退出登录
		//	alert("nnnn");
		layer.open({
			content: '确认退出?',
			closeBtn: false,
			shift: 2,
			shadeClose: true,
			btn: ['确定', '取消'],
			yes: function(index) {
				if(sysUtil.storageUtil.hasLogin())
				{
					//退出登录
					var DATA = new Object();
					DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
	
					sysUtil.ajaxTool.requestGetData("WebApiAccount", "LogOut", METHOD_POST, DATA, function(data) {
	
						sysUtil.commonUtil.alertMsg(data.returnMsg);
	
						if(data.boolResult) {
	
							sysUtil.storageUtil.clearData();
							sysUtil.storageUtil.saveStorageData('isLogin', false);
							
							window.location.reload();
							return;
	
	//						myApp.getCurrentView().router.load({//app-views-page load-push back-pull history
	//							url: "index.html"
	//						});
							
							//mainView.router.back();
	
	//						$$("#sys-toolbar").show('slow');
	//						myApp.showTab("#tabhome");
	//						SetToobarSelectStyle("indexlink");
	//						sysIndex.GetIndexData();
						}
					});
				}
				else
				{
					sysUtil.storageUtil.clearData();
					sysUtil.storageUtil.saveStorageData('isLogin', false);
					
					window.location.reload();
					return;
				}
			}
		});
	},
	InviteCopy: function(ele, linkType) { //linkType为操作类型，1为文字邀请，2为链接邀请
		var Invitation = BASIC_HOST_URL + '/MobileWeb/UserRegister?InviteUserId=' + sysUtil.storageUtil.getUserData("UserID") + '&InviteType=' + linkType;
		var code = 'CUBC全球数字财富计划已启动，快来注册领取吧！' + Invitation;

		if(plus.os.name == "Android") {
			var Context = plus.android.importClass("android.content.Context");
			var main = plus.android.runtimeMainActivity();
			var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
			plus.android.invoke(clip, "setText", code);
		} else {
			var UIPasteboard = plus.ios.importClass("UIPasteboard");
			//这步会有异常因为UIPasteboard是不允许init的，init的问题会在新版中修改 
			var generalPasteboard = UIPasteboard.generalPasteboard();
			// 设置/获取文本内容: www.bcty365.com
			generalPasteboard.setValueforPasteboardType("testValue", Invitation);
		}

		sysUtil.commonUtil.alertMsg("请粘贴到聊天通讯工具分享给好友！" + code);
	},
	SaveUserNickName: function() {
		var userNick = $("#txtNick").val().trim();

		$("#btnSaveUserNick").attr("disabled", true);
		if(userNick == '') {
			$("#btnSaveUserNick").attr("disabled", false);
			sysUtil.commonUtil.alertMsg("请输入用户昵称");
			return;
		}

		//控制昵称长度
		if(userNick.length > BASE_NICKLENGTH) {
			$("#btnSaveUserNick").attr("disabled", false);
			sysUtil.commonUtil.alertMsg("用户昵称不能超过7个字符");
			return;
		}

		//修改用户昵称
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.UserNick = userNick;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "UpdateUserNick", METHOD_GET, DATA, function(data) {

			sysUtil.commonUtil.alertMsg(data.returnMsg);

			if(data.boolResult) {

				//改上一个页面的nick text
				$("#divPersonelUserNick").text(userNick);
				$("#divIndexUserNick").text(userNick);
				myApp.getCurrentView().router.back();
			} else {
				$("#btnSaveUserNick").attr("disabled", false);
				sysUtil.commonUtil.alertMsg("修改昵称出错");
				return;
			}
		});
	},
	UpdateUserGravatar: function() {
		var self = this;
		//this.hello(); //success 调用hello()
		var a = [{
			title: "拍照"
		}, {
			title: "从手机相册选择"
		}];

		plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: a
		}, function(b) { /*actionSheet 按钮点击事件*/
			switch(b.index) {
				case 0:
					break;
				case 1:
					self.getImage(); /*拍照*/
					break;
				case 2:
					self.galleryImg(); /*打开相册*/
					break;
				default:
					break;
			}
		});
	},
	getImage: function() { //点击拍摄使用照相机的方法
		var self = this;
		var cmr = plus.camera.getCamera();
		cmr.captureImage(function(p) {
			plus.io.resolveLocalFileSystemURL(p, function(entry) {
				var localurl = entry.toLocalURL(); //
				self.SetLoadHeadImg(localurl); /*设置图片*/
			});
			self.CheckType = 1;
		}, function(s) {
			console.log("error" + s);
		});
	},
	galleryImg: function() { //从相机选择
		var self = this;
		plus.gallery.pick(function(p) {
			self.SetLoadHeadImg(p); /*设置图片*/
			self.CheckType = 2;
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

		imgGravatarImg.src = imgPath;
		imgGravatarImg.style.width = "50px";
		imgGravatarImg.style.height = "50px";

		//装载图片数据
		image.onload = function() {
			$("#hidGravatarImg").val(sysUtil.commonUtil.getBase64Image(image));
			self.SubmitUserGravatarInfo();
		}
	},
	SubmitUserGravatarInfo: function() { //提交用户修改头像信息

		//获取发布内容参数
		var DATA = new Object();
		DATA.Token = sysUtil.storageUtil.getUserData("Token");
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID"); //创建用户ID
		DATA.GravatarImg = $('#hidGravatarImg').val();
		DATA.CheckType = this.CheckType;

		sysUtil.ajaxTool.requestGetData("WebApiAccount", "UpdateGravatar", METHOD_POST, DATA, function(data) {

			sysUtil.commonUtil.alertMsg(data.returnMsg);

			if(data.boolResult) {
				return;
			} else {
				sysUtil.commonUtil.alertMsg("上传头像出错");
				return;
			}
		});
	}
}