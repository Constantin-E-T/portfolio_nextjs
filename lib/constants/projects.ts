// lib/constants/projects.ts
export const CODE_SNIPPETS = [
    {
      language: 'bash',
      code: `# Server Infrastructure
  ╔══ System Overview ══╗
  ├── CPU: 4 cores
  ├── RAM: 8GB
  ├── Storage: 160GB SSD
  └── Uptime: 99.9%
  
  ╔══ Active Services ══╗
  ├── Web Apps: 3
  ├── Databases: 2
  └── SSL Certificates: 4`,
    },
    {
      language: 'python',
      code: `# Galaxy Explorer API
  class NASADataFetcher:
      def __init__(self):
          self.base_url = "api.nasa.gov"
          
      async def get_mars_weather(self):
          """Fetch Mars weather data"""
          return await self.fetch(
              endpoint="/mars-weather"
          )
          
      async def get_apod(self):
          """Get Astronomy Pic of Day"""
          return await self.fetch(
              endpoint="/planetary/apod"
          )`,
    },
    {
      language: 'javascript',
      code: `// Climate Check App
  class WeatherService {
    constructor() {
      this.api = "OpenWeatherMap"
    }
  
    async getCurrentWeather(city) {
      const data = await fetch(
        \`/api/weather/\${city}\`
      )
      return this.formatWeather(
        await data.json()
      )
    }
  
    displayWeather(data) {
      // Update UI with weather
      updateDashboard(data)
    }
  }`,
    },
    {
      language: 'dockerfile',
      code: `# Web App Deployment
  FROM node:18-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  
  # Production build
  ENV NODE_ENV=production
  RUN npm run build
  
  EXPOSE 3000
  CMD ["npm", "start"]`,
    }
  ] as const;