import {
  Color,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry
} from 'three'
import { AstraOptions, PlanetOptions, Position, SateliteOptions } from '@/scripts/types/planet'

class Astra {
  name: string
  radius: number
  color: Color | undefined
  shape: Mesh | undefined

  constructor ({ color, name, radius }: AstraOptions, scale: number) {
    this.name = name
    this.radius = radius * scale

    this.setSphere()

    if (color && this.shape) {
      this.color = new Color(color)
      this.shape.material = new MeshBasicMaterial({ color: this.color })
    }
  }

  private setSphere () {
    this.shape = new Mesh(new SphereGeometry(this.radius, 32, 32))
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

  constructor ({ color, name, radius }: PlanetOptions, scale: number) {
    super({ color, name, radius }, scale)
  }
}

export { Satelite, Planet }