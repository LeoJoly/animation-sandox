import {
  Color,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry
} from 'three'
import { PlanetOptions, Position, SateliteOptions } from '@/scripts/types/planet'

class Planet {
  name: string
  radius: number
  position: Position = { x: 0, y: 0, z: 0 }
  color: Color | undefined

  shape: Mesh | undefined

  constructor ({ color, distance, name, position, radius }: SateliteOptions, scale: number, saturnRadius?: number) {
    this.name = name
    this.radius = radius * scale

    if (position) {
      const { x, y, z } = position
      this.position = { x: x * scale, y: y * scale, z: z * scale }
    } else if (saturnRadius)
      this.position = { x: -(saturnRadius + distance + radius) * scale, y: 0, z: 0 }


    if (color) this.color = new Color(color)

    this.init()
  }

  private init () {
    this.setSphere()
  }

  private setSphere () {
    this.shape = new Mesh(
      new SphereGeometry(this.radius, 32, 32),
      new MeshBasicMaterial({ color: this.color })
    )

    this.shape.name = this.name
    this.shape.position.set(this.position.x, this.position.y, this.position.z)
  }
}

export default Planet