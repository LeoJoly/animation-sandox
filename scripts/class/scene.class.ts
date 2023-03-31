import {
  Object3D,
  PerspectiveCamera,
  Scene,
  SpotLight,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class SceneConstructor {
  canvas: HTMLCanvasElement
  root: HTMLElement
  height: number
  width: number
  aspectRatio: number

  camera: PerspectiveCamera | undefined
  cameraX = 0
  cameraY = 0
  cameraZ = 1500
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
    this.camera = new PerspectiveCamera(75, this.aspectRatio, 1, 1500)
    this.camera.position.set(this.cameraX, this.cameraY, this.cameraZ)
    this.camera.lookAt(0, 0, 0)
    this.camera.updateProjectionMatrix()
  }

  initControls() {
    if (!this.camera) return

    this.controls = new OrbitControls(
      this.camera,
      this.canvas
    )

    this.controls.minPolarAngle = (Math.PI * 1) / 6
    this.controls.maxPolarAngle = (Math.PI * 3) / 4

    this.controls.update()
  }

  /**
   * Initialize the lights
   * and add them to the scene
   */
  private initLights () {
    const light = new SpotLight(0xffffff, 1)
    light.castShadow = true
    light.position.set(530, 0, 1060)
    if (this.scene) this.scene.add(light)
  }

  /**
   * Initialize the scene
   */
  private initScene () {
    this.scene = new Scene()
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
    if (callback) callback()

    if (this.controls) {
      this.controls.autoRotate = this.autoRotate
      this.controls.update()
    }

    this.render()
    requestAnimationFrame(() => this.loop())
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
    this.camera.lookAt(this.scene.position)
    this.renderer.render(this.scene, this.camera)
  }
}

export default SceneConstructor