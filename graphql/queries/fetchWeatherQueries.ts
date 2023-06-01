import { gql } from "@apollo/client";

const fetchWeatherQuery = gql`
  query MyQuery(
    $current_weather: String
    $daily: String = "weathercode,apparent_temperature_max,apparent_temperature_min,sunrise,temperature_2m_max,sunset,temperature_2m_min,uv_index_clear_sky_max,uv_index_max"
    $hourly: String = "apparent_temperature,precipitation,rain,precipitation_probability,relativehumidity_2m,showers,snow_depth,snowfall,temperature_2m,uv_index,uv_index_clear_sky,windgusts_10m"
    $latitude: String!
    $longitude: String!
    $timezone: String!
  ){
    myQuery(
      current_weather: $current_weather
      daily: $daily
      latitude: $latitude
      hourly: $hourly
      longitude: $longitude
      timezone: $timezone
    ) {
      elevation
      generationtime_ms
      current_weather {
        is_day
        temperature
        time
        weathercode
        winddirection
        windspeed
      }
      daily {
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        uv_index_clear_sky_max
        time
        uv_index_max
        weathercode
      }
      daily_units {
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        temperature_2m_max
        sunset
        temperature_2m_min
        time
        uv_index_clear_sky_max
        uv_index_max
        weathercode
      }
      hourly {
        apparent_temperature
        precipitation
        precipitation_probability
        rain
        relativehumidity_2m
        snow_depth
        showers
        snowfall
        temperature_2m
        time
        uv_index
        uv_index_clear_sky
        windgusts_10m
      }
      hourly_units {
        apparent_temperature
        precipitation
        rain
        precipitation_probability
        relativehumidity_2m
        showers
        snow_depth
        snowfall
        temperature_2m
        uv_index
        time
        uv_index_clear_sky
        windgusts_10m
      }
      latitude
      longitude
      timezone
      timezone_abbreviation
      utc_offset_seconds
    }
  }
`;

export default fetchWeatherQuery