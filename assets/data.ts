export default {
  planets: [
    {
      name: 'Sun',
      radius: 20,
      position: { x: 0, y: 0, z: 0 },
      texture: '/textures/sun.jpg',
      tilt: 0
    },
    {
      name: 'Mercury',
      radius: 6,
      position: { x: 53, y: 0, z: 0 },
      texture: '/textures/mercury.jpg',
      tilt: 0.027
    },
    {
      name: 'Venus',
      radius: 7,
      position: { x: 99.5, y: 0, z: 0 },
      texture: '/textures/venus.jpg',
      tilt: 177.4
    },
    {
      name: 'Earth',
      radius: 8,
      position: { x: 147, y: 0, z: 0 },
      texture: '/textures/earth.jpg',
      tilt: 23.4
    },
    {
      name: 'Mars',
      radius: 5.5,
      position: { x: 193.75, y: 0, z: 0 },
      texture: '/textures/mars.jpg',
      tilt: 25.2
    },
    {
      name: 'Jupiter',
      radius: 16,
      position: { x: 244.5, y: 0, z: 0 },
      texture: '/textures/jupiter.jpg',
      tilt: 3
    },
    {
      name: 'Saturn',
      radius: 15,
      position: { x: 308.235, y: 0, z: 0 },
      texture: '/textures/saturn.jpg',
      ring: {
        innerRadius: 17.233,
        outerRadius: 31.47,
        texture: '/textures/saturn-ring-top.png'
      },
      tilt: 26.7
    },
    {
      name: 'Uranus',
      radius: 12,
      position: { x: 369.97, y: 0, z: 0 },
      texture: '/textures/uranus.jpg',
      tilt: 97.8
    },
    {
      name: 'Neptune',
      radius: 11,
      position: { x: 421.47, y: 0, z: 0 },
      texture: '/textures/neptune.jpg',
      tilt: 28.3
    }
  ]
}