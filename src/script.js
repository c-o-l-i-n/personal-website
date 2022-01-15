// Create Scene
const scene = new THREE.Scene()

// Add Camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)
camera.position.z = 5

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
hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4)
scene.add(hemiLight)

// Add Model Loader
const modelLoader = new THREE.GLTFLoader()

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

// Animation Loop
function animate() {
	requestAnimationFrame(animate)

	baritone.rotation.x += 0.01
	baritone.rotation.y += 0.01

	renderer.render(scene, camera)
}
animate()
