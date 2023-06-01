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

    const hourly = results.hourly.time.map(time => new Date(time).toLocaleString)

    const [data , setData] = React.useState<any[]>([]);

    useEffect(() => {
      const fetch = async () => {
        const res = await getApiCall(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=uv_index,uv_index_clear_sky&timezone=Europe%2FLondon`)
        const hourly = res.hourly.time.map((time: any) => new Date(time).toLocaleString("en-US" , {
            hour: "numeric",
            hour12: false
        })).slice(0,24)
        const data = hourly.map((hour: any , i: any) => ({
            time: Number(hour),
            "UV Index": results.hourly.uv_index[i],
            "Temperature (C)": results.hourly.temperature_2m[i],
        }))
        setData(data)
      }
      fetch();
    }, [])
  
const dataFomatter = (number: number) => `${number} °C`

  return (
    <Card>
        <Title>Temperature and UV Index</Title>
        <AreaChart 
            className='mt-6'
            data={data}
            showLegend
            index='time'
            categories={["Temperature (C)" , "UV Index" ]}
            colors = {["yellow" , "rose"]}
            minValue={0}
            valueFormatter={dataFomatter}
            yAxisWidth={40}

        />
    </Card>
  )
}

export default TemperatureChart