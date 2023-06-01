import React, { useEffect } from 'react'
import { getClient } from '@/apollo-client'
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQueries'
import CalloutCard from '@/components/CalloutCard'
import StatCard from '@/components/StatCard'
import InformationPanel from '@/components/InformationPanel'
import TemperatureChart from '@/components/Charts'

type Props = {
    params:{
        city: string,
        lat: string,
        long: string
    }
}

const WeatherPage = async ({params: {city , lat , long}}: Props) => {

  const client = getClient();

  const {data} = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      latitude: lat,
      longitude: long,
      timezone: "GMT"
    }
  })

  const results : Root = data.myQuery;
  console.log(results);

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>

      <InformationPanel city={city} results={results} lat={lat} long={long} />
      
      <div className='p-5 lg:p-10 md:flex-1'>
        <div className='p-5'>
          <div className='pb-5'>
            <h2 className='text-xl font-bold'>Today&apos;s Overview</h2>
            <p className='text-sm text-gray-400'>
              Last Updated At: {new Date(results.current_weather.time).toLocaleString()}
              ({results.timezone})
            </p>
          </div> 

          <div className='m-2 mb-10'>
            <CalloutCard message='This is where gpt-4 summary will go!' />
          </div>

          <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 m-2'>
            <StatCard title='Maximum Temperature' metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`} color="yellow" />
            <StatCard title='Minimum Temperature' metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`} color="green" />
          
            <div>
              <StatCard title='UV Index' metric={`${results.daily.uv_index_max[0].toFixed(1)}`} color="rose" />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message='The UV is high today, be sure to wear SPF!'
                  warning
                  />
                )
              }
            </div>
            <div className='flex space-x-3'>
              <StatCard title='Wind Speed' metric={`${results.current_weather.windspeed.toFixed(1)}m/s`} color="cyan" />
              <StatCard title='Wind Direction' metric={`${results.current_weather.winddirection.toFixed(1)}°`} color="violet" />
            </div>

          </div>

        </div> 
        
        <hr className='mb-5' />

        <div>
            <TemperatureChart lat={lat} long={long} results={results} />
        </div>

      </div>      
    </div>
  )
}

export default WeatherPage