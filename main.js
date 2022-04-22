import './assets/css/style.css'

//scene
//like a container that holds all objects
import * as THREE from 'three';
import {color} from "three/examples/jsm/nodes/ShaderNode";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

var xSpeed = 1;
var ySpeed = 1;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
});

//moving


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

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

scene.add(octa1);
scene.add(octa2);

const pointLight = new THREE.PointLight(0x7700FF);
pointLight.position.set(10, 10, 10);

const ambientLight = new THREE.AmbientLight(0xFF7700, 0.5);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);


function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        octa1.translateZ(-ySpeed);
    } else if (keyCode == 83) {
        octa1.position.z += ySpeed;
    } else if (keyCode == 65) {
        octa1.position.x -= xSpeed;
    } else if (keyCode == 68) {
        octa1.position.x += xSpeed;
    } else if (keyCode == 32) {
        octa1.position.set(0, 0, 0);
    }
};

var position = new THREE.Vector3();

function addStar() {
    const geometry = new THREE.SphereGeometry(0.1, 24, 24)
    const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(2000).fill().forEach(addStar);


function animate() {
    requestAnimationFrame(animate);
    // octa1.rotation.x += 0.01;
    // octa1.rotation.y += 0.005;
    // octa1.rotation.z += 0.01;
    // octa1.translateZ(-1);

    position.getPositionFromMatrix(octa1.matrixWorld);


    document.addEventListener("keydown", onDocumentKeyDown, false);

    octa2.rotation.x -= 0.01;
    octa2.rotation.y -= 0.005;
    octa2.rotation.z -= 0.01;

    octa2.translateY(0.01);
    octa2.translateX(0.01);


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
