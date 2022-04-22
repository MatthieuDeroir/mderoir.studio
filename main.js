import './assets/css/style.css'

//scene
//like a container that holds all objects
import * as THREE from 'three';
import {color} from "three/examples/jsm/nodes/ShaderNode";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);


//octa1
const geometry1 = new THREE.OctahedronGeometry(10, 3);
const material1 = new THREE.MeshStandardMaterial({color: 0xFFFFFF, wireframe: true});
const octa1 = new THREE.Mesh(geometry1, material1);

//octa1
let size = 4;
const geometry2 = new THREE.TetrahedronGeometry(size, 1);
const material2 = new THREE.MeshStandardMaterial({color: 0x664477});
const octa2 = new THREE.Mesh(geometry2, material2);

scene.add(octa1);
scene.add(octa2);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(10, 10, 10);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    octa1.rotation.x += 0.01;
    octa1.rotation.y += 0.005;
    octa1.rotation.z += 0.01;

    octa2.rotation.x -= 0.01;
    octa2.rotation.y -= 0.005;
    octa2.rotation.z -= 0.01;

    controls.update;

    renderer.render(scene, camera);
}

animate();
