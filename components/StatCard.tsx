'use client';
import React from 'react'
import { Card , Text , Metric, Color } from '@tremor/react';

type Props = {
    title: string,
    metric: string,
    color?: Color
}

const StatCard = ({title , metric , color}: Props) => {
  return (
    <Card decoration='top' decorationColor={color}>
        <Text>{title}</Text>
        <Metric>{metric}</Metric>

    </Card>
  )
}

export default StatCard