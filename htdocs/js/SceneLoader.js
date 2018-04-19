/**
 * Created by hasee on 2017/5/8.
 */

//Obj Select
function onDocumentMouseMove( event ) {


}

var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;
var deltaMouse = new THREE.Vector2();
var oldMouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
document.addEventListener( 'mousemove', onDocumentMouseMove, false );


$(function() {
    $('#instruction').avgrund({
        height: 150,
        holderClass: 'custom',
        showClose: true,
        showCloseText: 'close',
        onBlurContainer: 'container',
        template: "<b>操作：<br/>W,S,A,D分别向前、后、左、右移动。<br/>R向上移动，F向下移动，鼠标拖动改变视角。<br/>按Shift+方向键加速。</b>"
    });
});

window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener( 'keydown', onKeyDown,false);
window.addEventListener( 'keyup', onKeyUp,false);

function onKeyDown(e){
    switch(e.keyCode){
        case 16:
            camControls.movementSpeed = baseMoveSpeed * moveSpeedFactor;
            break;
    }
}

function onKeyUp(e){
    switch(e.keyCode){
        case 16:
            camControls.movementSpeed = baseMoveSpeed;
            break;
    }
}
var clock = new THREE.Clock();
clock.start();
var scene = new THREE.Scene();
var objId;
var moveSpeedFactor = 2;
var baseMoveSpeed = 300;
// 摄像机
var camera = new THREE.PerspectiveCamera(50, window.innerWidth/ window.innerHeight,0.1,1000000);
var labels;
var renderer = new THREE.WebGLRenderer();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var loadTime = 0, finalLoadTime = 0;

renderer.setClearColor(0xFFFFFF);
renderer.setSize(window.innerWidth, window.innerHeight);
$("#WebGL-output").append(renderer.domElement);
var gl = renderer.getContext();




// 增加FPS指示器
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
$("#stats").append(stats.domElement);

// 增加XYZ轴指示器
var axes = new THREE.AxisHelper(20);
scene.add(axes);

//增加环境光与灯光
var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);
var ambient2 = new THREE.AmbientLight(0xffffff);
scene.add(ambient2);

var directionalLight1 = new THREE.DirectionalLight( 0x909090 );
directionalLight1.position.set( 0, 0, 1 );
var directionalLight2 = new THREE.DirectionalLight( 0x666666);
directionalLight2.position.set( 1, 0 ,0  );
var directionalLight3 = new THREE.DirectionalLight( 0xFFFFFF);
directionalLight3.position.set( 1, -1 ,0  );
var directionalLight4 = new THREE.DirectionalLight( 0x333333 );
directionalLight4.position.set( 0, 0, -1 );
var directionalLight5 = new THREE.DirectionalLight( 0x333333);
directionalLight5.position.set( -1, 0 ,0  );
var directionalLight6 = new THREE.DirectionalLight( 0x333333);
directionalLight6.position.set( 0, -1 ,0  );
var directionalLight7 = new THREE.DirectionalLight( 0x333333);
directionalLight7.position.set( -1, -1 ,-1  );
var directionalLight8 = new THREE.DirectionalLight( 0x333333);
directionalLight8.position.set( -1, -1 ,1  );
//        scene.add(directionalLight1);
//        scene.add(directionalLight2);
// scene.add(directionalLight3);
//        scene.add(directionalLight4);
//        scene.add(directionalLight5);
//        scene.add(directionalLight6);
//        scene.add(directionalLight7);
//        scene.add(directionalLight8);
// var hemiLight = new THREE.HemisphereLight(0xffffff,0xffffff, 0.6);
// hemiLight.position.set(0, 500, 0);
// scene.add(hemiLight);
// var hemiLight2 = new THREE.HemisphereLight(0xffffff,0xffffff, 0.6);
// hemiLight.position.set(0, 500, 0);
// scene.add(hemiLight2);



// FPC摄像机控制器
var camControls = new THREE.FirstPersonControls(camera);
camControls.lookSpeed = 5;
camControls.movementSpeed = baseMoveSpeed;
camControls.noFly = true;
camControls.lookVertical = true;
camControls.constrainVertical = true;
camControls.verticalMin = 1.0;
camControls.verticalMax = 2.0;
camControls.lon=-90;
camControls.lat = -10;

// 增加摄像机指示器
initGUI();
function initGUI() {
    labels = new function(){
        this.cameraX = camera.position.x;
        this.cameraY = camera.position.y;
        this.cameraZ = camera.position.z;
        this.longitude = camControls.lon;
        this.latitude = camControls.lat;
        this.moveSpeed = camControls.movementSpeed;
    };
    var gui = new dat.GUI();
    gui.domElement.id = 'gui';
    gui.add(labels,'cameraX').listen();
    gui.add(labels,'cameraY').listen();
    gui.add(labels,'cameraZ').listen();
    gui.add(labels,'longitude').listen();
    gui.add(labels,'latitude').listen();
    gui.add(labels,'moveSpeed').listen();
}
function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

// 渲染
animate();

function animate() {
    requestAnimationFrame( animate );
    labels.cameraX = camera.position.x;
    labels.cameraY = camera.position.y;
    labels.cameraZ = camera.position.z;
    labels.latitude = camControls.lat;
    labels.longitude = camControls.lon;
    labels.moveSpeed = camControls.movementSpeed;
    render();
}
// var redMaterial = new THREE.LineBasicMaterial({color:0xff0000});
function render() {
    stats.update();
    camControls.update(clock.getDelta());
    renderer.render( scene, camera );
}
