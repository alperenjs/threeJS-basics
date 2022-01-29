import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'


/**
 * Sizes
 * 
 */
const sizes = {
    width: 800,
    height: 600
}

/**Cursor */
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);
})

// window.addEventListener('touchmove', (event) => {
//     cursor.x = event.touches[0].pageX / sizes.width - 0.5;
//     cursor.y = - (event.touches[0].pageY / sizes.height - 0.5);
// })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'gray' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


/*** Camera */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)

scene.add(camera)

/*Controls*/
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock();
//Animations
const tick = () => {

    //Time
    const elapsedTime = clock.getElapsedTime()

    // //Update Objects
    //  mesh.rotation.y = elapsedTime

    //Update Camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)

    //update Controls
    controls.update()

    //Renders
    renderer.render(scene, camera)


    window.requestAnimationFrame(tick)
}



tick()

