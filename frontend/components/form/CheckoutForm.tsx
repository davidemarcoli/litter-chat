'use client'

import React, { useState } from 'react'
import {Button} from "@nextui-org/react";

import CustomDonationInput from './CustomDonationInput'
import StripeTestCards from './StripeTestCards'

import { formatAmountForDisplay } from '../../app/(utils)/stripe-helpers'
import * as config from '../../app/(config)/CurrencyConstants'
import { createCheckoutSession } from '../../app/(actions)/stripe'

export default function CheckoutForm(): JSX.Element {
  const [loading] = useState<boolean>(false)
  const [input, setInput] = useState<{ customDonation: number }>({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  })

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ): void =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })

  return (
    <form action={createCheckoutSession} className='bg-orange-600'>
      <CustomDonationInput
        className="checkout-style"
        name="customDonation"
        min={config.MIN_AMOUNT}
        max={config.MAX_AMOUNT}
        step={config.AMOUNT_STEP}
        currency={config.CURRENCY}
        onChange={handleInputChange}
        value={input.customDonation}
      />
      <StripeTestCards />
        <Button type="submit"
        disabled={loading} color="secondary">
        Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
      </Button>  
    </form>
  )
}