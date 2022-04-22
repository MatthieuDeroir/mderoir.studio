import './assets/css/style.css'

//scene
//like a container that holds all objects
import * as THREE from 'three';
import {color} from "three/examples/jsm/nodes/ShaderNode";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.OctahedronGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
const octa = new THREE.Mesh(geometry, material);

scene.add(octa);

function animate() {
    requestAnimationFrame(animate);
    octa.rotation.x += 0.01;
    octa.rotation.y += 0.005;
    octa.rotation.z += 0.01;
    renderer.render(scene, camera);
}

animate();
