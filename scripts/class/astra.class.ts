import {
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  RingGeometry,
  SphereGeometry,
  TextureLoader
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

  ringConfig?: Ring
  ring?: Mesh

  constructor ({ color, name, radius, ring, texture }: PlanetOptions, scale: number) {
    super({ color, name, radius }, scale)
    this.texture = texture
    this.scale = scale
    this.ringConfig = ring

    this.init()
  }

  private init () {
    this.setTexture()
    this.initRing()

    if (this.shape) this.group.add(this.shape)
  }

  private initRing () {
    if (!this.ringConfig) return
    this.ring = new Mesh(
      new RingGeometry(this.ringConfig.innerRadius * this.scale, this.ringConfig.outerRadius * this.scale, 64),
      new MeshBasicMaterial({ color: '#D92525', side: DoubleSide })
    )
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
}

export { Satelite, Planet }