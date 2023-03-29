import {
  AmbientLight,
  Color,
  ColorRepresentation,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three'

class SceneConstructor {
  canvas: HTMLCanvasElement
  root: HTMLElement
  height: number
  width: number
  aspectRatio: number

  color: Color

  camera: PerspectiveCamera | undefined
  scene: Scene | undefined
  renderer: WebGLRenderer | undefined

  constructor (root: HTMLElement, background: ColorRepresentation) {
    this.canvas = document.createElement('canvas')
    this.root = root
    this.height = root.clientHeight
    this.width = root.clientWidth
    this.aspectRatio = this.width / this.height

    this.color = new Color(background)

    this.init()
    this.loop()
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
    this.root.appendChild(this.canvas)
  }

  /**
   * Initialize the camera
   */
  private initCamera () {
    this.camera = new PerspectiveCamera(75, this.aspectRatio, 0.1, 100)
    this.camera.position.set(0, 0, 4)
    this.camera.updateProjectionMatrix()
  }

  /**
   * Initialize the lights
   * and add them to the scene
   */
  private initLights () {
    const light = new AmbientLight(0xffffff, 1)
    if (this.scene) this.scene.add(light)
  }

  /**
   * Initialize the scene
   */
  private initScene () {
    this.scene = new Scene()
    this.scene.background = this.color
  }

  /**
   * Initialize the renderer
   * and update the canvas
   */
  private initRenderer () {
    if (this.renderer) return
    this.renderer = new WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.canvas = this.renderer.domElement
  }

  /**
   * Use requestAnimationFrame to create a loop animation
   */
  private loop () {
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