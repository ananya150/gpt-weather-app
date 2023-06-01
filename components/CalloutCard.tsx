'use client';
import React from 'react'
import { CheckCircle2 , AlertCircleIcon  } from 'lucide-react';
import { Callout } from '@tremor/react';

type Props = {
    message: string,
    warning? : boolean
}

const CalloutCard = ({message, warning}: Props) => {
  return (
    <Callout 
        className="mt-4"
        title={message}
        icon={warning ? AlertCircleIcon : CheckCircle2}
        color={warning? "rose": "teal"}
    />
  )
}

export default CalloutCard