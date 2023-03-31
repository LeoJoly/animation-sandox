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

class Astra {
  name: string
  radius: number
  color?: Color
  shape?: Mesh

  constructor ({ color, name, radius }: AstraOptions, scale: number) {
    this.name = name
    this.radius = radius * scale

    this.initSphere()

    if (color && this.shape) {
      this.color = new Color(color)
      this.shape.material = new MeshBasicMaterial({ color: this.color })
    }
  }

  private initSphere () {
    this.shape = new Mesh(new SphereGeometry(this.radius, 64, 64))
    this.shape.name = this.name
  }
}

class Satelite extends Astra {
  position: Position = { x: 0, y: 0, z: 0 }

  constructor ({ color, distance, name, radius }: SateliteOptions, scale: number, saturnRadius?: number) {
    super({ color, name, radius }, scale)

    if (distance && saturnRadius) {
      this.position = { x: (saturnRadius + distance + radius) * scale, y: 0, z: 0 }
      this.shape?.position.set(this.position.x, this.position.y, this.position.z)
    }
  }
}

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

  private initRing () {
    if (!this.ringConfig) return
    const texture = this.loader.load(this.ringConfig.texture)
    const innerRadius = this.ringConfig.innerRadius * this.scale
    const outerRadius = this.ringConfig.outerRadius * this.scale


    const geometry = new RingGeometry(innerRadius, outerRadius, 64)
    const pos = geometry.attributes.position as BufferAttribute
    const v3 = new Vector3()
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i)
      const uv = geometry.attributes.uv as BufferAttribute
      uv.setXY(i, v3.length() < outerRadius - 1 ? 0 : 1, 1)
    }

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

  private setTexture () {
    if (!this.texture) return
    this.loader.load(this.texture, (texture) => {
      if (!this.shape) return
      this.shape.material = new MeshBasicMaterial({ map: texture })
    })
  }

  private tiltGourp () {
    if (!this.angle) return
    console.log(this.angle * Math.PI / 180)
    this.group.rotation.x = this.angle * Math.PI / 180
  }
}

export { Satelite, Planet }