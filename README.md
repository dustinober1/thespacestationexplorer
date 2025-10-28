# 🚀 The Space Station Explorer

A full-stack web application for visually exploring the planets of our solar system with interactive 3D visualization.

## Features

- **3D Planet Visualization**: Interactive 3D models of all 8 planets using Three.js
- **Planet Information**: Detailed facts and statistics for each planet
- **Smooth Navigation**: Click and drag to rotate, scroll to zoom
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Modern, space-themed interface with smooth animations

## Tech Stack

### Frontend
- React.js
- Three.js / React Three Fiber
- Axios for API calls
- CSS3 with modern effects

### Backend
- Node.js
- Express.js
- RESTful API architecture

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/dustinober1/thespacestationexplorer.git
   cd thespacestationexplorer
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env
   ```

## Running the Application

### Development Mode (Recommended)

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

### Run Backend Only
```bash
npm run server
```

### Run Frontend Only
```bash
npm run client
```

### Production Build
```bash
npm run build
npm start
```

## Project Structure

```
thespacestationexplorer/
├── server/
│   ├── index.js          # Express server setup
│   ├── routes/
│   │   └── planets.js    # Planet API routes
│   └── data/
│       └── planets.js    # Planet data
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── SpaceScene.js       # 3D planet rendering
│   │   │   ├── PlanetInfo.js       # Planet information panel
│   │   │   ├── PlanetSelector.js   # Planet navigation
│   │   │   └── *.css               # Component styles
│   │   ├── App.js         # Main application
│   │   └── index.js       # React entry point
│   └── package.json
├── package.json
└── README.md
```

## API Endpoints

- `GET /api/planets` - Get all planets
- `GET /api/planets/:id` - Get specific planet by ID

## Controls

- **Rotate**: Click and drag
- **Zoom**: Mouse wheel or pinch gesture
- **Select Planet**: Click on planet name in the left sidebar

## Planet Data

The application includes comprehensive data for all 8 planets:
- Mercury
- Venus
- Earth
- Mars
- Jupiter
- Saturn (with rings!)
- Uranus (with rings!)
- Neptune (with rings!)

Each planet includes:
- Physical characteristics (diameter, mass, temperature)
- Orbital data (distance from sun, orbital period)
- Rotation period
- Number of moons
- Interesting facts

## Future Enhancements

- [ ] Add moons for each planet
- [ ] Include dwarf planets (Pluto, Ceres, etc.)
- [ ] Add asteroid belt
- [ ] Include space stations and satellites
- [ ] Add real textures for planets
- [ ] Implement solar system view with orbital paths
- [ ] Add search functionality
- [ ] Include more detailed scientific data
- [ ] Add sound effects
- [ ] Implement VR support

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License