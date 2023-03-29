<script setup lang="ts">
import { AmbientLight, Color, Fog, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { useWindowSize } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/** State */
let camera: PerspectiveCamera
let controls: OrbitControls
let light: AmbientLight
let scene: Scene
let renderer: WebGLRenderer
const canvas = ref<HTMLCanvasElement | null>(null)
const { height, width } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)
const bgColor = new Color('#E1F0C2')

/** Watchers */
watch(aspectRatio, () => {
  updateCamera()
  updateRenderer()
})

/** Mounted */
onMounted(() => {
  setScene()
  setCamera()
  setLight()
  setModel()
  setRenderer()
  loop()
})

/** Methods */
const setCamera = () => {
  camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)
  camera.position.set(0, 2, 4)
  scene.add(camera)
}

const setLight = () => {
  light = new AmbientLight(0xffffff, 1)
  scene.add(light)
}

const setModel = async () => {
  const { loadModel } = useGLTFModel()
  const { scene: model } = await loadModel('/models/nuxty/nuxty.gltf')
  scene.add(model)
}

const setScene = () => {
  scene = new Scene()
  scene.fog = new Fog(bgColor, 0.1, 75)
  scene.background = bgColor
}

const setRenderer = () => {
  if (!canvas.value) return

  renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvas.value
  })

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  updateRenderer()
}

const updateCamera = () => {
  if (!camera) return
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}

const updateRenderer = () => {
  if (!renderer) return

  renderer.setSize(width.value, height.value)
  renderer.render(scene, camera)
}

const loop = () => {
  // sphere.position.x += 0.01
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}
</script>

<template>
  <div>
    <div ref="canvas" />
  </div>
</template>

<style lang="scss" scoped>
</style>