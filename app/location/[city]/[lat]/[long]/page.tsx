import React from 'react'
import { getClient } from '@/apollo-client'
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQueries'
import CalloutCard from '@/components/CalloutCard'

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
    <div>

      {/* <InformationPanet /> */}
      
      <div>
        <div className='p-5'>
          <div className='pb-5'>
            <h2 className='text-xl font-bold'>Today&apos;s Overview</h2>
            <p className='text-sm text-gray-400'>
              Last Updated At: {new Date(results.current_weather.time).toLocaleString()}
              ({results.timezone})
            </p>
          </div> 

          <div>
            <CalloutCard message='This is where gpt-4 summary will go!' />
          </div>

        </div>  
      </div>      
    </div>
  )
}

export default WeatherPage