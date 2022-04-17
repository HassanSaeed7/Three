import * as THREE from 'https://cdn.skypack.dev/three@0.126.1';
const scene = new THREE.Scene();
scene.background = new Color('skyblue');
const camera = new THREE.PerspectiveCamera(
  175,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: "red" } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 25;


