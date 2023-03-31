export default {
  planets: [
    {
      name: 'Sun',
      radius: 695700,
      position: { x: 0, y: 0, z: 0 },
      color: '#FEB938',
      texture: '/textures/sun.jpg'
    },
    {
      name: 'Mercury',
      radius: 2439,
      position: { x: 698136, y: 0, z: 0 },
      color: '#7C7C7C',
      texture: '/textures/mercury.jpg'
    },
    {
      name: 'Venus',
      radius: 6051,
      position: { x: 706626, y: 0, z: 0 },
      color: '#E6AB46',
      texture: '/textures/venus.jpg'
    },
    {
      name: 'Earth',
      radius: 6371,
      position: { x: 719048, y: 0, z: 0 },
      color: '1E3B75',
      texture: '/textures/earth.jpg'
    },
    {
      name: 'Mars',
      radius: 3389,
      position: { x: 728808, y: 0, z: 0 },
      color: '1E3B75',
      texture: '/textures/mars.jpg'
    },
    {
      name: 'Jupiter',
      radius: 69911,
      position: { x: 802108, y: 0, z: 0 },
      color: '1E3B75',
      texture: '/textures/jupiter.jpg'
    },
    {
      name: 'Saturn',
      radius: 58232,
      position: { x: 994189, y: 0, z: 0 },
      color: '#D9BBA0',
      texture: '/textures/saturn.jpg',
      ring: {
        innerRadius: 66900,
        outerRadius: 122170,
        texture: '/textures/saturn-ring-top.png'
      },
      angle: 26.7
    },
    {
      name: 'Uranus',
      radius: 25362,
      position: { x: 1141721, y: 0, z: 0 },
      color: '#A5D6DD',
      texture: '/textures/uranus.jpg'
    },
    {
      name: 'Neptune',
      radius: 24622,
      position: { x: 1191705, y: 0, z: 0 },
      color: '#375EBF',
      texture: '/textures/neptune.jpg'
    }
  ]
  // satelites: [
  //   {
  //     name: 'Titan',
  //     radius: 2575,
  //     distance: 1221865,
  //     tilt: 0.028,
  //     color: '#FFCB9A'
  //   },
  //   {
  //     name: 'Rhea',
  //     radius: 1527,
  //     distance: 527108,
  //     tilt: 0.345,
  //     color: '#4C594F'
  //   },
  //   {
  //     name: 'Japet',
  //     radius: 1468,
  //     distance: 778570,
  //     tilt: 0.064,
  //     color: '#D2E8E3'
  //   },
  //   {
  //     name: 'Dione',
  //     radius: 1123,
  //     distance: 377400,
  //     tilt: 0.028,
  //     color: '#F4E2DE'
  //   },
  //   {
  //     name: 'Tethys',
  //     radius: 1062,
  //     distance: 294672,
  //     tilt: 0.028,
  //     color: '#B2BEBF'
  //   },
  //   {
  //     name: 'Encelade',
  //     radius: 252,
  //     distance: 237948,
  //     tilt: 0.004,
  //     color: '#E8E9B2'
  //   },
  //   {
  //     name: 'Mimas',
  //     radius: 198,
  //     distance: 185539,
  //     tilt: 0.028,
  //     color: '#BFBFB8'
  //   }
  // ]
}