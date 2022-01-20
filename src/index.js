import './style.scss'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// Create Scene
const scene = new THREE.Scene()

// Add Camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)
let cameraRadius = 5
camera.position.z = cameraRadius

// Add Renderer
const renderer = new THREE.WebGLRenderer({
	// canvas: document.getElementById('background'),
	canvas: document.querySelector('#background'),
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

// Set Window Size
const setWindowSize = () => {
	renderer.setSize(window.innerWidth, window.innerHeight)
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
}
setWindowSize()
window.onresize = setWindowSize

// Add Lighting
const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4)
scene.add(hemiLight)

// Add Model Loader
const modelLoader = new GLTFLoader()

// Add Baritone Model
// NOTE: Use glTF VS Code extension to convert .gltf to .glb
let baritone
modelLoader.load(
	'assets/baritone.glb',
	(gltf) => {
		const scaleMultiplier = 0.05
		gltf.scene.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier)
		baritone = gltf.scene
		scene.add(baritone)
	},
	undefined,
	(error) => {
		console.error(error)
	}
)

// Add Stars
const starGeometry = new THREE.SphereGeometry(0.2, 4, 4)
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

const addStar = () => {
	const sphere = new THREE.Mesh(starGeometry, starMaterial)
	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(200))
	sphere.position.set(x, y, z)
	scene.add(sphere)
}

for (let i = 0; i < 1000; i++) {
	addStar()
}

// Sets camera rotation around center of scene
function setCameraRotation(degrees) {
	const radians = (degrees * Math.PI) / 180

	camera.position.x = Math.cos(radians) * cameraRadius
	camera.position.z = Math.sin(radians) * cameraRadius

	camera.lookAt(scene.position)
}

// Sets camera position and rotation based on scroll percentage
function setCameraTransform() {
	const percentageScrolledThroughPage =
		window.scrollY / (document.body.scrollHeight - window.innerHeight)

	cameraRadius = 6 - percentageScrolledThroughPage * 2
	setCameraRotation(360 * percentageScrolledThroughPage)
}
setCameraTransform()

window.onscroll = setCameraTransform

// Animation Loop
function animate() {
	requestAnimationFrame(animate)

	baritone.rotation.x += 0.005
	baritone.rotation.y += 0.005

	renderer.render(scene, camera)
}
animate()
