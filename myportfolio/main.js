import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js";
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import * as dat from "dat.gui";
//mouse move
const mouse = {
  x: undefined,
  y: undefined
};

addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
  console.log(mouse)
});
const gui = new dat.GUI();

const world = {
  plane: {
    width: 100,
    height: 100,
    widthSegments: 250,
    heightSegments: 250
  }
};

console.log(OrbitControls)

let scene, camera, renderer, shape, shape0, plane, floorPlane;

const init = () => {
  //boilerplate
 
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);  
  // renderer.setClearColor( 0xffffff );

  document.body.appendChild(renderer.domElement);



  //light
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.95)
  dirLight.position.set(0, 0, 1)
  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.95)
  dirLight1.position.set(0, 0, -1)
  const ambLight = new THREE.AmbientLight(0xffffff); // soft white light
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(30, 30, 60);
  const hemLight = new THREE.HemisphereLight(0xff0000, 0xff0000, 1);
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(100, 2000, 90);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 100;
  spotLight.shadow.camera.far = 1000;
  spotLight.shadow.camera.fov = 100;

  const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

  //geometries
  const geometryCube = new THREE.BoxGeometry(20, 20, 20);
  const geometryKnot = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  // const geometrySphere = new THREE.SphereGeometry(15, 32, 16);
  const geometrySphere = new THREE.SphereGeometry(20, 20, 20);
  const geometryCrystal = new THREE.OctahedronGeometry(5, 0);
  const geometryPlane = new THREE.PlaneGeometry(100, 100, 100, 100);
  const floor = new THREE.PlaneGeometry(150, 700, 100, 100);

  //textures
  const texture = new THREE.TextureLoader().load("./textures/1.jpg");
  const background = new THREE.TextureLoader().load('./textures/5.jpg')
  const ballBackground = new THREE.TextureLoader().load('./textures/ball2.jpg')
  const floorBackground = new THREE.TextureLoader().load('./textures/8.jpg')
  // scene.background = background
  //materials

  const material = new THREE.MeshBasicMaterial({
    map: texture
  });
  const materialPlane = new THREE.MeshPhongMaterial({
    color: 0xFF0000,
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading,
    // transparent: true,
    // opacity: 0.75,
  });
  const bowlingPlane = new THREE.MeshStandardMaterial({
    map: floorBackground,
    side: THREE.DoubleSide,
    roughness: 0.5
    // flatShading: THREE.FlatShading,
    
  });

  const shinyMaterial = new THREE.MeshStandardMaterial({
    map: ballBackground,
    metalness: 0.4,
    
    shininess: 0.5
    // transparent: true,
    // opacity: 0.85
  });

  const testMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    opacity: 0.85
  });



  shape = new THREE.Mesh(geometrySphere, shinyMaterial);
  shape0 = new THREE.Mesh(geometryCube, testMaterial);
  plane = new THREE.Mesh(geometryPlane, materialPlane);
  floorPlane = new THREE.Mesh(floor, bowlingPlane);
  //scene add
  scene.add(shape, pointLight);

  new OrbitControls(camera, renderer.domElement)
  camera.position.y = 30
  camera.position.z = 75; 


  //randomizing the mountain plane

  const { array } = plane.geometry.attributes.position;
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i]
    const y = array[i + 1]
    const z = array[i + 2]
    array[i + 2] = z + Math.random()
  }

const generatePlane = () => {
  plane.geometry.dispose();
  plane.geometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments)
  const { array } = plane.geometry.attributes.position;
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i]
    const y = array[i + 1]
    const z = array[i + 2]
    array[i + 2] = z + Math.random()
  }
}


  gui.add(world.plane, 'width', 1, 200).onChange(generatePlane);
  gui.add(world.plane, 'height', 1, 200).onChange(generatePlane);
  gui.add(world.plane, 'widthSegments', 1, 500).onChange(generatePlane);
  gui.add(world.plane, 'heightSegments', 1, 500).onChange(generatePlane);

};


//function that draws the scene
const animate = () => {
  requestAnimationFrame(animate);
  // plane.rotation.x = 1;
  // plane.rotation.z += 0.0005;
  floorPlane.rotation.x = 1.565
  shape.position.y = 20
  shape.position.z = 2
  shape.rotation.x -= 0.1;
  shape.rotation.y -= 0.0001;
  
  // shape0.rotation.x -= 0.005;
  
  renderer.render(scene, camera);
  
};

//responsiveness
const onWindowResize = () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
};

//call functions to initialize and animate responsive three scenes
window.addEventListener("resize", onWindowResize, false);
init();
animate();


