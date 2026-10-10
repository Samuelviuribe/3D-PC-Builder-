import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


let scene, camera, renderer, controls, light, loader, contenedor;

const params = {
    intensity: 1
}

//3 cosas principales para iniciar con el 3d (scene, loader, camera).
scene = new THREE.Scene();

loader = new GLTFLoader();

camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

//esto es importantisimo la posicion de la camara
camera.position.z = 5;

renderer = new THREE.WebGLRenderer();
renderer.domElement.id = 'canva_id'
renderer.setSize(975,668);
contenedor = document.getElementById('container');
contenedor.appendChild(renderer.domElement)

//controla la direcion de la camara en el render 
controls = new OrbitControls (camera, renderer.domElement);


//ligths
light = new THREE.DirectionalLight(0xFFFFFF, params.intensity);
light.position.set(0,-5,10);
light.target.position.set(5, 0, 0);
scene.add(light);
scene.add(light.target); 




//loading

loader.load('/models/RTX+3080Ti.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});


function animate (time){
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


