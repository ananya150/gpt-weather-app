'use client';

import CityPicker from "@/components/CityPicker";
import { Card , Divider , Subtitle , Text } from "@tremor/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394F68] to-[#183B7E] p-10 flex flex-col justify-center">
      <Card className="max-w-2xl mx-auto ">
        <Text className="text-6xl font-bold text-center mb-10">Weather GPT</Text>
        <Subtitle className="text-xl text-center">Powered by OpenAI , NextJS , Tailwindcss , Tremor & more</Subtitle>
      
        <Divider className="my-10" />

        <Card className="bg-gradient-to-br from-[#394F68] to-[#183B7E]">
          <CityPicker />
        </Card>

      </Card>
    </div>
  )
}
