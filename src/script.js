import './style.css'
import * as THREE from 'three'
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects --- ! const group = new THREE.Group() ile birden fazla objecti encapsulate edebiliriz.
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Position
// mesh.position.x = 0.7
// mesh.position.y = -0.7
// mesh.position.z = 0.7

mesh.position.set(1, 1.5, 1)

//Scale
// mesh.scale.x = 1.5
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
mesh.scale.set(1.5, 0.5, 0.5)

//Rotations
mesh.rotation.x = Math.PI * 0.25

//Axes Helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 1
camera.position.x = 1
scene.add(camera)

camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)