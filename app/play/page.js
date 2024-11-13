// app/play/page.js

"use client"
import { useEffect } from 'react'
import * as THREE from 'three'

export default function Play() {
  useEffect(() => {
    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 10, 20)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('black') // Dark background
    document.body.appendChild(renderer.domElement)

    // Increase Light Intensities for Brightness
    const ambientLight = new THREE.AmbientLight(0x404040, 3) // Increased ambient light intensity
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 2) // Increased point light intensity
    pointLight.position.set(0, 10, 1)
    scene.add(pointLight)

    // Board Size and Tile Dimensions
    const boardSize = 26
    const tileSize = 2.5
    const tileHeight = 1

    // Function to create a single tile with metallic red and blue colors
    function createTile(x, z, color) {
      const geometry = new THREE.BoxGeometry(tileSize, tileHeight, tileSize)
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.3,
        metalness: 0.8,
      })
      const tile = new THREE.Mesh(geometry, material)
      tile.position.set(x, 0, z)
      scene.add(tile)
    }

    // Adjusted starting positions to center the board
    const offset = (boardSize / 2 - 0.5) * tileSize

    // Create a grid of tiles with metallic red and blue colors
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const color = (i + j) % 2 === 0 ? '#b22222' : '#4682b4'
        createTile(i * tileSize - offset, j * tileSize - offset, color)
      }
    }

    // Mini Player Creation
    const playerSize = 0.7
    const playerGeometry = new THREE.SphereGeometry(playerSize, 32, 32)
    const playerMaterial = new THREE.MeshStandardMaterial({ color: '#FFD700', metalness: 0.8, roughness: 0.3 })
    const player = new THREE.Mesh(playerGeometry, playerMaterial)
    player.position.set(0, playerSize, 32) // Starting position on the board
    scene.add(player)

    // Player Movement Controls
    const playerSpeed = 0.2
    const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

    // Key Press Events
    window.addEventListener('keydown', (e) => { keys[e.key] = true })
    window.addEventListener('keyup', (e) => { keys[e.key] = false })

    // Camera Follow Function
    function updateCameraPosition() {
      camera.position.set(player.position.x, player.position.y + 10, player.position.z + 15) // Adjust the offset as needed
      camera.lookAt(player.position)
    }

    // Resize the renderer and camera aspect on window resize
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    })

    // Render loop with movement and camera follow
    function animate() {
      requestAnimationFrame(animate)

      // Player Movement
      if (keys.ArrowUp) player.position.z -= playerSpeed
      if (keys.ArrowDown) player.position.z += playerSpeed
      if (keys.ArrowLeft) player.position.x -= playerSpeed
      if (keys.ArrowRight) player.position.x += playerSpeed

      // Update Camera Position to Follow Player
      updateCameraPosition()

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup function
    return () => {
      document.body.removeChild(renderer.domElement)
    }
  }, [])

  return null
}
