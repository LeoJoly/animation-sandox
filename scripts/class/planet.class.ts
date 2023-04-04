import {
  MeshBasicMaterial,
  BufferAttribute,
  Group,
  Mesh,
  MeshPhongMaterial,
  RingGeometry,
  SphereGeometry,
  TextureLoader,
  Vector3,
  TorusGeometry
} from 'three'
import { PlanetOptions, Position, Ring } from '@/scripts/types/planet'
import scalePosition from '@/scripts/utils/scalePosition'

class Planet {
  scale: number

  name: string
  radius: number
  texture: string
  tilt: number
  position: Position

  ringConfig?: Ring
  rings = [1, -1]

  sphere?: Mesh
  planetGroup: Group = new Group()
  mainGroup: Group = new Group()

  constructor (planet: PlanetOptions, scale: number) {
    this.scale = scale

    this.name = planet.name
    this.radius = planet.radius * scale
    this.texture = planet.texture
    this.position = scalePosition(planet.position, scale)
    this.tilt = planet.tilt

    this.ringConfig = planet.ring

    this.init()
  }

  private init () {
    this.initSphere()
    this.initRing()
    this.initCircle()
    this.positionGroup()
  }

  private initCircle () {
    const geometry = new TorusGeometry(this.position.x, 0.1, 16, 100)
    const material = new MeshBasicMaterial({ color: 0x3a3a3a })
    const circle = new Mesh(geometry, material)
    circle.rotation.x = Math.PI / 2
    this.mainGroup.add(circle)
  }

  /**
   * Add a ring around the planet if it has one
  */
  private initRing () {
    if (!this.ringConfig) return

    const ringGroup = new Group()

    const loader = new TextureLoader()
    const texture = loader.load(this.ringConfig.texture)
    const innerRadius = this.ringConfig.innerRadius * this.scale
    const outerRadius = this.ringConfig.outerRadius * this.scale


    // Set the geometry of the ring
    // and position the texture on the inside of the ring
    const geometry = new RingGeometry(innerRadius, outerRadius, 64)
    const pos = geometry.attributes.position as BufferAttribute
    const v3 = new Vector3()
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i)
      const uv = geometry.attributes.uv as BufferAttribute
      uv.setXY(i, v3.length() < outerRadius - 1 ? 0 : 1, 1)
    }

    // Set the material of the ring
    const material = new MeshPhongMaterial({
      map: texture,
      // side: DoubleSide,
      color: 0xffffff,
      transparent: true
    })

    // We need to create twi rings
    // upside down from each other so that the texture is visible on both sides
    // and the shadow is casted correctly
    this.rings.forEach(r => {
      const ring = new Mesh(geometry, material)
      ring.castShadow = true
      ring.receiveShadow = true
      ring.position.z = r * 0.1
      ring.rotation.x = r * Math.PI / 2
      ringGroup.add(ring)
    })

    this.planetGroup.add(ringGroup)
  }

  private initSphere () {
    const loader = new TextureLoader()
    const texture = loader.load(this.texture)

    const geometry = new SphereGeometry(this.radius, 64, 64)
    const material = this.name === 'Sun' ? new MeshBasicMaterial({ map: texture }) : new MeshPhongMaterial({ map: texture })
    this.sphere = new Mesh(geometry, material)
    this.sphere.name = this.name
    this.sphere.castShadow = this.name !== 'Sun'
    this.sphere.receiveShadow = this.name !== 'Sun'

    this.planetGroup.add(this.sphere)
  }

  private positionGroup () {
    this.planetGroup.position.set(this.position.x, this.position.y, this.position.z)
    this.planetGroup.rotation.x = this.tilt * Math.PI / 180
    this.mainGroup.add(this.planetGroup)
  }
}

export { Planet }