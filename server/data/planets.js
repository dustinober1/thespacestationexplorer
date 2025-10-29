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
  },
  {
    id: 'pluto',
    name: 'Pluto',
    type: 'dwarf planet',
    description: 'A dwarf planet in the Kuiper belt, a ring of bodies beyond Neptune.',
    diameter: 2376,
    mass: '1.309 × 10^22 kg',
    distanceFromSun: 5906.4,
    orbitalPeriod: 90560,
    rotationPeriod: -153.3,
    temperature: { min: -233, max: -223 },
    moons: [
      { name: 'Charon' },
      { name: 'Styx' },
      { name: 'Nix' },
      { name: 'Kerberos' },
      { name: 'Hydra' }
    ],
    color: '#A9A9A9',
    texture: 'pluto',
    facts: [
      'Pluto was considered the ninth planet until 2006',
      'Pluto has a heart-shaped glacier that’s the size of Texas and Oklahoma combined',
      'Pluto is the largest dwarf planet',
      'Pluto has a thin atmosphere of nitrogen, methane and carbon monoxide'
    ]
  },
  {
    id: 'ceres',
    name: 'Ceres',
    type: 'dwarf planet',
    description: 'The largest object in the asteroid belt between Mars and Jupiter.',
    diameter: 946,
    mass: '9.393 × 10^20 kg',
    distanceFromSun: 413.7,
    orbitalPeriod: 1682,
    rotationPeriod: 9.1,
    temperature: { min: -105, max: -38 },
    moons: [],
    color: '#A9A9A9',
    texture: 'ceres',
    facts: [
      'Ceres is the only dwarf planet in the inner solar system',
      'Ceres may have a subsurface ocean',
      'Ceres is named after the Roman goddess of agriculture',
      'Ceres was the first dwarf planet to be visited by a spacecraft'
    ]
  },
  {
    id: 'haumea',
    name: 'Haumea',
    type: 'dwarf planet',
    description: 'A dwarf planet in the Kuiper belt that is shaped like an egg.',
    diameter: 1632,
    mass: '4.006 × 10^21 kg',
    distanceFromSun: 6452,
    orbitalPeriod: 104073,
    rotationPeriod: 3.9,
    temperature: { min: -241, max: -241 },
    moons: [
        { name: 'Namaka' },
        { name: 'Hiʻiaka' }
    ],
    color: '#A9A9A9',
    texture: 'haumea',
    facts: [
      'Haumea is one of the fastest rotating large objects in our solar system',
      'Haumea has two known moons',
      'Haumea is named after the Hawaiian goddess of childbirth',
      'Haumea has a ring'
    ]
  },
  {
    id: 'makemake',
    name: 'Makemake',
    type: 'dwarf planet',
    description: 'A dwarf planet in the Kuiper belt that is slightly smaller than Pluto.',
    diameter: 1434,
    mass: '3.1 × 10^21 kg',
    distanceFromSun: 6850,
    orbitalPeriod: 112897,
    rotationPeriod: 22.5,
    temperature: { min: -239, max: -239 },
    moons: [],
    color: '#A9A9A9',
    texture: 'makemake',
    facts: [
      'Makemake is the second-brightest object in the Kuiper belt',
      'Makemake was discovered in 2005',
      'Makemake is named after the Rapa Nui god of fertility',
      'Makemake has no known moons'
    ]
  },
  {
    id: 'eris',
    name: 'Eris',
    type: 'dwarf planet',
    description: 'A dwarf planet in the scattered disc which is more massive than Pluto.',
    diameter: 2326,
    mass: '1.66 × 10^22 kg',
    distanceFromSun: 10125,
    orbitalPeriod: 203830,
    rotationPeriod: 25.9,
    temperature: { min: -243, max: -217 },
    moons: [
        { name: 'Dysnomia' }
    ],
    color: '#A9A9A9',
    texture: 'eris',
    facts: [
      'Eris is the most massive and second-largest known dwarf planet in the Solar System',
      'The discovery of Eris led to the reclassification of Pluto as a dwarf planet',
      'Eris is named after the Greek goddess of discord',
      'Eris has one known moon, Dysnomia'
    ]
  }
];

module.exports = planets;