import React, { useState, useEffect } from 'react';
import { getAstronomyPictureOfTheDay, getNearEarthObjects } from '../services/nasaApi';
import PropTypes from 'prop-types';
import './NasaData.css';

/**
 * Component to display real-time astronomical data from NASA
 */
function NasaData({ planet }) {
  const [apodData, setApodData] = useState(null);
  const [neos, setNeos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('apod'); // apod, neo, missions

  useEffect(() => {
    fetchNasaData();
  }, []);

  const fetchNasaData = async () => {
    setLoading(true);
    
    try {
      // Fetch Astronomy Picture of the Day
      const apod = await getAstronomyPictureOfTheDay();
      setApodData(apod);
      
      // Fetch Near Earth Objects for the next 7 days
      const today = new Date();
      const endDate = new Date();
      endDate.setDate(today.getDate() + 7);
      
      const startDateStr = today.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      const neoData = await getNearEarthObjects(startDateStr, endDateStr);
      setNeos(neoData);
    } catch (error) {
      console.error('Error fetching NASA data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="nasa-data-container">
        <div className="nasa-data-header">
          <h3>📡 Real-Time Space Data</h3>
        </div>
        <div className="nasa-data-content">
          <p>Loading astronomical data from NASA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="nasa-data-container">
      <div className="nasa-data-header">
        <h3>📡 Real-Time Space Data</h3>
        <div className="nasa-tabs">
          <button 
            className={`nasa-tab ${activeTab === 'apod' ? 'active' : ''}`}
            onClick={() => setActiveTab('apod')}
          >
            Astronomy Picture
          </button>
          <button 
            className={`nasa-tab ${activeTab === 'neo' ? 'active' : ''}`}
            onClick={() => setActiveTab('neo')}
          >
            Near Earth Objects
          </button>
        </div>
      </div>
      
      <div className="nasa-data-content">
        {activeTab === 'apod' && apodData && (
          <div className="nasa-apod">
            <h4>{apodData.title}</h4>
            <div className="apod-media">
              {apodData.media_type === 'image' ? (
                <img 
                  src={apodData.url} 
                  alt={apodData.title} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400x300?text=NASA+Image";
                  }}
                />
              ) : (
                <p>Media type: {apodData.media_type}</p>
              )}
            </div>
            <p className="apod-explanation">{apodData.explanation}</p>
            <p className="apod-date">Date: {apodData.date}</p>
          </div>
        )}
        
        {activeTab === 'neo' && neos && (
          <div className="nasa-neo">
            <h4>Near Earth Objects</h4>
            <p><strong>Count:</strong> {neos.element_count || 0} potentially hazardous asteroids in the next 7 days</p>
            
            {neos.near_earth_objects && Object.keys(neos.near_earth_objects).length > 0 && (
              <div className="neo-list">
                <h5>Upcoming Close Approaches:</h5>
                {Object.entries(neos.near_earth_objects).slice(0, 3).map(([date, objects]) => (
                  <div key={date} className="neo-date-group">
                    <h6>{date}</h6>
                    <ul>
                      {objects.slice(0, 3).map((obj, index) => (
                        <li key={index} className="neo-item">
                          <span className="neo-name">{obj.name}</span>
                          <span className="neo-distance">
                            Distance: {(obj.close_approach_data[0].miss_distance.kilometers / 1000000).toFixed(2)} million km
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

NasaData.propTypes = {
  planet: PropTypes.object // The currently selected planet (may be used for contextual data)
};

export default NasaData;