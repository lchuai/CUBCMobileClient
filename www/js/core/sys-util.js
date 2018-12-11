var paraCommonUtil = {
	initBind: function() { //init bind
		console.log("开始初始化数据!");
		//初始化清理
		//this.loginClear();
		//调用升级APP方法

		sysUtil.downloadUtil.checkUpdate(1);
		//初始化views
		this.addViews();
		//GetIndexPicture();
		sysIndex.GetIndexData(); //初始化首页数据
		//获取初始化数据 含 初始化执行操作
		//this.getInitData();

		//初始化事件绑定
		//this.initEventBind();

		//获取vue source
		//this.getVueSource();

		//获取f7 source
		//this.getF7Source();

		//vue 实例化
		//vueInit();

		//绑定手机回退键
		//document.addEventListener("backbutton", this.onBackKeyDown, false);

	},
	addViews: function() { //view 初始化
		//view 初始化
		//		myView = myApp.addView('#tab4', {
		//			dynamicNavbar: true,
		//			domCache: true,
		//			allowDuplicateUrls: true
		//		});

		console.log("加载视图完成，初始化成功!");
	}
};

var sysUtil = {
	superClear: function() { //超级清洗
		sysUtil.storageUtil.clearData();
		sysUtil.storageUtil.saveStorageData('isLogin', false);
	},
	superExitApp: function() { //安全退出
		sysUtil.storageUtil.clearData();
		sysUtil.storageUtil.saveStorageData('isLogin', false);

		setTimeout(function() {
			window.location.reload();
			//myApp.showTab("#view-deal");
		}, 500);
	},
	ajaxTool: { //Ajax
		requestGetData: function(conltroller, action, methodType, data, sucessCallback, errorCallback, completeCallback) {

			var webUrl = BASIC_HOST + conltroller + '/' + action; //拼接请求URL

			console.log(webUrl);

			$$.ajax({
				url: webUrl,
				//url: "http://192.168.31.50:7034/api/OTCAPI/TestGet",
				type: methodType,
				timeout: 30000,
				async: true,
				//contentType: "application/json", //abbandon by monee
				data: data,
				//dataType: "json",
				beforeSend: function(xhr) {
					//myApp.showIndicator();
					myApp.showIndicator();
				},
				complete: function() {
					console.log("complete call back")
					if(completeCallback) {
						completeCallback()
					}
					myApp.hideIndicator();
				},
				success: function(data) {
					console.log(data);
					data = JSON.parse(data);
					sucessCallback(data);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					//alert("cuo wu le");
					console.log(errorThrown);
					console.log("############################################");
					console.log("#### 出错拉:Ajax请求error 请处理!参数如下: ####");
					console.log("############################################")
					console.log("请求数据：" + JSON.stringify(data));
					console.log("状态码：" + XMLHttpRequest.status);
					console.log("状态描述：" + XMLHttpRequest.readyState);
					//异常处理；
					console.log(textStatus);

					if(errorCallback) {
						errorCallback()
					}

					myApp.hidePreloader();
					if(XMLHttpRequest.status == 403) {
						sysUtil.storageUtil.clearData();
						sysUtil.storageUtil.saveStorageData('isLogin', false);
						layer.open({
							content: "登录已过期！请重新登录！",
							skin: 'msg',
							time: 2, //2秒后自动关闭
							end:function() {
								$("#Switch_transaction_orders").css('display', 'none');
								$$("#sys-toolbar").hide('slow');
								myApp.getCurrentView().router.load({
									url: "pages/my/login.html"
								});
							}
						});

					} else {
						sysUtil.commonUtil.alertMsg("网速慢，请稍后再试");
					}

				}
			});
		}

	},
	sessionStorageUtil: {
		saveDataInSession: function(key, value) { //存储sessionStorage数据
			window.sessionStorage.setItem('temp_' + key, value);
		},
		getDataFromSession: function(key) { //获取sessionStorage数据
			var result = window.sessionStorage.getItem('temp_' + key);
			if(!result || result == null || result.length < 1 || result == 'null' || result == 'undefined') {
				result = '';
			}
			return result;
		}
	},
	storageUtil: { //localStorage 使用
		/**
		 * 说明:app本地存储工具
		 * 可用于本地数据的存取和是否登录的判断，以及退出时用于清空数据缓存
		 * author:grofis
		 * email:1216226589@qq.com
		 * createtime:2017-12-2 10:55
		 * */
		//用于保存用户数据 登录成功后使用
		saveUserData: function(array) {
			for(var item in array) {
				//		console.log(item);
				window.localStorage.setItem('local_user_' + item, array[item] + "");
			}
		},
		getUserData: function(key) {
			//console.log('获取用户头像：' + key);
			var result = window.localStorage.getItem(key);
			if(null == result || result.length < 1) {
				result = window.localStorage.getItem('local_user_' + key) || 0;
			}
			return result;
		},
		saveUserStorageData: function(key, value) { //存储用户storage数据
			window.localStorage.setItem('local_user_' + key, value);
		},
		saveStorageData: function(key, value) { //存储storage数据
			window.localStorage.setItem('temp_' + key, value);
		},
		getStorageData: function(key) { //获取storage数据
			var result = window.localStorage.getItem('temp_' + key);
			if(!result || result == null || result.length < 1 || result == 'null' || result == 'undefined') {
				result = '';
			}
			return result;
		},
		removeStorageData: function(key) { //移出数据
			window.localStorage.removeItem('temp_' + key);
		},
		hasLogin: function() { //校验是否登录
			var isLogined = this.getStorageData('isLogin');
			if(isLogined && isLogined == 'true') {
				return true;
			} else {
				return false;
			}
		},
		hasRealNameVerify: function() { //是否实名认证
			var isRealNameCheck = this.getUserData('IsRealNameCheck');
			if(isRealNameCheck && isRealNameCheck == 'true') {
				return true;
			} else {
				return false;
			}
		},
		LoginVerifyPage: function(targetPage, extrasName, extrasStr) { //跳转到登录页面,如果没有登录，跳转到登录页面
			var urlStr;
			if(!hasLogin()) {
				urlStr = '/htmls/my/user/login.html';
			} else {
				urlStr = targetPage;
			}
			mui.openWindow({
				url: urlStr,
				extras: {
					paras: extrasStr,
					target: targetPage
				}
			});
		},
		clearData: function() { //清空用户登录存储的数据
			for(var i = window.localStorage.length - 1; i >= 0; i--) {
				var key = window.localStorage.key(i);
				//以local_user_开头
				var start = key.indexOf("local_user_");
				if(start == 0) {
					window.localStorage.removeItem(key);
				}
				//console.log('第' + (i + 1) + '条数据的键值为：' + window.localStorage.key(i) + '，数据为：' + window.localStorage.getItem(window.localStorage.key(i)));
			}
			//清空数据
			//window.localStorage.clear();
		},
		closeLoginPage: function() { //后台关闭登录页面 防止登录成功后点击返回时出错
			var self = plus.webview.currentWebview();
			var opener = mui.currentWebview.opener();
			//如果是登录界面跳转过来 则关闭登录界面
			if(opener.id.indexOf('sign-in') != -1) {
				if(self.closeid) {
					console.log('close id：' + self.closeid);
					plus.webview.close(self.closeid, 'none');
				}
			}
		},
		closePage: function(name) {
			var wvs = plus.webview.all();
			for(var i = 0; i < wvs.length; i++) {
				console.log('webview' + i + ': ' + wvs[i].id + ", " + wvs[i].getURL());
				if(wvs[i].getURL() != null) {
					var web = wvs[i];
					if(null != web && web.getURL().indexOf(name) != -1) {
						plus.webview.close(web.id);
					}
				}
			}
		}
	},
	commonUtil: {
		ajaxFile: function(file, callback) {
			mui.ajax({
				//请求方式为get  
				type: 'get',
				url: file,
				//返回数据格式为json  
				dataType: "text",
				//请求成功完成后要执行的方法  
				success: function(data) {
					//			console.log("file:" + data);
					callback(data);
				},
				error: function(xhr, type, errorThrown) {
					console.log(xhr.status);
					console.log(xhr.readyState);
					//异常处理；
					console.log(type);
				}
			});
		},
		DateFormatter: function(value) { //日期
			if(value == undefined || value == '' || value == null) {
				return "";
			}
			/*json格式时间转js时间格式*/
			value = value.substr(1, value.length - 2);
			var obj = eval('(' + "{Date: new " + value + "}" + ')');
			var dateValue = obj["Date"];
			if(dateValue.getFullYear() < 1900) {
				return "";
			}

			return dateValue.toLocaleDateString();
		},
		DateTimeFormatter: function(value) { //日期包含时分秒
			if(value == undefined || value == '' || value == null) {
				return "";
			}
			/*json格式时间转js时间格式*/
			value = value.substr(1, value.length - 2);
			var obj = eval('(' + "{Date: new " + value + "}" + ')');
			var dateValue = obj["Date"];
			if(dateValue.getFullYear() < 1900) {
				return "";
			}

			//	return dateValue.toLocaleString();
			return dateValue.toLocaleString('chinese', {
				hour12: false
			});
		},
		mSecondToMinute: function(time) { //毫秒转化成 时分秒
			if(time < 0) {
				return '00:00';
			}
			//转成秒
			time = time / 1000;
			var m = Math.floor((time / 60 % 60));
			var s = Math.floor((time % 60));
			if(m < 10) {
				m = '0' + m;
			}

			if(s < 10) {
				s = '0' + s;
			}
			return result = m + ':' + s;
		},
		getTime: function(time) { //毫秒转化成天时分秒
			if(time < 0) {
				return '0天0小时0分0秒';
			}
			//转成秒
			time = time / 1000;
			var d = Math.floor((time / 60 / 60 / 24));
			var h = Math.floor((time / 60 / 60 % 24));
			var m = Math.floor((time / 60 % 60));
			var s = Math.floor((time % 60));
			if(m < 10) {
				m = '0' + m;
			}

			if(s < 10) {
				s = '0' + s;
			}
			return result = d + '天' + h + '小时' + m + '分' + s + '秒';
		},
		number_format: function(number, decimals, dec_point, thousands_sep, roundtag) {
			/*
			 * 参数说明：
			 * number：要格式化的数字
			 * decimals：保留几位小数
			 * dec_point：小数点符号
			 * thousands_sep：千分位符号
			 * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
			 * */
			number = (number + '').replace(/[^0-9+-Ee.]/g, '');
			roundtag = roundtag || "ceil"; //"ceil","floor","round"
			var n = !isFinite(+number) ? 0 : +number,
				prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
				sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
				dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
				s = '',
				toFixedFix = function(n, prec) {

					var k = Math.pow(10, prec);
					console.log();

					return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
				};
			s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
			var re = /(-?\d+)(\d{3})/;
			while(re.test(s[0])) {
				s[0] = s[0].replace(re, "$1" + sep + "$2");
			}

			if((s[1] || '').length < prec) {
				s[1] = s[1] || '';
				s[1] += new Array(prec - s[1].length + 1).join('0');
			}
			return s.join(dec);
		},
		isPhoneNum: function(phone) { //手机号正确性校验

			if(phone != "undefined") {
				console.log('check mobile phone ' + phone + ' failed.');
				if((/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone))) {
					return true;
				} else {
					console.log('校验出错.');
					return false;
				}
			} else {
				alert(GloThePhoneNumberIsIncorrect);
				return false;
			}
		},
		isNumber: function(val) //验证是否是数字
		{
			var regPos = /^\d+(\.\d+)?$/; //非负浮点数
			var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
			if(regPos.test(val) || regNeg.test(val)) {
				return true;
			} else {
				return false;
			}
		},
		checkeMail: function(str) { //检测是否是邮箱
			var Expression = "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$";
			var objExp = new RegExp(Expression);
			if(objExp.test(str) == true) {
				return true;
			} else {
				return false;
			}
		},
		isChinese: function(str) { //在JavaScript中，正则表达式判断是否是汉字
			var Expression = "^[\u4e00-\u9fa5]+$";
			var objExp = new RegExp(Expression);
			if(objExp.test(str) == true) {
				return true;
			} else {
				return false;
			}
		},
		alertMsg: function(msg, endCallback) {
			layer.open({
				content: msg,
				skin: 'msg',
				time: 2,
				end: function() {
					if(endCallback) {
						endCallback()
					}
				}
			})
		},
		getBase64Image: function(img) { //将图片压缩转成base64 
			var canvas = document.createElement("canvas");
			var width = img.width;
			var height = img.height;
			// calculate the width and height, constraining the proportions 
			if(width > height) {
				if(width > 480) {
					height = Math.round(height *= 480 / width);
					width = 480;
				}
			} else {
				if(height > 480) {
					width = Math.round(width *= 480 / height);
					height = 480;
				}
			}
			canvas.width = width; /*设置新的图片的宽度*/
			canvas.height = height; /*设置新的图片的长度*/
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, width, height); /*绘图*/
			var dataURL = canvas.toDataURL("image/jpeg", 1 || 0.8);
			return dataURL.replace("data:image/jpeg;base64,", "");
		}
	},
	downloadUtil: {

		checkUpdate: function(deep) {

			//获取本地的配置文件
			mui.getJSON("../manifest.json", null, function(data) {
				localversion = 'V ' + data.version.name;
				$('#version_name').text(localversion);

			});

			//if(plus.os.name == "Android") {
			sysUtil.downloadUtil.APPUpdate(deep);
			//}
		},
		APPUpdate: function(deep) { //更新安卓下载文件
			mui.ajax({
				//请求方式为get  
				type: 'GET',
				//json文件位置  
				url: URL_VERSION,
				//返回数据格式为json  
				dataType: "json",
				//请求成功完成后要执行的方法  
				success: function(data) {
					var netVersion = data.version;
					var netName = data.versioname;
					var downUrl = data.url;
					var filename = data.filename;
					var isForce = data.isforce;

					var sum = data.updatesum;
					//var title = data.title;
					console.log("更新信息：" + JSON.stringify(data));

					var relative = '';
					if(deep == 2) {
						relative = "../../";
					} else if(deep == 3) {
						relative = "../../../";
					} else {
						relative = "../";
					}
					console.log(relative + "manifest.json");
					//获取本地的配置文件
					mui.getJSON(relative + "manifest.json", null, function(data) {
						var localversion = data.version.code;
						console.log("版本: " + localversion + ", net:" + netVersion);
						if((Number(localversion) < Number(netVersion) && (isForce == 1))) {
							$('#version_info').html('有更新的版本：' + netName);
							$('#version_info').css('color', '#d2b772');
							plus.nativeUI.confirm('服务器上有更新的版本：' + netName, function(event) {
								if(0 == event.index) {
									console.log(plus.os.name);
									if(plus.os.name == "Android") {
										sysUtil.downloadUtil.AndroidCreateDownload(downUrl, filename);
									} else if(plus.os.name == "iOS") {
										sysUtil.downloadUtil.iosCreateDownload();
									}
								}
							}, '请更新版本', ["确定更新", "取　　消"]);
						}
						if(Number(localversion) == Number(netVersion)) {
							$('#version_info').html("已是最新版本");
							$('#version_info').css('color', '#d2b772');
						}
					});
				},
				error: function(xhr, type, errorThrown) {
					console.log(xhr.status);
					console.log(xhr.readyState);
					//异常处理；
					console.log(type);
					//			mui.toast('网络错误...');
					layer.open({
						content: "网络错误..",
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				}
			});
		},
		AndroidCreateDownload: function(url, filename) {
			if(null == filename || filename.length < 1) {
				var index = url.lastIndexOf("/") + 1;
				filename = url.substring(index);
			} else {}
			//判断文件是否已经下载
			plus.io.resolveLocalFileSystemURL(
				filename,
				function(entry) {
					if(entry.isFile) {
						//				mui.toast('已经下载');
						layer.open({
							content: '已经下载',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
					}
				},
				function(e) {
					sysUtil.downloadUtil.dBase(url);
				});
		},
		dBase: function(url) {
			if(dtask) {
				//		mui.toast('下载任务已经存在');
				layer.open({
					content: '下载任务已经存在',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				return;
			}
			dtask = plus.downloader.createDownload(url, {
					method: "GET"
				},
				//下载完成执行的回调函数
				function(d, status) {
					//mui.toast(d.filename);
				}
			);

			var progresstemp;
			dtask.addEventListener("statechanged", function(task, status) {
				if(!dtask) {
					return;
				}
				switch(task.state) {
					case 1: // 开始						
						layer.open({
							content: '开始下载...',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
						break;
					case 2: // 已连接到服务器					
						layer.open({
							content: '连接到服务器...',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
						mui('body').progressbar({
							progress: 0
						}).show();
						break;
					case 3: // 已接收到数据
						var progressVal = (task.downloadedSize / task.totalSize) * 100;
						progressVal = parseInt(progressVal);
						if(progressVal !== progresstemp) {
							progresstemp = progressVal;
							mui('body').progressbar().setProgress(progressVal);
							if(progresstemp == 15) {
								//						mui.toast("正在下载");
								layer.open({
									content: '正在下载',
									skin: 'msg',
									time: 2 //2秒后自动关闭
								});
							}
							if(progresstemp == 35) {
								//						mui.toast('下载需要一段时间，请耐心等待');
								layer.open({
									content: '下载需要一段时间，请耐心等待',
									skin: 'msg',
									time: 2 //2秒后自动关闭
								});
							}

						}
						break;
					case 4: // 下载完成
						mui('body').progressbar().hide();
						var path = dtask.filename + "";
						//以.apk结尾的文件
						var index = path.indexOf('.apk') + (".apk".length);
						if(index != -1 && (index == path.length)) {
							plus.runtime.install(dtask.filename);
						}
						break;
				}
			});
			dtask.start();
		},
		iosCreateDownload: function() {
			window.location.href = "https://www.pgyer.com/H76b";
		},
		cDownload: function() {
			if(!dtask) {
				//		mui.toast('请先开始下载');
				layer.open({
					content: '请先开始下载',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				return;
			}
			dtask.abort();
			dtask = null;
		},

	}
}