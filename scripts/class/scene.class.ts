import {
  AmbientLight,
  CubeTextureLoader,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import starTexture from '@/assets/textures/starts-texture.jpg'

class SceneConstructor {
  canvas: HTMLCanvasElement
  root: HTMLElement
  height: number
  width: number
  aspectRatio: number

  camera: PerspectiveCamera | undefined
  cameraPos = { x: -90, y: 140, z: 140 }
  controls: OrbitControls | undefined
  scene: Scene | undefined
  renderer: WebGLRenderer | undefined

  autoRotate = false

  constructor (root: HTMLElement) {
    this.canvas = document.createElement('canvas')
    this.root = root
    this.height = root.clientHeight
    this.width = root.clientWidth
    this.aspectRatio = this.width / this.height

    this.init()
    this.bindEvents()
  }

  private bindEvents() {
    window.addEventListener('resize', () => this.onResize())
  }

  unbindEvents() {
    window.removeEventListener('resize', () => this.onResize())
  }

  private init () {
    this.initScene()
    this.initCamera()
    this.initLights()
    this.initRenderer()
    this.initControls()

    this.root.appendChild(this.canvas)
  }

  addElement (element: Object3D) {
    if (this.scene) this.scene.add(element)
  }

  /**
   * Initialize the camera
   */
  private initCamera () {
    this.camera = new PerspectiveCamera(45, this.aspectRatio, 0.01, 1000)
    this.camera.position.set(this.cameraPos.x, this.cameraPos.y, this.cameraPos.z)
    this.camera.lookAt(0, 0, 0)
    this.camera.updateProjectionMatrix()
  }

  initControls() {
    if (!this.camera) return

    this.controls = new OrbitControls(
      this.camera,
      this.canvas
    )

    this.controls.update()
  }

  /**
   * Initialize the lights
   * and add them to the scene
   */
  private initLights () {
    const ambientLight = new AmbientLight(0x333333)
    if (this.scene) this.scene.add(ambientLight)

    const pointLight = new PointLight(0xFFFFFF, 2, 450)
    pointLight.castShadow = true
    if (this.scene) this.scene.add(pointLight)
  }

  /**
   * Initialize the scene
   */
  private initScene () {
    this.scene = new Scene()

    const cubeTextureLoader = new CubeTextureLoader()
    this.scene.background = cubeTextureLoader.load([
      starTexture,
      starTexture,
      starTexture,
      starTexture,
      starTexture,
      starTexture
    ])
  }

  /**
   * Initialize the renderer
   * and update the canvas
   */
  private initRenderer () {
    if (this.renderer) return
    this.renderer = new WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.shadowMap.enabled = true
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.canvas = this.renderer.domElement
  }

  /**
   * Use requestAnimationFrame to create a loop animation
   */
  loop (callback?: CallableFunction) {
    this.renderer?.setAnimationLoop(() => {
      if (callback) callback()
      this.render()
    })
  }

  /**
   * Handler for the resize event
   */
  private onResize () {
    if (!this.camera || !this.scene || !this.renderer) return

    this.width = this.root.clientWidth
    this.height = this.root.clientHeight

    this.renderer.setSize(this.width, this.height)

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  /**
   * Position the camera
   * and render the scene
   */
  private render () {
    if (!this.camera || !this.scene || !this.renderer) return
    this.renderer.render(this.scene, this.camera)
  }
}

export default SceneConstructor