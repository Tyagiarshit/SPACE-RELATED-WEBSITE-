export interface PlanetData {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  distance: number; // Orbit distance
  size: number;
  speed: number;
  gravity: string;
  distanceFromSun: string;
  atmosphere: string;
  keyFeature: string;
  funFact: string;
  description: string;
  moons: string[];
}

export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    color: '#A5A5A5',
    glowColor: '#E0E0E0',
    distance: 10,
    size: 0.8,
    speed: 0.04,
    gravity: '3.7 m/s²',
    distanceFromSun: '57.9M km',
    atmosphere: 'Thin Exosphere',
    keyFeature: 'Smallest Planet',
    funFact: 'A day on Mercury is longer than its year.',
    description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It is only slightly larger than Earth\'s Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.',
    moons: []
  },
  {
    id: 'venus',
    name: 'Venus',
    color: '#E3BB76',
    glowColor: '#FFD700',
    distance: 15,
    size: 1.2,
    speed: 0.015,
    gravity: '8.87 m/s²',
    distanceFromSun: '108.2M km',
    atmosphere: 'Thick CO2',
    keyFeature: 'Hottest Planet',
    funFact: 'Venus rotates backwards compared to most other planets.',
    description: 'Venus is the second planet from the Sun and is Earth\'s closest planetary neighbor. It\'s one of the four inner, terrestrial (or rocky) planets, and it\'s often called Earth\'s twin because it\'s similar in size and density.',
    moons: []
  },
  {
    id: 'earth',
    name: 'Earth',
    color: '#2233FF',
    glowColor: '#00FFFF',
    distance: 20,
    size: 1.3,
    speed: 0.01,
    gravity: '9.8 m/s²',
    distanceFromSun: '149.6M km',
    atmosphere: 'Nitrogen/Oxygen',
    keyFeature: 'Life Sustaining',
    funFact: 'Earth is the only planet not named after a god.',
    description: 'Earth is our home planet. It is a terrestrial, rocky planet. It has a solid and active surface with mountains, valleys, canyons, plains and so much more. Earth is special because it is an ocean planet.',
    moons: ['Moon']
  },
  {
    id: 'mars',
    name: 'Mars',
    color: '#E27B58',
    glowColor: '#FF4500',
    distance: 25,
    size: 1.0,
    speed: 0.008,
    gravity: '3.71 m/s²',
    distanceFromSun: '227.9M km',
    atmosphere: 'Thin CO2',
    keyFeature: 'Iron Oxide Surface',
    funFact: 'Home to Olympus Mons, the tallest volcano in the solar system.',
    description: 'Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.',
    moons: ['Phobos', 'Deimos']
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    color: '#D39C7E',
    glowColor: '#F4A460',
    distance: 35,
    size: 2.5,
    speed: 0.004,
    gravity: '24.79 m/s²',
    distanceFromSun: '778.5M km',
    atmosphere: 'Hydrogen/Helium',
    keyFeature: 'Great Red Spot',
    funFact: 'Jupiter is twice as massive as all the other planets combined.',
    description: 'Jupiter is the largest planet in our solar system. It is a gas giant and doesn\'t have a solid surface, but it may have a solid inner core about the size of Earth.',
    moons: ['Io', 'Europa', 'Ganymede', 'Callisto']
  },
  {
    id: 'saturn',
    name: 'Saturn',
    color: '#C5AB6E',
    glowColor: '#FFD700',
    distance: 45,
    size: 2.2,
    speed: 0.002,
    gravity: '10.44 m/s²',
    distanceFromSun: '1.4B km',
    atmosphere: 'Hydrogen/Helium',
    keyFeature: 'Complex Ring System',
    funFact: 'It is less dense than water; it would float in a bathtub.',
    description: 'Saturn is the sixth planet from the Sun and the second-largest planet in our solar system. Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system.',
    moons: ['Titan', 'Enceladus', 'Mimas']
  },
  {
    id: 'uranus',
    name: 'Uranus',
    color: '#B5E3E3',
    glowColor: '#00CED1',
    distance: 55,
    size: 1.8,
    speed: 0.001,
    gravity: '8.69 m/s²',
    distanceFromSun: '2.9B km',
    atmosphere: 'Hydrogen/Helium/Methane',
    keyFeature: 'Sideways Rotation',
    funFact: 'Uranus is the only planet that rotates on its side.',
    description: 'Uranus is the seventh planet from the Sun, and has the third-largest diameter in our solar system. It was the first planet found with the aid of a telescope.',
    moons: ['Titania', 'Oberon', 'Umbriel']
  },
  {
    id: 'neptune',
    name: 'Neptune',
    color: '#4B70DD',
    glowColor: '#1E90FF',
    distance: 65,
    size: 1.7,
    speed: 0.0008,
    gravity: '11.15 m/s²',
    distanceFromSun: '4.5B km',
    atmosphere: 'Hydrogen/Helium/Methane',
    keyFeature: 'Supersonic Winds',
    funFact: 'Winds can reach speeds of 2,100 km/h.',
    description: 'Dark, cold and whipped by supersonic winds, ice giant Neptune is the eighth and most distant major planet orbiting our Sun.',
    moons: ['Triton']
  }
];
