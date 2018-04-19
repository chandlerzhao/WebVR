/**
 * Created by hasee on 2017/5/8.
 */
var chromeStr = "Chrome/5";
var chromePattern = new RegExp(chromeStr);
var ua = navigator.userAgent;
var platstr = navigator.platform;
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("Trident") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}
function platform(){
    var macPattern = new RegExp("Mac");
    var winPattern = new RegExp("Win");
    var androidPattern = new RegExp("Android");
    if(macPattern.test(platstr))
        return "Mac";
    if(winPattern.test(platstr))
        return "Win";
    if(androidPattern.test(platstr))
        return "Android";
}

//以下是调用上面的函数
var mb = myBrowser();
var plat = platform();
if(plat == "Android") {
    alert("你使用的是安卓手机，请使用电脑访问！");
    window.stop();
}

if(!chromePattern.test(ua)){
    alert("须使用最新版本Chrome浏览器,\n,你使用的是 "+ mb +"浏览器.\n即将跳转至Chrome(58.0)下载页面,请稍候...");
    if(mb=="IE"){
        document.execCommand("stop");
    } else {
        window.stop();
    }
    if(plat =="Win")
        window.location.href="http://webvr.chinacloudapp.cn/chrome/ChromeStandalone_58.0.3029.96_Setup.exe";
    if(plat == "Mac")
        window.location.href="http://webvr.chinacloudapp.cn/chrome/googlechrome_mac_55.0.2883.95.dmg";
}

