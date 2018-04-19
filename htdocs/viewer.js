/**
 * Created by hasee on 2017/5/7.
 */


var materialMap = {};
var routes = {};
var newPoints = [];
var lastTime = new Date(0);
var nowTime;

    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0]; ;
        if(e && e.keyCode==113){
            fetchNewPoints();
        }
    }


setInterval(fetchNewPoints,1000);
    function fetchNewPoints(){
        var xhr = new XMLHttpRequest();
        nowTime = new Date();
        xhr.open("GET","http://localhost:8082/?from="+lastTime.getTime() + "&to=" + nowTime.getTime(),true);
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                newPoints=JSON.parse(xhr.responseText);
            }
        }


        //console.log(newPoints.length);
        if(newPoints.length > 0){
            newPoints.forEach(function(e){
                if(!(e["ip_addr"] in materialMap)){
                    var newColor = Math.floor(Math.random()*204+51) + Math.floor(Math.random()*204+51)*256 + Math.floor(Math.random()*204+51)*256 *256;
                    var newMaterial = new THREE.LineBasicMaterial({color:newColor});
                    materialMap[e["ip_addr"]] = newMaterial;
                    routes[e["ip_addr"]]=[];
                }
                var point = e;
                // delete point["ip_addr"];
                // delete point["timestamp"];
                // console.log(point);
                //console.log(routes);
                if(!routes[e["ip_addr"]])
                {
                    routes[e["ip_addr"]] = [];
                }
                routes[e["ip_addr"]].push(point);
            });
        }
        newPoints = [];

        for(route in routes){
            var geometry = new THREE.Geometry();
            routes[route].forEach(function(e){
                geometry.vertices.push(new THREE.Vector3(e.cameraX,e.cameraY,e.cameraZ));
            });
            var line = new THREE.Line(geometry, materialMap[route]);
            scene.add(line);
        }
        lastTime = nowTime;
    }


