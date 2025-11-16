# Planet Textures

This directory contains texture files for the planets in the Space Station Explorer.

## Required Texture Files

Place the following texture files in this directory:

- **mercury.jpg** - Mercury's surface texture
- **venus.jpg** - Venus's cloud/atmospheric texture
- **earth.jpg** - Earth's surface texture
- **mars.jpg** - Mars's surface texture
- **jupiter.jpg** - Jupiter's cloud bands texture
- **saturn.jpg** - Saturn's cloud bands texture
- **uranus.jpg** - Uranus's surface texture
- **neptune.jpg** - Neptune's surface texture
- **pluto.jpg** - Pluto's surface texture
- **ceres.jpg** - Ceres's surface texture
- **haumea.jpg** - Haumea's surface texture
- **makemake.jpg** - Makemake's surface texture
- **eris.jpg** - Eris's surface texture

## Where to Get Textures

You can get high-quality planet textures from these free sources:

### NASA Resources
- **NASA Planetary Photojournal**: https://photojournal.jpl.nasa.gov/
- Search for "Mars Global Surveyor", "Galileo", "Cassini" images

### Free Texture Repositories
- **Solar System Scope**: https://www.solarsystemscope.com/textures/
- Direct download: https://www.solarsystemscope.com/textures/download/

### Texture Requirements
- **Format**: JPG or PNG
- **Resolution**: 1024x512 or higher recommended
- **Size**: Keep under 1MB per texture for web performance
- **Naming**: Use exact filenames listed above (lowercase)

## Alternative: Procedural Textures

If you don't have textures, the app will fall back to using the planet's base color.
You can also create simple procedural textures using Three.js materials with
different colors and roughness values for each planet.

## Usage

Textures are automatically loaded when a planet is displayed. The app will:
1. Try to load the texture from `/textures/[planet-name].jpg`
2. If the texture doesn't exist, fall back to the planet's color
3. Display a smooth transition as the texture loads
