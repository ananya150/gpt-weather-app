"use client";
import React from 'react';
import { Country , State ,  City } from 'country-state-city';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import { Globe2 } from 'lucide-react';

type option ={
    value: {
        latitude: string,
        longitude: string,
        isoCode: string
    },
    label: string,
} | null;

type stateOption = {
    value: {
        name: string,
        stateCode: string
    },
    name: string
} | null;

type cityOption = {
    value: {
        latitude: string,
        longitude: string,
        countryCode: string,
        name: string,
        stateCode: string
    },
    label: string,
} | null;

const options = Country.getAllCountries().map(country => ({
    value: {
        latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode
    },
    label: country.name,
}))

const stateOptions = (isoCode: string) => {
    return (
        State.getStatesOfCountry(isoCode).map((state) => ({
            value: {
                name: state.name,
                stateCode: state.isoCode
            },
            label: state.name
        }))
    )
}

const cityOptions = (countryCode: string , stateCode: string) => {
    return (
        City.getCitiesOfState(countryCode , stateCode)?.map(state => ({
            value: {
                latitude: state.latitude,
                longitude: state.longitude,
                countryCode: state.countryCode,
                name: state.name,
                stateCode: state.stateCode
            },
            label: state.name,
        }))
    )
}


const CityPicker = () => {

    const [selectedCountry , setSelectedCountry] = React.useState<option>(null);
    const [selectedState , setSelectedState] = React.useState<any>(null)
    const [selectedCity , setSelectedCity] = React.useState<any>(null);

    const router = useRouter();

    const handleSelectedCountry = (option: option) => {
        setSelectedCountry(option);
        setSelectedState(null);
        setSelectedCity(null);
    }

    const handleSelectedState = (option: stateOption) => {
        setSelectedCity(null);
        setSelectedState(option)
    }

    const handleSelectedCity = (option: cityOption) => {
        setSelectedCity(option);
        router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`)
    }


  return (
    <div className='space-y-4'>
        <div className='space-y-2'>
            <div className='flex items-center space-x-2 text-white/80'>
                <Globe2 className='w-5 h-5' />
                <label htmlFor='country'>Country</label>
            </div>
            <Select 
                className='text-black'
                value={selectedCountry}
                onChange={handleSelectedCountry}
            options={options} />
        </div>
        {selectedCountry && (
             <div className='space-y-2'>
                <div className='flex items-center space-x-2 text-white/80'>
                    <Globe2 className='w-5 h-5' />
                    <label htmlFor='country'>State</label>
                </div>
                <Select 
                    className='text-black'
                    value={selectedState}
                    onChange={handleSelectedState}
                    options={stateOptions(selectedCountry.value.isoCode)}
                />
            </div>
        )}
        {selectedState && selectedCountry && (
             <div className='space-y-2'>
                <div className='flex items-center space-x-2 text-white/80'>
                    <Globe2 className='w-5 h-5' />
                    <label htmlFor='country'>City</label>
                </div>
                <Select 
                    className='text-black'
                    value={selectedCity}
                    onChange={handleSelectedCity}
                    options={cityOptions(selectedCountry?.value.isoCode , selectedState?.value.stateCode)}
                />
            </div>
        )}

    </div>
  )
}

export default CityPicker