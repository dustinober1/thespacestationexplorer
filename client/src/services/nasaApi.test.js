import { getAstronomyPictureOfTheDay, getNearEarthObjects } from './nasaApi';

global.fetch = jest.fn();

describe('NASA API Service', () => {
  let consoleError;

  beforeEach(() => {
    fetch.mockClear();
    consoleError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = consoleError;
  });

  describe('getAstronomyPictureOfTheDay', () => {
    it('should fetch the APOD data successfully', async () => {
      const mockApodData = { title: 'Test APOD', url: 'test.jpg' };
      fetch.mockResolvedValueOnce({ ok: true, json: async () => mockApodData });

      const data = await getAstronomyPictureOfTheDay();
      expect(data).toEqual(mockApodData);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('planetary/apod'));
    });

    it('should return a mock response on API error', async () => {
      fetch.mockResolvedValueOnce({ ok: false, status: 500 });

      const data = await getAstronomyPictureOfTheDay();
      expect(data.title).toBe('Astronomy Picture of the Day');
      expect(data.explanation).toContain('temporarily unavailable');
    });
  });

  describe('getNearEarthObjects', () => {
    it('should fetch NEO data successfully', async () => {
      const mockNeoData = { element_count: 1, near_earth_objects: {} };
      fetch.mockResolvedValueOnce({ ok: true, json: async () => mockNeoData });

      const data = await getNearEarthObjects('2025-11-01', '2025-11-02');
      expect(data).toEqual(mockNeoData);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('neo/rest/v1/feed'));
    });

    it('should return a mock response on API error', async () => {
      fetch.mockResolvedValueOnce({ ok: false, status: 500 });

      const data = await getNearEarthObjects('2025-11-01', '2025-11-02');
      expect(data.element_count).toBe(0);
    });
  });
});
