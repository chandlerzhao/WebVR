/**
 * Created by hasee on 2017/5/7.
 */


setInterval(trace,1000);
function trace(){
    var nowTime = new Date();
    var checkPoint = {
        username: username,
        timestamp : nowTime.getTime(),
        cameraX : labels.cameraX,
        cameraY : labels.cameraY,
        cameraZ : labels.cameraZ,
        long : labels.longitude,
        lat : labels.latitude,
        finalLoadTime: finalLoadTime.toFixed(2),
        pathname: window.location.pathname
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8081/",true);
    xhr.send(JSON.stringify(checkPoint));
}
