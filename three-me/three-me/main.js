import * as THREE from 'three';
import './style.css'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio(devicePixelRatio);  
  document.body.appendChild( renderer.domElement );

	const geometry = new THREE.SphereGeometry();
	const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	const cube = new THREE.Mesh( geometry, material );
	camera.position.z = 2.5;		

  scene.add( cube );
       
function animate() {
		requestAnimationFrame( animate );
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			renderer.render( scene, camera );
};



//responsiveness
const onWindowResize = () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
};

window.addEventListener("resize", onWindowResize, false);
animate();