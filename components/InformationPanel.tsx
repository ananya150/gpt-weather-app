import React from 'react'
import { MoonIcon , SunIcon } from 'lucide-react';
import Image from 'next/image';
import CityPicker from './CityPicker';
import { weatherCodeToString } from '@/lib/weatherCodeToString';
import moment from 'moment';


type Props = {
    city: string,
    lat: string,
    long: string,
    results: Root
}

const getTime = (timeStr: string) => {

    let time = new Date(timeStr);

    // Add the time difference in hours
    time.setHours(time.getHours() + 5);

    // Add the time difference in minutes
    time.setMinutes(time.getMinutes() + 30);

    let hours = time.getHours();
    let minutes = time.getMinutes();

    return `${hours}:${minutes}`
}

const InformationPanel = ({city , lat , long , results}: Props) => {
  return (
    <div className='text-white p-10 bg-gradient-to-br from-[#394F68] to-[#183B7E]'>
        <div className='pb-5'>
            <h1 className='text-6xl font-bold'>{decodeURI(city)}</h1>
            <p className='text-xs text-gray-400'>Long/Lat: {long} , {lat}</p>
        </div>

        <CityPicker />

        <hr className='my-10' />

        <div className='mt-5 flex items-center justify-between space-x-10 mb-5'>
            <div>
                <p className='text-xl'>
                    {
                        new Date().toLocaleDateString("en-GB", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })
                    }
                </p>
                <p className='font-extralight'>
                    Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </p>
            </div>
            <p className='text-xl font-bold uppercase'>
                {
                    new Date().toLocaleTimeString("en-GB" , {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    })
                }
            </p>
        </div>

        <hr className='mt-10 mb-5' />

        <div className='flex items-center justify-between'>
            <div>
                <Image 
                    src={`https://www.weatherbit.io/static/img/icons/${weatherCodeToString[results.current_weather.weathercode].icon}.png`}
                    alt={weatherCodeToString[results.current_weather.weathercode].label}  
                    width={75}
                    height={75}  
                />
                <div className='flex items-center justify-between space-x-10'>
                    <p className='text-6xl font-semibold'>{`${results.current_weather.temperature.toFixed(1)}°`}</p>
                    <p className='text-right font-extralight text-lg'>{weatherCodeToString[results.current_weather.weathercode].label}</p>
                </div>
            </div>
        </div>
        <div className='py-5 space-y-2 '>
            <div className='flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]'>
                <SunIcon className='h-10 w-10 text-gray-400'/>
                <div className='flex-1 flex justify-between items-center'>
                    <p className='font-extralight'>Sunrise</p>
                    <p className='uppercase text-2xl'>
                        {/* {new Date(results.daily.sunrise[0]).toLocaleTimeString("en-GB" , {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true
                        })} */}
                        {getTime(results.daily.sunrise[0])}
                    </p>
                </div>
            </div>
            <div className='flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]'>
                <SunIcon className='h-10 w-10 text-gray-400'/>
                <div className='flex-1 flex justify-between items-center'>
                    <p className='font-extralight'>Sunset</p>
                    <p className='uppercase text-2xl'>
                        {/* {new Date(results.daily.sunset[0]).toLocaleTimeString("en-GB" , {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true
                        })} */}
                        {getTime(results.daily.sunset[0])}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InformationPanel