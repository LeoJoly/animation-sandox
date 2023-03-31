import {
  BufferAttribute,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  RingGeometry,
  SphereGeometry,
  TextureLoader,
  Vector3
} from 'three'
import { AstraOptions, PlanetOptions, Position, Ring, SateliteOptions } from '@/scripts/types/planet'

// Class representing a simple astral body (sphere)
class Astra {
  name: string
  radius: number
  color?: Color
  shape?: Mesh

  constructor ({ color, name, radius }: AstraOptions, scale: number) {
    this.name = name
    this.radius = radius * scale
    this.color = new Color(color)

    this.initSphere()
  }

  /**
   * Sphere shape initialization
   */
  private initSphere () {
    this.shape = new Mesh(
      new SphereGeometry(this.radius, 64, 64),
      new MeshBasicMaterial({ color: this.color })
    )
    this.shape.name = this.name
  }
}

// Class representing a satelite orbiting around a planet
class Satelite extends Astra {
  position: Position = { x: 0, y: 0, z: 0 }

  constructor ({ color, distance, name, radius }: SateliteOptions, scale: number, saturnRadius?: number) {
    super({ color, name, radius }, scale)

    // If the satelite is orbiting around a planet, we need to calculate its position
    if (distance && saturnRadius) {
      this.position = { x: (saturnRadius + distance + radius) * scale, y: 0, z: 0 }
      this.shape?.position.set(this.position.x, this.position.y, this.position.z)
    }
  }
}

// Class representing a planet
class Planet extends Satelite {
  group: Group = new Group()
  loader: TextureLoader = new TextureLoader()

  texture?: string
  scale: number
  angle?: number

  ringConfig?: Ring
  ring?: Mesh

  constructor ({ angle, color, name, radius, ring, texture }: PlanetOptions, scale: number) {
    super({ color, name, radius }, scale)
    this.angle = angle || 0
    this.texture = texture
    this.scale = scale
    this.ringConfig = ring

    this.init()
  }

  private init () {
    this.setTexture()
    this.initRing()

    if (this.shape) this.group.add(this.shape)

    this.tiltGourp()
  }

  /**
   * Add a ring around the planet if it has one
   */
  private initRing () {
    if (!this.ringConfig) return
    const texture = this.loader.load(this.ringConfig.texture)
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
    const material = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
      color: 0xffffff,
      transparent: true
    })

    this.ring = new Mesh(geometry, material)
    this.ring.rotation.x = Math.PI / 2

    this.group.add(this.ring)
  }

  /**
   * Set the texture of the planet
   */
  private setTexture () {
    if (!this.texture) return
    this.loader.load(this.texture, (texture) => {
      if (!this.shape) return
      this.shape.material = new MeshBasicMaterial({ map: texture })
    })
  }

  /**
   * Tilt the planet from the suns orbit axis
   */
  private tiltGourp () {
    if (!this.angle) return
    this.group.rotation.x = this.angle * Math.PI / 180
  }
}

export { Satelite, Planet }