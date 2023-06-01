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

    const [data1 , setData1] = React.useState<any[]>([]);
    const [data2 , setData2] = React.useState<any[]>([]);
    const [data3 , setData3] = React.useState<any[]>([]);


    useEffect(() => {
      const fetch = async () => {
        const res = await getApiCall(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=uv_index,uv_index_clear_sky&timezone=Europe%2FLondon`)
        const hourly = res.hourly.time.map((time: any) => new Date(time).toLocaleString("en-US" , {
            hour: "numeric",
            hour12: false
        })).slice(0,24)
        const data1 = hourly.map((hour: any , i: any) => ({
            time: Number(hour),
            "UV Index": results.hourly.uv_index[i],
            "Temperature (C)": results.hourly.temperature_2m[i],
        }))
        setData1(data1)
        const data2 = hourly.map((hour: any , i: any) => ({
          time: Number(hour),
          "Rain (%)": results.hourly.precipitation_probability[i],
      }))
      setData2(data2);
      const data3 = hourly.map((hour: any , i: any) => ({
        time: Number(hour),
        "Humidity (%)": results.hourly.relativehumidity_2m[i],
    }))
    setData3(data3);
      }
      fetch();
    }, [])
  
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