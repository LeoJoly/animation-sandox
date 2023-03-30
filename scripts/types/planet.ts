import { ColorRepresentation } from 'three'

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

export type AstraOptions = {
  name: string,
  radius: number,
  color?: ColorRepresentation
}

export type PlanetOptions = AstraOptions & {
  position?: Position
  texture?: string,
  ring?: Ring
}

export type SateliteOptions = AstraOptions & {
  distance?: number
  tilt?: number
}