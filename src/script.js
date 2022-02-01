import './style.css'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const cubeTextureLoader = new THREE.CubeTextureLoader()
// Canvas
const canvas = document.querySelector('canvas.webgl')

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])
// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/5.png')


/**FONTS */
const loader = new FontLoader();
loader.load(
    // resource URL
    '/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Alperen was here.',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        textGeometry.center()

        const material = new THREE.MeshNormalMaterial()
        // const materialDonut = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 })
        const materialDonut = new THREE.MeshPhysicalMaterial()
        materialDonut.transmission = 1
        materialDonut.thickness = .2
        materialDonut.roughness = 0.07
        materialDonut.envMapIntensity = 1.5
        materialDonut.envMap = environmentMapTexture
        // material.matcap = matcapTexture
        // material.wireframe = true

        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
        //for perfomence issues, created this two consts above for loop
        //provided as x10 performence 

        for (let i = 0; i < 300; i++) {

            const donut = new THREE.Mesh(donutGeometry, materialDonut)

            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()

            donut.scale.set(scale, scale, scale)

            scene.add(donut)

        }

        const frame = () => {
            const elapsedTime = clock.getElapsedTime()
            text.rotation.x = 1.5 * elapsedTime
            // Call frame again on the next frame
            window.requestAnimationFrame(frame)
        }

        frame()

        // gsap.to(text.rotation, { duration: 1, y: text.rotation.y + 1.1 })
    }
);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 6
scene.add(camera)
scene.background = new THREE.Color( '#5e60ce' )



// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 1
controls.maxDistance = 8

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime);
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)



    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
