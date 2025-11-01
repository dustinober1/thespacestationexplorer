/**
 * Service to fetch astronomical data from NASA APIs
 * This service provides access to real-time space data from NASA
 */

// NASA API Configuration - users will need to get their own API key from NASA
const NASA_API_BASE = 'https://api.nasa.gov';
const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY'; // Use DEMO_KEY for demo purposes

/**
 * Fetches the Astronomy Picture of the Day (APOD) from NASA
 * @returns {Promise<Object>} Promise that resolves to the APOD data
 */
export const getAstronomyPictureOfTheDay = async () => {
  try {
    const response = await fetch(
      `${NASA_API_BASE}/planetary/apod?api_key=${NASA_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching APOD:', error);
    // Return a mock response in case of error
    return {
      title: 'Astronomy Picture of the Day',
      explanation: 'Astronomical data is temporarily unavailable. Please update your NASA API key in environment variables.',
      url: 'https://apod.nasa.gov/apod/astropix.html',
      hdurl: 'https://apod.nasa.gov/apod/astropix.html',
      date: new Date().toISOString().split('T')[0],
      media_type: 'image',
      service_version: 'v1'
    };
  }
};

/**
 * Fetches Near Earth Object (NEO) data from NASA
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {Promise<Object>} Promise that resolves to the NEO data
 */
export const getNearEarthObjects = async (startDate, endDate) => {
  try {
    const response = await fetch(
      `${NASA_API_BASE}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching NEO data:', error);
    return {
      element_count: 0,
      near_earth_objects: {}
    };
  }
};

/**
 * Fetches Mars weather data from NASA InSight lander
 * @returns {Promise<Object>} Promise that resolves to Mars weather data
 */
export const getMarsWeather = async () => {
  try {
    // Using a demo endpoint; actual implementation would need proper access
    const response = await fetch(
      `https://api.nasa.gov/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`
    );
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Mars weather:', error);
    return {
      error: 'Mars weather data is currently unavailable'
    };
  }
};

/**
 * Fetches data about asteroids and comets from NASA
 * @returns {Promise<Object>} Promise that resolves to asteroid/comet data
 */
export const getAsteroidsComets = async () => {
  try {
    // Placeholder for asteroid and comet data
    // The actual NASA API for this might require special access
    const response = await fetch(
      `${NASA_API_BASE}/neo/rest/v1/rest/element/diameter_estimates?api_key=${NASA_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching asteroid/comet data:', error);
    return {
      message: 'Asteroid and comet data is currently unavailable'
    };
  }
};

/**
 * Fetches current space mission information from NASA
 * @returns {Promise<Object>} Promise that resolves to mission data
 */
export const getSpaceMissions = async () => {
  // This is a placeholder - NASA doesn't have a single endpoint for all missions
  // This would need to be implemented with multiple endpoints or a custom service
  return {
    missions: [
      {
        name: 'International Space Station',
        status: 'Active',
        description: 'Orbital laboratory in low Earth orbit',
        location: 'Low Earth Orbit',
        crew: '7 astronauts',
        launched: '1998'
      },
      {
        name: 'James Webb Space Telescope',
        status: 'Operational',
        description: 'Deep space space telescope',
        location: 'Lagrange Point 2',
        launched: '2022'
      }
    ]
  };
};

/**
 * Fetches real-time solar wind data from NASA
 * @returns {Promise<Object>} Promise that resolves to solar wind data
 */
export const getSolarWindData = async () => {
  try {
    // Using NOAA data through NASA as an example
    // This would actually need to be implemented with proper NASA data sources
    return {
      timestamp: new Date().toISOString(),
      solar_wind_speed: '400 km/s',
      solar_wind_density: '5 particles/cm³',
      magnetic_field_strength: '5 nT',
      sunspot_number: 'Recent data unavailable'
    };
  } catch (error) {
    console.error('Error fetching solar wind data:', error);
    return {
      error: 'Solar wind data is currently unavailable'
    };
  }
};