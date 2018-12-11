var sysWallet = {
	backWallet: function() { //返回到钱包,钱包明细页面使用		
		mainView.router.back({
			pageName: 'Modify_wallet', //页面的data-page值
			force: true //注意此参数back方法专用
		});
		myApp.showTab('#tabwallet');
		SetToobarSelectStyle("mylink");
		$$('#sys-toolbar').show('slow');
		SetToobarSelectStyle("walletlink"); //初始化钱包数据
	},
	//母币资产上拉加载页面代码
	rootAssetsPullRefresh: function() {
		// 加载flag
		var loading = false;
		$$('#rootAssetsScrollId').on('infinite', function() {
			// 注册'infinite'事件处理函数

			// 如果正在加载，则退出
			if(loading) return;

			// 设置flag
			loading = true;

			// 模拟1s的加载过程
			setTimeout(function() {
				// 重置加载flag
				loading = false;
				// 更新最后加载的序号
				rootAssetsPageIndex = parseInt(rootAssetsPageIndex) + 1;
				if(rootAssetsPageIndex >= rootAssetsPageCount) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					myApp.detachInfiniteScroll($$('.infinite-scroll'));
					// 删除加载提示符
					$$("#rootAssetsLodingScroll").remove();
					return;
				}

				// 获取下一页的内容
				sysWallet.GetUserWalletsList(parseInt(rootAssetsPageIndex));

			}, 1000);
		});
	},
	//获取母币钱包列表
	GetUserWalletsList: function(rootAssetsPageIndex) {
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.PageIndex = rootAssetsPageIndex;
		DATA.PageSize = 11;
		sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetUserWalletDetail", METHOD_GET, DATA, function(data) {
			var RootWalletDetail = $("#RootWalletDetail");
			if(data.boolResult) {
				var rootData = data.returnData.rows;
				rootAssetsPageCount = data.returnData.PageCount;				
				
					for(var i = 0; i < rootData.length; i++) {
						var detailAssets = rootData[i].DetailAssets;
						var listhtml = '<li class="item-content wallet-item-content">';
						listhtml += '<div class="item-inner power-wallet-list" onclick="sysIndex.linkrootAssetsDetailed(' + rootData[i].WalletDetailID + ')">';
						listhtml += '<div class="item-title-row wallet-item-title">';
						if(parseFloat(detailAssets) > 0) {
							listhtml += '<span class="item-left left-just"> ' + detailAssets + '</span>';
						} else {
							listhtml += '<span class="item-left left-negative">' + detailAssets + '</span>';
						}
						listhtml += '<span class="item-right">' + rootData[i].AssetsType + '</span>';
						listhtml += '</div>';
						listhtml += '<div class="item-title-row wallet-item-title wallet-item-line">';
						listhtml += '<span class="item-left item-left-remark">' + rootData[i].Description + '</span>';
						listhtml += '<span class="item-right item-left-remark">' + rootData[i].CreateTime + '</span>';
						listhtml += '</div>';
						listhtml += '</div></li>';
						if(rootData.length<11){
							$("#rootAssetsLodingScroll").remove();
						}
						RootWalletDetail.append(listhtml);
					}
			
			}
			else{
				$("#rootAssetsLodingScroll").remove();
					RootWalletDetail.append("暂无母币资产信息！");
			}

		});
	},
	//能量值上拉加载页面代码
	powerWalletPullRefresh: function() {
		// 加载flag
		var loading = false;
		$$('#powerWalletId').on('infinite', function() {
			// 注册'infinite'事件处理函数

			// 如果正在加载，则退出
			if(loading) return;

			// 设置flag
			loading = true;

			// 模拟1s的加载过程
			setTimeout(function() {
				// 重置加载flag
				loading = false;
				// 更新最后加载的序号
				powerWalletPageIndex = parseInt(powerWalletPageIndex) + 1;
				if(powerWalletPageIndex >= powerWalletPageCount) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					myApp.detachInfiniteScroll($$('.infinite-scroll'));
					// 删除加载提示符
					$$("#powerWalletLodingScroll").remove();
					return;
				}

				// 获取下一页的内容
				sysWallet.GetPowerWalletDetails(parseInt(powerWalletPageIndex));

			}, 1000);
		});
	},
	//获取能量值列表
	GetPowerWalletDetails: function(powerWalletPageIndex) {
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.PageIndex = powerWalletPageIndex;
		DATA.PageSize = 11;
		sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetPowerWalletDetails", METHOD_GET, DATA, function(data) {
			var PowerWalletDetails = $("#PowerWalletDetails");
			if(data.boolResult) {
				var powerWalletData = data.returnData.rows;
				powerWalletPageCount = data.returnData.PageCount;
				if(powerWalletData.length > 0) {
					for(var i = 0; i < powerWalletData.length; i++) {
						var detailAssets = powerWalletData[i].DetailAssets;
						var listhtml = '<li class="item-content wallet-item-content">';
						listhtml += '<div class="item-inner power-wallet-list" onclick="sysIndex.LinkPowerWalletDetailed('+powerWalletData[i].EnergyValDetail+')">';
						listhtml += '<div class="item-title-row wallet-item-title">';
						if(parseFloat(detailAssets) > 0) {
							listhtml += '<span class="item-left left-just"> ' + powerWalletData[i].EnergyValue + '</span>';
						} else {
							listhtml += '<span class="item-left left-negative"> ' + powerWalletData[i].EnergyValue + '</span>';
						}
						listhtml += '<span class="item-right">' + powerWalletData[i].AssetsType + '</span>';
						listhtml += '</div>';
						listhtml += '<div class="item-title-row wallet-item-title wallet-item-line">';
						listhtml += '<span class="item-left item-left-remark">' + powerWalletData[i].Description + '</span>';
						listhtml += '<span class="item-right item-left-remark">' + powerWalletData[i].CreateTime + '</span>';
						listhtml += '</div>';
						listhtml += '</div></li>';
						if(powerWalletData.length<11){
							$("#powerWalletLodingScroll").remove();
						}
						PowerWalletDetails.append(listhtml);
					}
				} 
			}
			else{
				$("#powerWalletLodingScroll").remove();
				PowerWalletDetails.append("暂无能量值信息");
			}
		});
	},
	//释放钱包上拉加载页面代码
	releaseAssetsPullRefresh: function() {
		// 加载flag
		var loading = false;
		$$('#releaseId').on('infinite', function() {
			// 注册'infinite'事件处理函数

			// 如果正在加载，则退出
			if(loading) return;

			// 设置flag
			loading = true;

			// 模拟1s的加载过程
			setTimeout(function() {
				// 重置加载flag
				loading = false;
				// 更新最后加载的序号
				releaseAssetsPageIndex = parseInt(releaseAssetsPageIndex) + 1;
				if(releaseAssetsPageIndex >= releaseAssetsPageCount) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					myApp.detachInfiniteScroll($$('.infinite-scroll'));
					// 删除加载提示符
					$$("#releaseLodingScroll").remove();
					return;
				}

				// 获取下一页的内容
				sysWallet.GetPowerReleaseAssets(parseInt(releaseAssetsPageIndex));

			}, 1000);
		});
	},
	//获取释放钱包列表
	GetPowerReleaseAssets: function(releasePageIndex) {
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.PageIndex = releasePageIndex;
		DATA.PageSize = 11;
		sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetPowerReleaseAssets", METHOD_GET, DATA, function(data) {
			var ReleaseDetails = $("#ListReleaseDetails");
			if(data.boolResult) {
				var ReleaseAssetsData = data.returnData.rows;
				releaseAssetsPageCount = data.returnData.PageCount;
				if(ReleaseAssetsData.length > 0) {
					for(var i = 0; i < ReleaseAssetsData.length; i++) {
						var detailAssets = ReleaseAssetsData[i].DetailAssets;
						var listhtml = '<li class="item-content wallet-item-content">';
						listhtml += '<div class="item-inner power-wallet-list" onclick="sysIndex.linkreleaseDetailed('+ReleaseAssetsData[i].ReleaseDetailID+')">';
						listhtml += '<div class="item-title-row wallet-item-title">';
						if(parseFloat(detailAssets) > 0) {
							listhtml += '<span class="item-left left-just"> ' + detailAssets + '</span>';
						} else {
							listhtml += '<span class="item-left left-negative">' + detailAssets + '</span>';
						}
						listhtml += '<span class="item-right">' + ReleaseAssetsData[i].AssetsType + '</span>';
						listhtml += '</div>';
						listhtml += '<div class="item-title-row wallet-item-title wallet-item-line">';
						listhtml += '<span class="item-left item-left-remark">' + ReleaseAssetsData[i].Description + '</span>';
						listhtml += '<span class="item-right item-left-remark">' + ReleaseAssetsData[i].CreateTime + '</span>';
						listhtml += '</div>';
						listhtml += '</div></li>';
						if(ReleaseAssetsData.length<11){
							$("#releaseLodingScroll").remove();
						}
						ReleaseDetails.append(listhtml);
					}
				} 
			}
			else 
			{
				$("#releaseLodingScroll").remove();
				ReleaseDetails.append("暂无释放资产信息");
			}
		});
	},
	//糖果派送上拉加载
	sugarAssetsPullRefresh: function() {
		// 加载flag
		var loading = false;
		$$('#sugarAssetsId').on('infinite', function() {
			// 注册'infinite'事件处理函数

			// 如果正在加载，则退出
			if(loading) return;

			// 设置flag
			loading = true;

			// 模拟1s的加载过程
			setTimeout(function() {
				// 重置加载flag
				loading = false;
				// 更新最后加载的序号
				sugarAssetsPageIndex = parseInt(sugarAssetsPageIndex) + 1;
				if(sugarAssetsPageIndex >= sugarAssetsPageCount) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					myApp.detachInfiniteScroll($$('.infinite-scroll'));
					// 删除加载提示符
					$$("#sugarAssetsLodingScroll").remove();
					return;
				}

				// 获取下一页的内容
				sysWallet.GetSugarAssets(parseInt(sugarAssetsPageIndex));

			}, 1000);
		});
	},
	//获取糖果派送列表
	GetSugarAssets: function(SugarAssetsPageIndex) {
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.PageIndex = SugarAssetsPageIndex;
		DATA.PageSize = 11;
		sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetSugarDetails", METHOD_GET, DATA, function(data) {
			var SugarDetails = $("#SugarDetailsData");
			if(data.boolResult) {
				var sugarAssetsData = data.returnData.rows;
				sugarAssetsPageCount = data.returnData.PageCount;
				if(sugarAssetsData.length > 0) {
					for(var i = 0; i < sugarAssetsData.length; i++) {
						var detailAssets = sugarAssetsData[i].DetailAssets;
						var listhtml = '<li class="item-content wallet-item-content">';
						listhtml += '<div class="item-inner power-wallet-list" onclick="sysIndex.linkIntelligenceDetailed('+sugarAssetsData[i].SugarDetailID+')">';
						listhtml += '<div class="item-title-row wallet-item-title">';
						if(parseFloat(detailAssets) > 0) {
							listhtml += '<span class="item-left left-just"> ' + detailAssets + '</span>';
						} else {
							listhtml += '<span class="item-left left-negative">' + detailAssets + '</span>';
						}
						listhtml += '<span class="item-right">' + sugarAssetsData[i].AssetsType + '</span>';
						listhtml += '</div>';
						listhtml += '<div class="item-title-row wallet-item-title wallet-item-line">';
						listhtml += '<span class="item-left item-left-remark">' + sugarAssetsData[i].Description + '</span>';
						listhtml += '<span class="item-right item-left-remark">' + sugarAssetsData[i].CreateTime + '</span>';
						listhtml += '</div>';
						listhtml += '</div></li>';
						if(sugarAssetsData.length<11){
							$("#sugarAssetsLodingScroll").remove();
						}
						SugarDetails.append(listhtml);
					}
				} 
			}else {
				$("#sugarAssetsLodingScroll").remove();
				SugarDetails.append("暂无糖果派送信息");
			}
		});
	},
	//线性奖励上拉加载页面代码
	linerMultiplePullRefresh: function() {
		// 加载flag
		var loading = false;
		$$('#linerMultipleId').on('infinite', function() {
			// 注册'infinite'事件处理函数

			// 如果正在加载，则退出
			if(loading) return;

			// 设置flag
			loading = true;

			// 模拟1s的加载过程
			setTimeout(function() {
				// 重置加载flag
				loading = false;
				// 更新最后加载的序号
				linerMultiplePageIndex = parseInt(linerMultiplePageIndex) + 1;
				if(linerMultiplePageIndex >= linerMultiplePageCount) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					myApp.detachInfiniteScroll($$('.infinite-scroll'));
					// 删除加载提示符
					$$("#linerMultipleLodingScroll").remove();
					return;
				}

				// 获取下一页的内容
				sysWallet.GetLinerMultiple(parseInt(linerMultiplePageIndex));

			}, 1000);
		});
	},
	//获取线性奖励列表
	GetLinerMultiple: function(linerMultiplePageIndex) {
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.PageIndex = linerMultiplePageIndex;
		DATA.PageSize = 11;
		sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetLinerMultiple", METHOD_GET, DATA, function(data) {
			var LinerMultiple = $("#LinerMultiple");
			if(data.boolResult) {
				var linerMultipleData = data.returnData.rows;
				linerMultiplePageCount = data.returnData.PageCount;
				if(linerMultipleData.length > 0) {
					for(var i = 0; i < linerMultipleData.length; i++) {
						var LinerRewordValue = linerMultipleData[i].LinerRewordValue;
						var listhtml = '<li class="item-content wallet-item-content">';
						listhtml += '<div class="item-inner power-wallet-list" onclick="sysIndex.linkDetailed('+linerMultipleData[i].LinerRewordID+')">';
						listhtml += '<div class="item-title-row wallet-item-title">';
						if(parseFloat(LinerRewordValue) > 0) {
							listhtml += '<span class="item-left left-just"> ' + LinerRewordValue + '</span>';
						} else {
							listhtml += '<span class="item-left left-negative">' + LinerRewordValue + '</span>';
						}
						listhtml += '<span class="item-right">' + linerMultipleData[i].AssetsType + '</span>';
						listhtml += '</div>';
						listhtml += '<div class="item-title-row wallet-item-title wallet-item-line">';
						listhtml += '<span class="item-left item-left-remark">' + linerMultipleData[i].Remark + '</span>';
						listhtml += '<span class="item-right item-left-remark">' + linerMultipleData[i].CreateTime + '</span>';
						listhtml += '</div>';
						listhtml += '</div></li>';
						if(linerMultipleData.length<11){
							$("#linerMultipleLodingScroll").remove();
						}
						LinerMultiple.append(listhtml);
					}
				} 
			}else {
			    $("#linerMultipleLodingScroll").remove();	
			    LinerMultiple.append("暂无线性奖励信息");
			}
		});
	},
	//消费钱包上拉加载页面代码
	shopingDetailsPullRefresh: function() {
		// 加载flag
		var loading = false;
		$$('#shopingDetailsId').on('infinite', function() {
			// 注册'infinite'事件处理函数

			// 如果正在加载，则退出
			if(loading) return;

			// 设置flag
			loading = true;

			// 模拟1s的加载过程
			setTimeout(function() {
				// 重置加载flag
				loading = false;
				// 更新最后加载的序号
				shopingDetailsPageIndex = parseInt(shopingDetailsPageIndex) + 1;
				if(shopingDetailsPageIndex >= shopingDetailsPageCount) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					myApp.detachInfiniteScroll($$('.infinite-scroll'));
					// 删除加载提示符
					$$("#shopingDetailsLodingScroll").remove();
					return;
				}

				// 获取下一页的内容
				sysWallet.GetShopingDetails(parseInt(shopingDetailsPageIndex));

			}, 1000);
		});
	},
	//获取消费钱包列表
	GetShopingDetails: function(shopingDetailsPageIndex) {
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.PageIndex = shopingDetailsPageIndex;
		DATA.PageSize = 11;
		sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetShopingDetails", METHOD_GET, DATA, function(data) {
			var ShopingDetails = $("#ShopingDetails");
			if(data.boolResult) {
				var shopingDetailsData = data.returnData.rows;
				shopingDetailsPageCount = data.returnData.PageCount;
				if(shopingDetailsData.length > 0) {
					for(var i = 0; i < shopingDetailsData.length; i++) {
						var DetailAssets = shopingDetailsData[i].DetailAssets;
						var listhtml = '<li class="item-content wallet-item-content">';
						listhtml += '<div class="item-inner power-wallet-list" onclick="sysIndex.LinkshoppingDetailed('+shopingDetailsData[i].ShopingDetailID+')">';
						listhtml += '<div class="item-title-row wallet-item-title">';
						if(parseFloat(DetailAssets) > 0) {
							listhtml += '<span class="item-left left-just">' + DetailAssets + '</span>';
						} else {
							listhtml += '<span class="item-left left-negative">' + DetailAssets + '</span>';
						}
						listhtml += '<span class="item-right"></span>';
						listhtml += '</div>';
						listhtml += '<div class="item-title-row wallet-item-title wallet-item-line">';
						listhtml += '<span class="item-left item-left-remark">' + shopingDetailsData[i].Description + '</span>';
						listhtml += '<span class="item-right item-left-remark">' + shopingDetailsData[i].CreateTime + '</span>';
						listhtml += '</div>';
						listhtml += '</div></li>';
						if (shopingDetailsData.length<11) {
							$("#shopingDetailsLodingScroll").remove();
						} else{
							
						}
						ShopingDetails.append(listhtml);
					}
				} 
			}else {
				    $("#shopingDetailsLodingScroll").remove();
					ShopingDetails.append("暂无消费钱包信息");
				}
		});
	},
	//交易钱包上拉加载页面代码
	transDetailsPullRefresh: function() {
		// 加载flag
		var loading = false;
		$$('#transDetailsId').on('infinite', function() {
			// 注册'infinite'事件处理函数

			// 如果正在加载，则退出
			if(loading) return;

			// 设置flag
			loading = true;

			// 模拟1s的加载过程
			setTimeout(function() {
				// 重置加载flag
				loading = false;
				// 更新最后加载的序号
				transDetailsPageIndex = parseInt(transDetailsPageIndex) + 1;
				if(transDetailsPageIndex >= transDetailsPageCount) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					myApp.detachInfiniteScroll($$('.infinite-scroll'));
					// 删除加载提示符
					$$('#TrasactionLodingScroll').remove();
					return;
				}

				// 获取下一页的内容
				sysWallet.GetTransDetails(parseInt(transDetailsPageIndex));

			}, 1000);
		});
	},
	//获取交易钱包列表
	GetTransDetails: function(transDetailsPageIndex) {
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.PageIndex = transDetailsPageIndex;
		DATA.PageSize = 11;
		sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetTransDetails", METHOD_GET, DATA, function(data) {
			var TransDetails = $("#TransDetails");
			if(data.boolResult) {
				var transDetailsData = data.returnData.rows;
				transDetailsPageCount = data.returnData.PageCount;
				if(transDetailsData.length > 0) {
					for(var i = 0; i < transDetailsData.length; i++) {
						var DetailAssets = transDetailsData[i].DetailAssets;
						var listhtml = '<li class="item-content wallet-item-content">';
						listhtml += '<div class="item-inner" onclick="sysIndex.linktranscationDetailed('+transDetailsData[i].TransDetailID+')">';
						listhtml += '<div class="item-title-row wallet-item-title">';
						if(parseFloat(DetailAssets) > 0) {
							listhtml += '<span class="item-left left-just"> ' + DetailAssets + '</span>';
						} else {
							listhtml += '<span class="item-left left-negative">' + DetailAssets + '</span>';
						}
						listhtml += '<span class="item-right">' + transDetailsData[i].AssetsType + '</span>';
						listhtml += '</div>';
						listhtml += '<div class="item-title-row wallet-item-title wallet-item-line">';
						listhtml += '<span class="item-left item-left-remark">' + transDetailsData[i].Description + '</span>';
						listhtml += '<span class="item-right item-left-remark">' + transDetailsData[i].CreateTime + '</span>';
						listhtml += '</div>';
						listhtml += '</div></li>';
						if(transDetailsData.length<11){
							$("#TrasactionLodingScroll").remove();
						}
						TransDetails.append(listhtml);
					}
				} 
			}else {
				    $("#TrasactionLodingScroll").remove();
					TransDetails.append("暂无交易信息！");
			}
		});

	},
	GetTotalAssets: function() {
		var DATA = new Object();
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.TypeId = $("#WalletCategory").val()
		sysUtil.ajaxTool.requestGetData("WebApiWallet", "GetTotalAssets", METHOD_GET, DATA, function(data) {
			var txtVerifyRealNameIdCard = $("#txtTransctionDetailAssets");
			if(data.boolResult) {
				txtVerifyRealNameIdCard.val();
				if(parseFloat(data.returnData) >= 0) {
					txtVerifyRealNameIdCard.val(data.returnData)
				}
			} else {
				txtVerifyRealNameIdCard.val(0);
			}
		});
	},
	AddTransDetails: function() {
		var DATA = new Object();
		DATA.Token = sysUtil.storageUtil.getUserData("Token");
		DATA.UserID = sysUtil.storageUtil.getUserData("UserID");
		DATA.TypeId = $("#WalletCategory").val()
		DATA.DetailAssets = $("#txtTransctionDetailAssets").val();
		sysUtil.ajaxTool.requestGetData("WebApiWallet", "AddTransDetails", METHOD_GET, DATA, function(data) {
			
			if(data.boolResult) {
				layer.open({
					content: data.returnData,
					skin: 'msg',
					time: 2, //2秒后自动关闭
					end:function(){
						$("#txtTransctionDetailAssets").val("");
					}
				});
			} else {
				layer.open({
					content: data.returnData,
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			}
		});
	}

};