import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

let scene, camera, renderer, shape;


const init = () => {
  
//boilerplate
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  1000
);
renderer = new THREE.WebGLRenderer( {antialias: true, canvas: canvas} );
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

//light
const ambientLight = new THREE.AmbientLight();
const pointLight = new THREE.PointLight(0xFF0000)
pointLight.position.set(30, 30, 60)
scene.add( pointLight );

//geometries
const geometryCube = new THREE.BoxGeometry(25, 22, 25);
const geometryKnot = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const geometrySphere = new THREE.SphereGeometry( 15, 32, 16 );
const geometryCrystal = new THREE.OctahedronGeometry(5, 0);

//appearances
const texture = new THREE.TextureLoader().load('./textures/1.jpg')
const material = new THREE.MeshBasicMaterial( { map: texture } );
const shinyMaterial = new THREE.MeshPhongMaterial( { 
  map: texture,
  metalness: 0.1,
  roughness: 0.1,
  shininess: 0.05,
  transparent: true,
  opacity: 0.85
})

shape = new THREE.Mesh( geometryCube, shinyMaterial );




scene.add(shape);

camera.position.z = 60;
}

const animate = () => {
  requestAnimationFrame(animate);
  
  shape.rotation.x += 0.005;
  shape.rotation.y += 0.005;
  
  renderer.render(scene, camera)
}

const onWindowResize = () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}


window.addEventListener('resize', onWindowResize, false);
init();
animate();
















console.log(scene, camera, renderer);