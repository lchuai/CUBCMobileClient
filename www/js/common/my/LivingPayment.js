LivingPayment = {
	GetAreaVersion: function() {
		sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetSelectAreaVersion", METHOD_GET, '', function(data) {
			if(data.boolResult) {
				IndexAreaVersion = data.returnData;
			}
		});
	},

	CityChoicejsp: function() { //城市选择渲染
		var localAreaVersion = window.localStorage.getItem("AreaVersion");

		var boolGetArea = false;

		if(localAreaVersion == 'undefined' || localAreaVersion == null || localAreaVersion.length < 1) {
			localAreaVersion = 0;
			console.log('localAreaVersion is:' + localAreaVersion);
			window.localStorage.setItem("AreaVersion", IndexAreaVersion);
			boolGetArea = true;
		}
		if(IndexAreaVersion == localAreaVersion) {
			var arrayObj = JSON.parse(window.localStorage.getItem('ChinaAreaData'));
			LivingPayment.RenderingAreaData(arrayObj);
		} else {
			window.localStorage.setItem("AreaVersion", IndexAreaVersion);
			boolGetArea = true;
		}
		if(boolGetArea) {

			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetSelectArea", METHOD_GET, '', function(data) {
				if(data.boolResult) {
					console.log(data);
					var NewsList = data.returnData;
					window.localStorage.setItem("ChinaAreaData", JSON.stringify(NewsList));
					if(NewsList.length > 0) {
						$("#city_city_s").html('');
						LivingPayment.RenderingAreaData(NewsList);
					}
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}

	},

	RenderingAreaData: function(ListData) {
		var html = '';
		$.each(ListData, function(i, item) {
			html += '<div class="city-list"><span class="city-letter" id="' + item.FirstLetter + '1">' + item.FirstLetter + '</span>';
			$.each(item.ChinaArea, function(j, ChinaArea) {
				var split = ChinaArea.Name.split('|');
				html += '<p data-id="' + ChinaArea.Id + '">' + split[1] + '</p>';
			})
			html += '</div>';
		})
		$('#city_city_s').append(html);
	},
	RegionalChoices: function(id) { //选择城市点击传data-id
		myquerys = id;
		LivingPayment.LivingPaymentIndex();
		$(".letter").hide();
		$("html").height(100 + '%');
		mainView.router.back({
			pageName: 'TelephonePayment', //页面的data-page值
		});

	},
	LivingPaymentIndex: function() { //生活缴费首页获取数据
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetMyPayment", METHOD_GET, DATA, function(data) {
				$("#LivingPayment_Content_index_ul").html('');
				if(data.boolResult) {
					console.log(data);
					var liHtml = '';
					var NewsList = data.returnData;
					if(NewsList.length > 0) {						
						for(var i = 0; i < NewsList.length; i++) {
							if(NewsList[i].PaymentType == 1) {
								liHtml += '<li class="swipeout">';
								liHtml += '<div onclick="LivingPayment.ElectricityFee(' + NewsList[i].CostOfLifeID + ');" class="swipeout-content LivingPayment_swipeout">';
								liHtml += '<div>';
								liHtml += '<img src="img/LivingPayment/Electricity_fee_2.png" />';
								liHtml += '</div>';
								liHtml += '<div>';
								liHtml += '<p>电费</p>';
								liHtml += '<p><span>' + NewsList[i].PaymentAccounts + '</span><span>' + NewsList[i].AccountName + '</span></p>';
								liHtml += '</div>';
								liHtml += '<div><img src="img/my/jiantou.png" /></div>';
								liHtml += '</div>';
								liHtml += '<div class="swipeout-actions-right">';
								liHtml += '<a class="LivingPayment-close" href="#" onclick="LivingPayment.LivingPaymentConfirm(' + NewsList[i].CostOfLifeID + ');">删除</a>';
								liHtml += '</div>';
								liHtml += '</li>';
							} else if(NewsList[i].PaymentType == 2) {
								liHtml += '<li class="swipeout">';
								liHtml += '<div onclick="LivingPayment.JumpsWaterPayment(' + NewsList[i].CostOfLifeID + ');" class="swipeout-content LivingPayment_swipeout">';
								liHtml += '<div>';
								liHtml += '<img src="img/LivingPayment/Water_fee.png" />';
								liHtml += '</div>';
								liHtml += '<div>';
								liHtml += '<p>水费</p>';
								liHtml += '<p><span>' + NewsList[i].PaymentAccounts + '</span><span>' + NewsList[i].AccountName + '</span></p>';
								liHtml += '</div>';
								liHtml += '<div><img src="img/my/jiantou.png" /></div>';
								liHtml += '</div>';
								liHtml += '<div class="swipeout-actions-right">';
								liHtml += '<a class="LivingPayment-close" href="#" onclick="LivingPayment.LivingPaymentConfirm(' + NewsList[i].CostOfLifeID + ');">删除</a>';
								liHtml += '</div>';
								liHtml += '</li>';
							}
						}
						$("#LivingPayment_Content_index_ul").append(liHtml);
					}
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	},
	LivingPaymentConfirm: function(CostOfLifeID) { //确认删除弹窗
		myApp.confirm('', '确认删除?',
			function() {
				var DATA = new Object();
				DATA.CostOfLifeID = CostOfLifeID;
				sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "DeleteCostOfLife", METHOD_GET, DATA, function(data) {
					if(data.boolResult) {
						sysUtil.commonUtil.alertMsg('删除成功');
							LivingPayment.LivingPaymentIndex();						
					} else {
						sysUtil.commonUtil.alertMsg(data.returnMsg);
					}
				})
			},
			function() {

			}
		);
	},
	ElectricityPaymentContens: function(CostOfLifeID) { //电缴费获取详情
		$("#ElectricityFee_hiddens_inputs_ids").val(CostOfLifeID);
		var DATA = new Object();
		DATA.CostOfLifeID = CostOfLifeID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetMyPaymentDetailed", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data);
					var liHtml = '';
					var NewsList = data.returnData;
					$("#ElectricityFee_query").html('');
					$("#ElectricityFee_PaymentUnit").html(NewsList.PaymentUnit);
					$("#ElectricityFee_Account_numbers").html(NewsList.PaymentAccounts);
					$("#ElectricityFee_Account_name").html(NewsList.AccountName);
					$("#ElectricityFee_Account_address").html(NewsList.Address);
					$("#ElectricityFee_Account_TransAssets_java").html(NewsList.TransAssets);
					$("#ElectricityFee_hiddens_inputs_huhao").val(NewsList.PaymentAccounts); //户号传给下一个页面
					liHtml += '<div onclick="LivingPayment.ElectricityPaymentContensQuery(' + NewsList.PaymentAccounts + ');">';
					liHtml += '<a href="javascript:void(0);" class="link link-filter">';
					liHtml += '<i class="f7-icons">menu</i>';
					liHtml += '</a>';
					liHtml += '</div>';
					$("#ElectricityFee_query").append(liHtml);
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	},
	ElectricityPaymentContensQuery: function(PaymentAccounts) { //跳转电费列表
		myApp.getCurrentView().router.load({
			url: "pages/Utility/RechargeElectricity.html?PaymentAccounts=" + PaymentAccounts.toString()
		});
	},
	WaterPaymentDetailspvp: function(CostOfLifeID) { //水缴费获取详情	
		$("#WaterFeePayment_inputs_idsp").val(CostOfLifeID);
		var DATA = new Object();
		DATA.CostOfLifeID = CostOfLifeID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetMyPaymentDetailed", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data);
					var liHtml = '';
					var NewsList = data.returnData;
					$("#WaterFeePayment_query_o").html('');
					$("#WaterFeePayment_unit").html(NewsList.PaymentUnit);
					$("#WaterFeePayment_Account_numbers").html(NewsList.PaymentAccounts);
					$("#WaterFeePayment_Account_name").html(NewsList.AccountName);
					$("#WaterFeePayment_Account_address").html(NewsList.Address);
					$("#WaterFeePayment_Account_TransAssets_u").html(NewsList.TransAssets);

					liHtml += '<div onclick="LivingPayment.WaterFeeListquery(' + NewsList.PaymentAccounts + ');">';
					liHtml += '<a href="javascript:void(0);" class="link link-filter">';
					liHtml += '<i class="f7-icons">menu</i>';
					liHtml += '</a>';
					liHtml += '</div>';
					$("#WaterFeePayment_query_o").append(liHtml);
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	},
	WaterFeeListquery: function(PaymentAccounts) { //跳转水费列表
		myApp.getCurrentView().router.load({
			url: "pages/Utility/WaterRechargeBill.html?PaymentAccounts=" + PaymentAccounts
		});
	},
	BackLivingPayment: function() { //点击确定跳转
		$$("#sys-toolbar").hide('slow');
		mainView.router.back({
			pageName: 'LivingPayment',
		});
	},
	electricity: function() { //跳转电费新增用户
		$$("#sys-toolbar").hide('slow');

		myApp.getCurrentView().router.load({
			url: "pages/Utility/NewUserElectricity.html?"
		});
	},
	HowCheckTheAccount: function() { //点击如何查户号
		var popupHTML = '<div class="popup">' +
			'<div class="close-popup TheAccount_ert_u">' +
			'<p class="TheAccount_ert_u_p_e_ert_w">如何查户号</p>' +
			'<p>如何查询水费户号</p>' +
			'<p>【方法一】：在纸质缴费/催缴通知单上找户号</p>' +
			'<p>【方法二】：拨打客服热线，凭户名及地址查询</p>' +

			'<p>如何查询电费户号？</p>' +

			'<p>【方法一】：在电力公司提供的电费发票上查询</p>' +
			'<p>【方法二】：在银行等代售网点提供的发票上查询</p>' +
			'<p>【方法三】：在您开户时给您的居民用户用电登记表或购电证中查询</p>' +
			'<p>【方法四】：通过在电力机构预留的身份证号、地址、姓名等信息，拨打95598进行人工客服查询对应的户号</p>' +
			'<p>【方法五】：查看家中电表编号（电表条码），拨打95598进行人工客服查询对应的户号。</p>' +

			'<p>以上方式均供参考使用，具体查询方式按照当地电力公司要求方式查询。</p>' +
			'</div>' +
			'</div>'
		myApp.popup(popupHTML);
	},
	SelfPaymentAgreement: function() { //点击自助缴费协议
		var popupHTML = '<div class="popup">' +
			'<div class="close-popup TheAccount_ert_u">' +
			'<p class="TheAccount_ert_u_p_e_ert_w">缴费协议</p>' +
			'<p class="TheAccount_ert_u_p_e">会员每个月缴费金额不得超过200元（人民币），平台收到缴费申请后，平台会在工作日9：00—18：00进行缴费。缴费成功后，可以在APP中查询结果。</p>' +
			'</div>' +
			'</div>'
		myApp.popup(popupHTML);
	},
	ElectricityUserConfirmed: function() { //电费新增用户确定按钮
		var unit = $("#NewUserElectricity_hids_inputs_e").val();
		var Numbering = $("#Electricity_Numbering").val();
		var AccountName = $("#Electricity_AccountName").val();
		var address = $("#Electricity_address").val();
		var checkboxs = $("input[type='checkbox']").is(':checked');
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.AccountName = AccountName;
		DATA.PaymentAccounts = Numbering;
		DATA.PaymentUnit = unit;
		DATA.PaymentType = 1;
		DATA.Address = address;
		if(unit == '') {
			sysUtil.commonUtil.alertMsg('请输入缴费单位');
			return;
		} else if(Numbering == '') {
			sysUtil.commonUtil.alertMsg('请输入客户编号');
			return;
		} else if(AccountName == '') {
			sysUtil.commonUtil.alertMsg('请输入户名');
			return;
		} else if(address == '') {
			sysUtil.commonUtil.alertMsg('请输入住址');
			return;
		} else if(checkboxs == false) {
			sysUtil.commonUtil.alertMsg('请阅读并同意《CUBC自助缴费协议》');
			return;
		} else {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "AddPaymentAccount", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					mainView.router.refreshPreviousPage();
					setTimeout(function() {
						mainView.router.back({
							pageName: 'LivingPayment',
						});
					}, 400);
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}
	},
	ElectricityUsersClicks: function() { //选择电费缴费单位
		var areaID = $("#NewUserElectricity_MyAreaID").val();
		var DATA = new Object();
		DATA.AreaID = areaID;
		DATA.PamentType = 1;
		sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetPaymentUnit", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				var NewsList = data.returnData;
				$("#NewUserElectricity_hids_inputs_e").val(NewsList[0].PaymentUnitID);
				$("#Electricity_unit").val(NewsList[0].PaymentUnitName);
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}
		});
	},
	ElectricityFee: function(CostOfLifeID) { //跳转电费缴费
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Utility/ElectricityFee.html?CostOfLifeID=" + CostOfLifeID
		});
	},
	ElectricityUserDetermined: function() { //电费缴费确定按钮1111111111111111111111111111111111111
		var CostOfLifeID = $("#ElectricityFee_hiddens_inputs_ids").val();
		var AmountOfCost = $("#ElectricityFee_Account_inputs_java").val();
		var AssetsOFCost = $("#ElectricityFee_Account_TransAssets_avas").html();

		if(AmountOfCost == '') {
			sysUtil.commonUtil.alertMsg('请输入充值金额');
			return;
		} else {
			myApp.pickerModal(
				'<div class="picker-modal">' +
				'<div class="toolbar">' +
				'<div class="toolbar-inner">' +
				'<div class="left"></div>' +
				'<div class="right close-picker">取消</div>' +
				'</div>' +
				'</div>' +
				'<div class="picker-modal-inner">' +
				'<div class="content-block-conts">' +
				'<input type="password" name="SaleDetails4s" class="ElectricityFee_password_style" placeholder="请输入资金密码" id="ElectricityFee_password_erts" />' +
				'<a href="javascript:;" class="ElectricityFee_yes_erts" onclick="LivingPayment.ElectricityFeePasswords();">确认</a>' +
				'</div>' +
				'</div>' +
				'</div>'
			)
		}
	},
	ElectricityFeePasswords: function() { //电费资金密码确定按钮
		var DealPassword = $("#ElectricityFee_password_erts").val();
		var CostOfLifeID = $("#ElectricityFee_hiddens_inputs_ids").val();
		var AmountOfCost = $("#ElectricityFee_Account_inputs_java").val();
		var AssetsOFCost = $("#ElectricityFee_Account_TransAssets_avas").html();
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.AmountOfCost = AmountOfCost;
		DATA.AssetsOFCost = AssetsOFCost;
		DATA.CostOfLifeID = CostOfLifeID;
		DATA.DealPassword = DealPassword;
		DATA.PaymentType = 1;
		if(DealPassword == '') {
			sysUtil.commonUtil.alertMsg('资金密码不能为空');
		} else {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "AddWaterElectricityPayment", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					myApp.closeModal('.picker-modal');
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					mainView.router.refreshPreviousPage();
					setTimeout(function() {
						mainView.router.back({
							pageName: 'LivingPayment',
						});
					}, 400);
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}
	},
	ElectricityFeeDetails: function(CostOfLifeDetailID) { //跳转电费详细
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Utility/ElectricityDetails.html?CostOfLifeDetailID=" + CostOfLifeDetailID
		});
	},
	ElectricityMylist: function(PaymentAccounts) { //电费列表渲染
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.PaymentType = 1;
		DATA.PaymentAccounts = PaymentAccounts;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetMyCostOfLifeDetail", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data);
					var liHtml = '';
					var NewsList = data.returnData;
					if(NewsList.length > 0) {
						$("#RechargeElectricity_o_uls_t").html('');
						for(var i = 0; i < NewsList.length; i++) {
							liHtml += '<li onclick="LivingPayment.ElectricityFeeDetails(' + NewsList[i].CostOfLifeDetailID + ');">';
							liHtml += '<div class="RechargeElectricity_containes justify-content float">';
							liHtml += '<img src="img/LivingPayment/Electricity_fee_2.png" />';
							liHtml += '</div>';
							liHtml += '<div class="RechargeElectricity_dl_mys float">';
							liHtml += '<dl class="RechargeElectricity_dl_firest width">';
							liHtml += '<dt>电费充值 - ' + NewsList[i].Address + '</dt>';
							liHtml += '<dd class="btl_color_h">' + NewsList[i].PaymentStatus + '</dd>';
							liHtml += '</dl>';
							liHtml += '<dl class="RechargeElectricity_dl_last width">';
							liHtml += '<dt class="btl_color_999">' + NewsList[i].TimeOfSubmit + '</dt>';
							liHtml += '<dd class="btl_color_red">+' + NewsList[i].AmountOfCost + '元(CUBU-' + NewsList[i].AssetsOFCost + ')</dd>';
							liHtml += '</dl>';
							liHtml += '</div>';
							liHtml += '</li>';
						}
						$("#RechargeElectricity_o_uls_t").append(liHtml);
					} else {
						$("#RechargeElectricity_o_uls_t").html('<p style="text-align: center;">暂无充值记录</p>');
					}
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	},
	ElectricMycontent: function(CostOfLifeDetailID) { //电费详情渲染
		var DATA = new Object();
		DATA.CostOfLifeDetailID = CostOfLifeDetailID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetMyCostOfLifeDetailModel", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data);
					var NewsList = data.returnData;
					$("#ElectricityDetails_PaymentUnit").html(NewsList.PaymentUnit);
					$("#ElectricityDetails_list_a").html('<li id="ElectricityDetails_list_a">+ ' + NewsList.AmountOfCost + '元<span>(CUBC:-' + NewsList.AssetsOFCost + ')</span></li>');
					$("#ElectricityDetails_list_b").html('<li id="ElectricityDetails_list_b"><label>户号：</label>' + NewsList.PaymentAccounts + '</li>');
					$("#ElectricityDetails_list_c").html('<li id="ElectricityDetails_list_c"><label>户名：</label>' + NewsList.AccountName + '</li>');
					$("#ElectricityDetails_list_d").html('<li id="ElectricityDetails_list_a"><label>订单号:</label>' + NewsList.CostCode + '</li>');
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	},
	WaterFeeMylist: function(PaymentAccounts) { //水费列表渲染
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.PaymentType = 2;
		DATA.PaymentAccounts = PaymentAccounts;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetMyCostOfLifeDetail", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data);
					var liHtml = '';
					var NewsList = data.returnData;
					if(NewsList.length > 0) {
						$("#WaterRechargeBill_ul_list_t").html('');
						for(var i = 0; i < NewsList.length; i++) {
							liHtml += '<li onclick="LivingPayment.JumpWaterFeeDetailslink(' + NewsList[i].CostOfLifeDetailID + ');">';
							liHtml += '<div class="RechargeElectricity_containes justify-content float">';
							liHtml += '<img src="img/LivingPayment/Water_fee_2.png" />';
							liHtml += '</div>';
							liHtml += '<div class="RechargeElectricity_dl_mys float">';
							liHtml += '<dl class="RechargeElectricity_dl_firest width">';
							liHtml += '<dt>水费充值 - ' + NewsList[i].Address + '</dt>';
							liHtml += '<dd class="btl_color_h">' + NewsList[i].PaymentStatus + '</dd>';
							liHtml += '</dl>';
							liHtml += '<dl class="RechargeElectricity_dl_last width">';
							liHtml += '<dt class="btl_color_999">' + NewsList[i].TimeOfSubmit + '</dt>';
							liHtml += '<dd class="btl_color_red">+' + NewsList[i].AmountOfCost + '元(CUBU-' + NewsList[i].AssetsOFCost + ')</dd>';
							liHtml += '</dl>';
							liHtml += '</div>';
							liHtml += '</li>';
						}
						$("#WaterRechargeBill_ul_list_t").append(liHtml);
					} else {
						$("#WaterRechargeBill_ul_list_t").html('<p style="text-align: center;">暂无充值记录</p>');
					}
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	},
	WaterRendersp: function(CostOfLifeDetailID) { //水费详情渲染		
		var DATA = new Object();
		DATA.CostOfLifeDetailID = CostOfLifeDetailID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetMyCostOfLifeDetailModel", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data);
					var NewsList = data.returnData;
					$("#myWaterBill_PaymentUnit").html(NewsList.PaymentUnit);
					$("#myWaterBill_list_a").html('<li id="myWaterBill_list_a">+ ' + NewsList.AmountOfCost + '元<span>(CUBC:-' + NewsList.AssetsOFCost + ')</span></li>');
					$("#myWaterBill_list_b").html('<li id="myWaterBill_list_b"><label>户号：</label>' + NewsList.PaymentAccounts + '</li>');
					$("#myWaterBill_list_c").html('<li id="myWaterBill_list_c"><label>户名：</label>' + NewsList.AccountName + '</li>');
					$("#myWaterBill_list_d").html('<li id="myWaterBill_list_d"><label>订单号:</label>' + NewsList.CostCode + '</li>');
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	},
	JumpWaterFeeAccount: function() { //跳转水费新增用户
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Utility/WaterNewAccount.html"
		});
	},
	SelectPaymentUnit: function() { //选择缴费单位

		var MyAreaID = $("#WaterNewAccount_MyAreaID").val();
		var DATA = new Object();
		DATA.AreaID = MyAreaID;
		DATA.PamentType = 2;
		sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetPaymentUnit", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				$("#WaterNewAccount_ul_pvs_input").css("height", "6rem");
				console.log(data);
				var liHtml = '';
				var NewsList = data.returnData;
				if(NewsList.length > 0) {
					$("#WaterNewAccount_ul_jks_render").html('');
					for(var i = 0; i < NewsList.length; i++) {
						liHtml += '<div onclick=LivingPayment.SelectPaymentUnitClick("' + NewsList[i].PaymentUnitID + '","' + NewsList[i].PaymentUnitName + '");>' + NewsList[i].PaymentUnitName + '</div>';
					}
					$("#WaterNewAccount_ul_jks_render").append(liHtml);
				}
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}
		});
	},
	SelectPaymentUnitClick: function(id, index) { //点击关闭缴费单位下拉框		
		$("#WaterNewAccount_ul_pvs_input").css("height", "0");
		$("#WaterNewAccount_input_y_e").val(index);
		$("#WaterNewAccount_hid_inputs").val(id);
	},
	WaterUserConfirmation: function() { //水费新增用户确定按钮
		var unit = $("#WaterNewAccount_hid_inputs").val();
		var Numbering = $("#WaterNewAccount_Numbering").val();
		var AccountName = $("#WaterNewAccount_AccountName").val();
		var address = $("#WaterNewAccount_address").val();
		var checkboxs = $("input[type='checkbox']").is(':checked');
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.AccountName = AccountName;
		DATA.PaymentAccounts = Numbering;
		DATA.PaymentUnit = unit;
		DATA.PaymentType = 2;
		DATA.Address = address;
		if(unit == '') {
			sysUtil.commonUtil.alertMsg('请输入缴费单位');
			return;
		} else if(Numbering == '') {
			sysUtil.commonUtil.alertMsg('请输入客户编号');
			return;
		} else if(AccountName == '') {
			sysUtil.commonUtil.alertMsg('请输入户名');
			return;
		} else if(address == '') {
			sysUtil.commonUtil.alertMsg('请输入住址');
			return;
		} else if(checkboxs == false) {
			sysUtil.commonUtil.alertMsg('请阅读并同意《CUBC自助缴费协议》');
			return;
		} else {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "AddPaymentAccount", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					mainView.router.refreshPreviousPage();
					setTimeout(function() {
						mainView.router.back({
							pageName: 'LivingPayment',
						});
					}, 400);
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}
	},
	JumpsWaterPayment: function(CostOfLifeID) { //跳转水费缴费
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Utility/WaterFeePayment.html?CostOfLifeID=" + CostOfLifeID
		});
	},
	WaterConfirmations: function() { //水费缴费确定按钮2222222222222222222222222222222222222
		var CostOfLifeID = $("#WaterFeePayment_inputs_idsp").val();
		var AmountOfCost = $("#WaterFeePayment_Account_inputs_g").val();
		var AssetsOFCost = $("#WaterFeePayment_Account_TransAssets_p").html();

		if(AmountOfCost == '') {
			sysUtil.commonUtil.alertMsg('请输入充值金额');
			return;
		} else {
			myApp.pickerModal(
				'<div class="picker-modal">' +
				'<div class="toolbar">' +
				'<div class="toolbar-inner">' +
				'<div class="left"></div>' +
				'<div class="right close-picker">取消</div>' +
				'</div>' +
				'</div>' +
				'<div class="picker-modal-inner">' +
				'<div class="content-block-conts">' +
				'<input type="password" name="SaleDetails4s" class="ElectricityFee_password_style" placeholder="请输入资金密码" id="Water_password_erts" />' +
				'<a href="javascript:;" class="ElectricityFee_yes_erts" onclick="LivingPayment.WaterPasswords();">确认</a>' +
				'</div>' +
				'</div>' +
				'</div>'
			)
		}
	},
	WaterPasswords: function() { //水费资金密码确定按钮
		var CostOfLifeID = $("#WaterFeePayment_inputs_idsp").val();
		var AmountOfCost = $("#WaterFeePayment_Account_inputs_g").val();
		var AssetsOFCost = $("#WaterFeePayment_Account_TransAssets_p").html();
		var DealPassword = $("#Water_password_erts").val();
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.AmountOfCost = AmountOfCost;
		DATA.AssetsOFCost = AssetsOFCost;
		DATA.CostOfLifeID = CostOfLifeID;
		DATA.DealPassword = DealPassword;
		DATA.PaymentType = 2;
		if(DealPassword == '') {
			sysUtil.commonUtil.alertMsg('资金密码不能位空');
		} else {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "AddWaterElectricityPayment", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					myApp.closeModal('.picker-modal');
					mainView.router.refreshPreviousPage();
					setTimeout(function() {
						mainView.router.back({
							pageName: 'LivingPayment',
						});
					}, 400);
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}
	},
	JumpWaterFeeDetailslink: function(CostOfLifeDetailID) { //跳转水费详细
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Utility/myWaterBill.html?CostOfLifeDetailID=" + CostOfLifeDetailID
		});
	},
	JumpPhonePayment: function() { //跳转话费详细
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Utility/TelephonePayment.html"
		});
	},
	TelephoneSelectCarrier: function() { //电话缴费选择运营商
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetPhoneUnit", METHOD_GET, DATA, function(data) {
			if(data.boolResult) {
				var liHtml = '';
				var NewsList = data.returnData.ObjDict;
				$("#TelephonePayment_TransAssets_u").html(data.returnData.TransAssets);
				console.log(data)
				if(NewsList.length > 0) {
					$("#TelephonePayment_inputs_texts_xs").html('');
					for(var i = 0; i < NewsList.length; i++) {
						liHtml += '<div onclick=LivingPayment.SelectCarrierClick("' + NewsList[i].OrderNo + '","' + NewsList[i].DictName + '");>' + NewsList[i].DictName + '</div>';
					}
					$("#TelephonePayment_inputs_texts_xs").append(liHtml);
				}
			} else {
				sysUtil.commonUtil.alertMsg(data.returnMsg);
			}
		});
	},
	TelephonePaymentConfirmation: function() { //电话缴费确定按钮333333333333333333333333333333
		var CostOfLifeID = $("#WaterFeePayment_inputs_idsp").val();
		var AmountOfCost = $("#TelephonePayment_inputs_son").val();
		var AssetsOFCost = $("#TelephonePayment_AmountOfCost_e").html();
		var CostOfPhone = $("#TelephonePayment_tel_ert").val();
		var PhoneUnit = $("#TelephonePayment_yys_id_y").val();
		var tels = /^1(3|4|5|7|8)\d{9}$/;
		if(PhoneUnit == '') {
			sysUtil.commonUtil.alertMsg('请选择运营商');
			return;
		} else if(CostOfPhone == '') {
			sysUtil.commonUtil.alertMsg('请输入电话号码');
			return;
		} else if(!tels.test(CostOfPhone)) {
			sysUtil.commonUtil.alertMsg('请输入正确电话号码');
			return;
		} else if(AmountOfCost == '') {
			sysUtil.commonUtil.alertMsg('请输入充值金额');
			return;
		} else {
			myApp.pickerModal(
				'<div class="picker-modal">' +
				'<div class="toolbar">' +
				'<div class="toolbar-inner">' +
				'<div class="left"></div>' +
				'<div class="right close-picker">取消</div>' +
				'</div>' +
				'</div>' +
				'<div class="picker-modal-inner">' +
				'<div class="content-block-conts">' +
				'<input type="password" name="SaleDetails4s" class="ElectricityFee_password_style" placeholder="请输入资金密码" id="iphone_password_erts" />' +
				'<a href="javascript:;" class="ElectricityFee_yes_erts" onclick="LivingPayment.iphonePasswords();">确认</a>' +
				'</div>' +
				'</div>' +
				'</div>'
			)
		}
	},
	iphonePasswords: function() { //话费资金密码确定按钮
		var CostOfLifeID = $("#WaterFeePayment_inputs_idsp").val();
		var AmountOfCost = $("#TelephonePayment_inputs_son").val();
		var AssetsOFCost = $("#TelephonePayment_AmountOfCost_e").html();
		var CostOfPhone = $("#TelephonePayment_tel_ert").val();
		var PhoneUnit = $("#TelephonePayment_yys_id_y").val();
		var DealPassword = $("#iphone_password_erts").val();
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.AmountOfCost = AmountOfCost;
		DATA.AssetsOFCost = AssetsOFCost;
		DATA.CostOfLifeID = 0;
		DATA.CostOfPhone = CostOfPhone;
		DATA.PhoneUnit = PhoneUnit;
		DATA.DealPassword = DealPassword;
		DATA.PaymentType = 3;
		if(DealPassword == '') {
			sysUtil.commonUtil.alertMsg('资金密码不能位空');
		} else {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "AddWaterElectricityPayment", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
					myApp.closeModal('.picker-modal');
					mainView.router.refreshPreviousPage();
					setTimeout(function() {
						mainView.router.back({
							pageName: 'LivingPayment',
						});
					}, 400);
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}
	},
	SelectCarrier: function() { //选择运营商
		$("#TelephonePayment_ul_plus").css("height", "3.6rem");
	},
	SelectCarrierClick: function(id, index) { //点击关闭运营商下拉框		
		$("#TelephonePayment_ul_plus").css("height", "0");
		$("#TelephonePayment_inputs_xs").val(index);
		$("#TelephonePayment_yys_id_y").val(id);
	},
	SelectRechargeAmount: function() { //选择充值金额
		$("#TelephonePayment_ul_miniplus").css("height", "5rem");
	},
	SelectRechargeAmountClick: function(id, index) { //点击关闭充值金额下拉框		
		$("#TelephonePayment_inputs_texts_son div").on('click', function(index) {
			$("#TelephonePayment_ul_miniplus").css("height", "0");
			$("#TelephonePayment_inputs_son").val($(this).html());
		});

		//		$("#TelephonePayment_inputs_texts_son").val(id);
	},
	TelephoneBillList: function() { //电话费列表渲染
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.PaymentType = 3;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetMyCostOfLifeDetail", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data);
					var liHtml = '';
					var NewsList = data.returnData;
					if(NewsList.length > 0) {
						$("#CallFeeDetails_ymlist_s").html('');
						for(var i = 0; i < NewsList.length; i++) {
							liHtml += '<li onclick="LivingPayment.JumpCalLCharge(' + NewsList[i].CostOfLifeDetailID + ');">';
							liHtml += '<div class="RechargeElectricity_containes justify-content float">';
							liHtml += '<img src="img/LivingPayment/telephone_fee_2.png" />';
							liHtml += '</div>';
							liHtml += '<div class="RechargeElectricity_dl_mys float">';
							liHtml += '<dl class="RechargeElectricity_dl_firest width">';
							liHtml += '<dt>话费充值 - ' + NewsList[i].CostOfPhone + '</dt>';
							liHtml += '<dd class="btl_color_h">' + NewsList[i].PaymentStatus + '</dd>';
							liHtml += '</dl>';
							liHtml += '<dl class="RechargeElectricity_dl_last width">';
							liHtml += '<dt class="btl_color_999">' + NewsList[i].TimeOfSubmit + '</dt>';
							liHtml += '<dd class="btl_color_red">+' + NewsList[i].AmountOfCost + '元(CUBU-' + NewsList[i].AssetsOFCost + ')</dd>';
							liHtml += '</dl>';
							liHtml += '</div>';
							liHtml += '</li>';
						}
						$("#CallFeeDetails_ymlist_s").append(liHtml);
					} else {
						$("#CallFeeDetails_ymlist_s").html('<p style="text-align: center;">暂无充值记录</p>');
					}
				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	},
	JumpCalLCharge: function(CostOfLifeDetailID) { //跳转话费详细
		$$("#sys-toolbar").hide('slow');
		myApp.getCurrentView().router.load({
			url: "pages/Utility/CallDetailsplus.html?CostOfLifeDetailID=" + CostOfLifeDetailID
		});
	},
	TelephoneFeeDetailsRender: function(CostOfLifeDetailID) { //话费详情渲染
		var DATA = new Object();
		DATA.CostOfLifeDetailID = CostOfLifeDetailID;
		setTimeout(function() {
			sysUtil.ajaxTool.requestGetData("WebApiLifePayment", "GetMyCostOfLifeDetailModel", METHOD_GET, DATA, function(data) {
				if(data.boolResult) {
					console.log(data);
					var NewsList = data.returnData;
					$("#CallDetailsplus_float_ert").html(NewsList.PhoneUnitName);
					$("#CallDetailsplus_li_a").html('<li id="CallDetailsplus_li_a">+ ' + NewsList.AmountOfCost + '元<span>(CUBC:-' + NewsList.AssetsOFCost + ')</span></li>');
					$("#CallDetailsplus_li_c").html('<li id="CallDetailsplus_li_c"><label>手机号：</label>' + NewsList.CostOfPhone + '</li>');
					$("#CallDetailsplus_li_d").html('<li id="CallDetailsplus_li_d"><label>订单号:</label>' + NewsList.CostCode + '</li>')

				} else {
					sysUtil.commonUtil.alertMsg(data.returnMsg);
				}
			});
		}, 400);
	}
}