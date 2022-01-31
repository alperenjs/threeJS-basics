import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as lil from 'lil-gui'
import { PointLightHelper } from 'three'
// import image from '../static/textures/door/color.jpg'
/**
Textures 
 */
// https://marmoset.co/posts/physically-based-rendering-and-you-can-too/
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log('onStart');
}
loadingManager.onLoad = () => {
    console.log('onLoad');
}
loadingManager.onProgress = () => {
    console.log('onProgress');
}
loadingManager.onError = () => {
    console.log('onError');
}


const textureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')
const colorTexture = textureLoader.load('/textures/minecraft.png')
const doorColorTexture = textureLoader.load('/textures/door/alpha.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const metalness = textureLoader.load('/textures/door/metalness.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')


// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping
// colorTexture.rotation = Math.PI / 4
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter //SHARPEN PIXEL
colorTexture.magFilter = THREE.NearestFilter //SHARPEN PIXEL
/* Sizes */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    //Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //re - render
    renderer.setSize(sizes.width, sizes.height)
})

/**Cursor */
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);
})

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()


//Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/** Objects */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)

// const material = new THREE.MeshBasicMaterial({ map: colorTexture })
// const material = new THREE.MeshNormalMaterial()

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.56
material.roughness = 0.65
// material.map = doorColorTexture


const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


/*** Camera */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(mesh.position)

scene.add(camera)

/*Controls OrbitControl*/
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/** Renderer */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Animations
const tick = () => {

    //update Controls
    controls.update()

    //Renders
    renderer.render(scene, camera)

    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + .1 })
    window.requestAnimationFrame(tick)
}

tick()

//#region DEBUG //
const gui = new lil.GUI()

const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 })
    }
}

gui
    .add(material, 'metalness')
    .min(0)
    .max(1)
    .step(0.01)
    .name('Metallik')

    gui
    .add(material, 'roughness')
    .min(0)
    .max(1)
    .step(0.01)
    .name('ROughness')


    //#endregion //

