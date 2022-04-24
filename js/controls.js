import '../assets/css/style.css'

//scene
//like a container that holds all objects
import * as THREE from 'three';
import {color} from "three/examples/jsm/nodes/ShaderNode";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

var xSpeed = 0;
var ySpeed = 0;
var xRotation = 0;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
});


//moving

var audio = new Audio('/assets/audio/Lonely-fire.mp3');
// audio.play();


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.rotateX(50);


renderer.render(scene, camera);


//octa1
const geometry1 = new THREE.OctahedronGeometry(10, 3);
const material1 = new THREE.MeshStandardMaterial({color: 0xFFFFFF, wireframe: true});
const octa1 = new THREE.Mesh(geometry1, material1);

//octa1
let size = 1;
const geometry2 = new THREE.TetrahedronGeometry(size, 0);
const material2 = new THREE.MeshStandardMaterial({color: 0x664477});
const octa2 = new THREE.Mesh(geometry2, material2);

const geometry3 = new THREE.BoxGeometry(2, 2, 2, 2, 2, 2);
const material3 = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
const spacecraft = new THREE.Mesh(geometry3, material3);

spacecraft.position.set(10, 10, 10);

scene.add(octa1, octa2, spacecraft);

const pointLight = new THREE.PointLight(0x7700FF);
pointLight.position.set(10, 10, 10);

const ambientLight = new THREE.AmbientLight(0xFF7700, 0.5);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);


function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        xRotation += 0.001;
    } else if (xRotation > 0) {
        xRotation = 0;
    }

    if (keyCode == 83) {
        xRotation -= 0.001;
    } else if (xRotation < 0) {
        xRotation = 0;
    }
    // if (keyCode == 65) {
    // } else if (keyCode == 68) {
    // } else if (keyCode == 32) {
    //     spacecraft.position.set(0, 0, 0);
    // }
}
;

var position = new THREE.Vector3();

const geometry = new THREE.SphereGeometry(0.1, 24, 24)


function addStar() {
    const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
    star.position.set(x, y, z);
    scene.add(star);
}

Array(5000).fill().forEach(addStar);


function animate() {
    requestAnimationFrame(animate);

    octa1.rotation.y += 0.005;

    octa2.rotation.x -= 0.01;
    octa2.rotation.y -= 0.005;
    octa2.rotation.z -= 0.01;

    octa2.translateY(0.01);
    octa2.translateX(0.01);

    camera.position.set(spacecraft.position.x, spacecraft.position.y + 10, spacecraft.position.z + 10);
    document.addEventListener("keydown", onDocumentKeyDown, false);

    spacecraft.position.z += 0.1;
    spacecraft.rotateX(xRotation);
    spacecraft.position.y += ySpeed;

    pointLight.rotation.x += 0.01;
    pointLight.rotation.y += 0.01;
    pointLight.rotation.z += 0.01;
    pointLight.translateY(0.01);
    pointLight.translateX(0.01);
    pointLight.translateZ(0.01);

    controls.update;

    renderer.render(scene, camera);
}

animate();
