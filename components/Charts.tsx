'use client';
import React from 'react';
import { useEffect  } from 'react';

import { Card, Title, AreaChart } from '@tremor/react';

type Props = {
    results: Root,
    lat: string,
    long: string
}

export const getApiCall = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
    });
    const obj = await res.json();
    return obj;
  }

const TemperatureChart = ({results , lat , long}: Props) => {

  const hourly = results.hourly.time.map((time: any) => new Date(time).toLocaleString("en-US" , {
    hour: "numeric",
    hour12: false
    })).slice(0,24)

    const data1 = hourly.map((hour: any , i: any) => ({
      time: Number(hour),
      "UV Index": results.hourly.uv_index[i],
      "Temperature (C)": results.hourly.temperature_2m[i],
  }))

    const data2 = hourly.map((hour: any , i: any) => ({
      time: Number(hour),
      "Rain (%)": results.hourly.precipitation_probability[i],
  }))

  const data3 = hourly.map((hour: any , i: any) => ({
    time: Number(hour),
    "Humidity (%)": results.hourly.relativehumidity_2m[i],
  }))

  
const dataFomatter = (number: number) => `${number} °C`;
const dataFomatter2 = (number: number) => `${number} %`;


  return (
    <div className='space-y-3'>
      <Card>
          <Title>Temperature and UV Index</Title>
          <AreaChart 
              className='mt-6'
              data={data1}
              showLegend
              index='time'
              categories={["Temperature (C)" , "UV Index" ]}
              colors = {["yellow" , "rose"]}
              minValue={0}
              valueFormatter={dataFomatter}
              yAxisWidth={40}

          />
      </Card>
      <Card>
        <Title>Chances of Rain</Title>
            <AreaChart 
                className='mt-6'
                data={data2}
                showLegend
                index='time'
                categories={["Rain (%)"]}
                colors = {["blue"]}
                minValue={0}
                maxValue={100}
                valueFormatter={dataFomatter2}
                yAxisWidth={40}
            />
        </Card>
        <Card>
        <Title>Humidity Levels</Title>
            <AreaChart 
                className='mt-6'
                data={data3}
                showLegend
                index='time'
                categories={["Humidity (%)"]}
                colors = {["teal"]}
                minValue={0}
                maxValue={100}
                valueFormatter={dataFomatter2}
                yAxisWidth={40}
            />
        </Card>
    </div>
  )
}

export default TemperatureChart