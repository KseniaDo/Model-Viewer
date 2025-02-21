import * as THREE from 'three';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);;
const renderer = new THREE.WebGLRenderer();
let canvas;
let model;

function initialize() {
    // Проверка на поддержку WebGL
    if ( WebGL.isWebGL2Available()) {
        scene.background = new THREE.Color(0x808080);

        camera.position.z = 600;

        // Освещение
        const light = new THREE.AmbientLight(0x404040, 1.2);
        light.position.set(0, 10, 10);
        scene.add(light);
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        scene.add( directionalLight );

        renderer.setSize( window.innerWidth * 0.8, window.innerHeight * 0.8 );
        const workspace = document.getElementById('workspace__canvas');
        workspace.appendChild( renderer.domElement );

        canvas = document.querySelector('canvas');

        // Загрузка GLB модели
        const loader = new GLTFLoader();
        loader.load('/src/models/armatura1_LOD0.glb', async function ( gltf ) {
            gltf.scene.scale.set(200, 200, 200);
            gltf.scene.position.x = 0;
            gltf.scene.position.y = 0;
            gltf.scene.position.z = 0;
            camera.lookAt(gltf.scene.position);
            model = gltf.scene;
            await renderer.compileAsync( model, camera, scene );
            scene.add(model);
        }, undefined, function( error ) {
            console.log( error );
        });
        renderer.setAnimationLoop( animate );
    } else {
        const warning = WebGL.getWebGL2ErrorMessage();
        document.getElementById('errormessage').appendChild(warning);
    }
    
}

function animate() {
    renderer.render( scene, camera );
}

export { camera, canvas, model, renderer, initialize };