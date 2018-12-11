//系统 专用配置参数
/*************************************************************************************/
//系统用到的操作常量

var BASE_VERIFLYTYPEBREGIST = 1;   //注册获取验证码校验类型
var BASE_VERIFLYTYPEBBAIND = 2;    //绑定手机号验证码校验类型
var BASE_VERIFLYTYPEBFORGET = 3;   //忘记密码验证码校验类型
var BASE_VERIFLYTYPEBBankcard = 4; //绑定银行卡验证码校验类型
var BASE_VERIFLYTYPEBAlipay = 5;   //绑定支付宝验证码校验类型
var BASE_VERIFLYTYPEBWeChat = 6;   //绑定微信验证码校验类型
var BASE_VERIFLYTYPEBDealPwd = 7;  //设置资金密码验证码校验类型
var BASE_VERIFLYTYPEBlogin = 8;    //手机登录验证码校验类型

var BASE_LOGINTYPEMOBILE = 1; //手机登录方式
var BASE_APPREGIST=1;//手机app注册

var BASE_NICKLENGTH=7;//昵称长度限制

//提交数据方式
var METHOD_GET="GET";
var METHOD_POST="POST";
var URL_VERSION="http://120.78.171.102:8010/DownLoadFile/version.json?v="+Math.floor(Math.random() * 1000000);
var dtask=null;
var localversion;
// 默认视图
var myView;
var textSearch="null";

//帮助页面全局变量
var thisPageIndex = 0;//第几页
var thisPageCount=0;
var PageSize = 10;
//
////行业资讯全局变量
var NewsPageSize=0;
var PageIndex = 0;
var PageCount = 0;


////用户列表全局变量
var UserPageSize = 0;
var UserPageIndex = 0;
var UserPageCount = 0;

//我的广告全局变量

var pageSize = 0;
var myAdPageIndex = 0;
var MyAdPageCount = 0;
/*************************************************************************************/

//购买页面全局变量
var PurchaseIndex = 0;
var PurchaseLoading = 0;

//母币资产全局变量

var rootAssetsPageIndex = 0;
var rootAssetsPageCount = 0;

//释放钱包资产全局变量

var releaseAssetsPageIndex = 0;
var releaseAssetsPageCount = 0;

//能量值资产全局变量

var powerWalletPageIndex = 0;
var powerWalletPageCount = 0;

//糖果派送资产全局变量

var sugarAssetsPageIndex = 0;
var sugarAssetsPageCount = 0;

//糖果派送资产全局变量

var linerMultiplePageIndex = 0;
var linerMultiplePageCount = 0;


//消费钱包资产全局变量

var shopingDetailsPageIndex = 0;
var shopingDetailsPageCount = 0;

//交易钱包资产全局变量

var transDetailsPageIndex = 0;
var transDetailsPageCount = 0;
//今日单价全局变量
var PublicIndexUnitPrice=0;
var PublicTransactionMin=0;
var PublicTransactionMax=0;

//获取编辑广告全局变量
var PublicFloration = 0; // 浮动比例
//交易按钮事件控制
var BuyOrSellClicked=true;
var SellReleaseMoney=true;

//地区版本号
var IndexAreaVersion;
var myquerys;
var dtask =null;

//扫描页面参数
var IsScan=false;
var scan=null;
var otherPurseAdress=null;

//测试服务器地址,用户访问api接口使用
var BASIC_HOST = "http://192.168.0.13:1881/Api/"; //本机测试地址 15

// 测试服务器,用于访问推荐注册用户使用
var BASIC_HOST_URL = "http://192.168.0.13:1881/"; //内网测试地址
//
//var BASIC_HOST = "http://192.168.0.13:1880/Api/"; //本机测试地址 15
//
//// 测试服务器,用于访问推荐注册用户使用
//var BASIC_HOST_URL = "http://192.168.0.13:1880/"; //内网测试地址

////测试服务器地址,用户访问api接口使用
//var BASIC_HOST = "http://120.78.171.102:8009/Api/"; //本机测试地址 15
//
//// 测试服务器,用于访问推荐注册用户使用
//var BASIC_HOST_URL = "http://120.78.171.102:8009/"; //内网测试地址

//外网服务器地址
//var BASIC_HOST = "https://cubcvip.com/Api/";
//
////服务器地址
//var BASIC_HOST_URL = "https://cubcvip.com/";