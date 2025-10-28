const planets = [
  {
    id: 'mercury',
    name: 'Mercury',
    description: 'The smallest planet in our solar system and closest to the Sun.',
    diameter: 4879,
    mass: '3.285 × 10^23 kg',
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    rotationPeriod: 1407.6,
    temperature: { min: -173, max: 427 },
    moons: [],
    color: '#8C7853',
    texture: 'mercury',
    facts: [
      'Mercury has no atmosphere to speak of',
      'A year on Mercury is just 88 Earth days',
      'Mercury has the most eccentric orbit',
      'Despite being closest to the Sun, Mercury is not the hottest planet'
    ]
  },
  {
    id: 'venus',
    name: 'Venus',
    description: 'The second planet from the Sun and the hottest planet in our solar system.',
    diameter: 12104,
    mass: '4.867 × 10^24 kg',
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    rotationPeriod: -5832.5,
    temperature: { min: 462, max: 462 },
    moons: [],
    color: '#FFC649',
    texture: 'venus',
    facts: [
      'Venus rotates backwards compared to other planets',
      'A day on Venus is longer than its year',
      'Venus has a thick, toxic atmosphere',
      'It\'s often called Earth\'s "sister planet" due to similar size'
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    description: 'Our home planet, the only known planet to harbor life.',
    diameter: 12742,
    mass: '5.972 × 10^24 kg',
    distanceFromSun: 149.6,
    orbitalPeriod: 365.25,
    rotationPeriod: 24,
    temperature: { min: -88, max: 58 },
    moons: [{ name: 'Moon' }],
    color: '#4169E1',
    texture: 'earth',
    facts: [
      'Earth is the only known planet with liquid water on its surface',
      '71% of Earth\'s surface is covered by water',
      'Earth has a strong magnetic field',
      'The planet is approximately 4.54 billion years old'
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    description: 'The Red Planet, named after the Roman god of war.',
    diameter: 6779,
    mass: '6.39 × 10^23 kg',
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    rotationPeriod: 24.6,
    temperature: { min: -140, max: 20 },
    moons: [{ name: 'Phobos' }, { name: 'Deimos' }],
    color: '#CD5C5C',
    texture: 'mars',
    facts: [
      'Mars has the largest volcano in the solar system (Olympus Mons)',
      'Mars has polar ice caps made of water and carbon dioxide',
      'A day on Mars is only slightly longer than an Earth day',
      'Mars has two small moons: Phobos and Deimos'
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    description: 'The largest planet in our solar system, a gas giant.',
    diameter: 139820,
    mass: '1.898 × 10^27 kg',
    distanceFromSun: 778.5,
    orbitalPeriod: 4333,
    rotationPeriod: 9.9,
    temperature: { min: -145, max: -145 },
    moons: [
      { name: 'Io' },
      { name: 'Europa' },
      { name: 'Ganymede' },
      { name: 'Callisto' }
    ],
    color: '#DAA520',
    texture: 'jupiter',
    facts: [
      'Jupiter\'s Great Red Spot is a storm larger than Earth',
      'Jupiter has the shortest day of all planets',
      'Jupiter has 95 known moons',
      'Jupiter\'s magnetic field is 20,000 times stronger than Earth\'s'
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    description: 'Famous for its spectacular ring system.',
    diameter: 116460,
    mass: '5.683 × 10^26 kg',
    distanceFromSun: 1434,
    orbitalPeriod: 10759,
    rotationPeriod: 10.7,
    temperature: { min: -178, max: -178 },
    moons: [
      { name: 'Titan' },
      { name: 'Enceladus' },
      { name: 'Rhea' },
      { name: 'Iapetus' },
      { name: 'Dione' },
      { name: 'Tethys' },
      { name: 'Mimas' }
    ],
    color: '#F4A460',
    texture: 'saturn',
    hasRings: true,
    facts: [
      'Saturn has the most spectacular ring system',
      'Saturn could float in water (if you had a big enough ocean)',
      'Saturn has 146 confirmed moons',
      'Saturn\'s rings are made mostly of ice particles'
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    description: 'An ice giant that rotates on its side.',
    diameter: 50724,
    mass: '8.681 × 10^25 kg',
    distanceFromSun: 2871,
    orbitalPeriod: 30687,
    rotationPeriod: -17.2,
    temperature: { min: -224, max: -224 },
    moons: [
      { name: 'Miranda' },
      { name: 'Ariel' },
      { name: 'Umbriel' },
      { name: 'Titania' },
      { name: 'Oberon' }
    ],
    color: '#4FD0E0',
    texture: 'uranus',
    hasRings: true,
    facts: [
      'Uranus rotates on its side at a 98-degree angle',
      'Uranus was the first planet discovered with a telescope',
      'Uranus has 13 known rings',
      'A season on Uranus lasts about 21 Earth years'
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    description: 'The windiest planet in our solar system.',
    diameter: 49244,
    mass: '1.024 × 10^26 kg',
    distanceFromSun: 4495,
    orbitalPeriod: 60190,
    rotationPeriod: 16.1,
    temperature: { min: -214, max: -214 },
    moons: [
        { name: 'Triton' },
        { name: 'Nereid' },
        { name: 'Naiad' },
        { name: 'Thalassa' },
        { name: 'Despina' },
        { name: 'Galatea' },
        { name: 'Larissa' },
        { name: 'Proteus' },
        { name: 'Hippocamp' }
    ],
    color: '#4169E1',
    texture: 'neptune',
    hasRings: true,
    facts: [
      'Neptune has the strongest winds in the solar system',
      'Neptune was discovered through mathematical predictions',
      'Neptune has completed only one orbit since its discovery',
      'Neptune has a Great Dark Spot similar to Jupiter\'s Great Red Spot'
    ]
  }
];

module.exports = planets;