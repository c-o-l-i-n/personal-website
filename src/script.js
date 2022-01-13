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
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

// Add Lighting
hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4)
scene.add(hemiLight)

// Add Model Loader
const modelLoader = new THREE.GLTFLoader()

// Add Baritone Model
// NOTE: Use glTF VS Code extension to convert .gltf to .glb
modelLoader.load(
	'assets/baritone.glb',
	(gltf) => {
		const scaleMultiplier = 0.05
		gltf.scene.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier)
		scene.add(gltf.scene)
	},
	undefined,
	(error) => {
		console.error(error)
	}
)

// Add Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.update()

// Animation Loop
function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	controls.update()
}
animate()
