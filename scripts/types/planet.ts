export type Position = {
  x: number,
  y: number,
  z: number
}

export type Ring = {
  innerRadius: number,
  outerRadius: number,
  texture: string
}

export type PlanetOptions = {
  name: string,
  radius: number,
  position: Position
  texture: string,
  ring?: Ring,
  tilt: number,
  orbitSpeed: number,
  rotationSpeed: number
}