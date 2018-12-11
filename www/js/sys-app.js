// Handle Cordova Device Ready Event
// 使用phonegap 调试时使用 使用浏览器调试时使用
myApp.showPreloader("加载数据");
$$(document).on('deviceready', function() {
	//myApp.alert("Welcome!")
	console.log("欢迎您进入系统!");
	//console.log(device.platform);
    //setLocal
    //paraCommonUtil.setLocalLng();
    //Bind Event For index.html
    paraCommonUtil.initBind();
    myApp.hidePreloader();
});

//// 使用H5 plus+ 时使用 打包手机app时候使用,手机调试使用
//////console.log("### H5 plus+ init!");
//document.addEventListener('plusready', function(){  
// 	//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
//  console.log("系统已经准备!");
// 	//alert(window.imagePicker);
// 	
// 	//alert(device.platform);
//	
//  //alert("Device is ready!");
//  //paraCommonUtil.getSettingData();
//  //setLocal
//  //paraCommonUtil.setLocalLng("Login");
//  // Bind Event For index.html
//  paraCommonUtil.initBind();
//  myApp.hidePreloader();
//});