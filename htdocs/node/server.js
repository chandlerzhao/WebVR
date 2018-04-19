/**
 * Created by hasee on 2017/5/7.
 */
var http = require('http');  //引入必要的http、mysql、与字符串处理模块
var mysql = require('mysql');
var querystring = require('querystring');
var url = require('url');

// 数据库连接参数
var DB_NAME = "defaultDB";
var TABLE_NAME='tracetbl';
var client = mysql.createConnection({
    user:"root",
    password: '',
    host:'localhost'
});

// 建立数据库连接
client.connect();
client.query("use " + DB_NAME);


// 建立轨迹跟踪服务器
var trackServer = http.createServer(function(request,response){
    var body = new Buffer("ok");
    var dataPoint = {},dataStr, ua;
    request.on('data',function(data){ // 接收来自client的数据
	dataPoint = JSON.parse(data.toString());
        dataPoint["ip"] = request.connection.remoteAddress;  // 记录ip
        dataPoint["ua"] = request.headers['user-agent'];     // 记录浏览器字符串
        var sqlquery =  "INSERT INTO " + TABLE_NAME + " VALUES('"   // 写入数据库
            + dataPoint["username"] + "','"
            + dataPoint["ip"] + "','"
            + dataPoint["ua"] + "',"
            + dataPoint.timestamp + ','
            + dataPoint.cameraX + ','
            + dataPoint.cameraY + ','
            + dataPoint.cameraZ +','
            + dataPoint.long +','
            + dataPoint.lat + ','
            + dataPoint.finalLoadTime +  ');';
	console.log("#1 Querying:", sqlquery, "\n");
client.query(sqlquery);
});

// 返回http响应
response.writeHead(200,"success_0",{
    "Content-Length":body.length,
    "Content-Type":"text/plain",
    "Access-Control-Allow-Origin"  : "http://localhost"
});
response.write(body,"utf-8");
response.end();

});

// 建立轨迹抓取服务器
var visServer = http.createServer(function(request, response){
    if(request.url === '/favicon.ico' || request.url === '/undefined'){
        response.end();
    } else {
        var finalResult = [];
        var queryStr = url.parse(request.url,true).query;
        var from = queryStr['from'];  // 抓取起点
        var to = queryStr['to'];      // 抓取时间终点
        console.log("from=" + from + " to=" + to);;
        var sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE timestamp >= " + from
            + " AND timestamp < " + to ;
	console.log("#2 Querying:", sqlQuery, "\n");
        client.query(sqlQuery, function(error,results,fields){
            results.forEach(function(e){
                finalResult.push(e);
            });
            response.writeHead(200,"success_0",{
                "Content-Type":"text/plain",
                "Access-Control-Allow-Origin"  : "http://localhost"
            });

            response.end(JSON.stringify(finalResult));  // 写入响应
        });
    }
});

// 轨迹记录服务器运行
trackServer.listen(8081,"0.0.0.0",function(){
    console.log("轨迹记录服务器运行中...");
});

// 轨迹抓取服务器运行
visServer.listen(8082,"0.0.0.0",function(){
    console.log("轨迹显示服务器运行中...")
});
