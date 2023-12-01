"use server"

import type { Stripe } from 'stripe'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { stripe } from '@/lib/stripe'
import { formatAmountForStripe } from '../(utils)/stripe-helpers'
import { CURRENCY } from '../(config)/CurrencyConstants'

export async function createCheckoutSession(data: FormData): Promise<void> {
    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
            mode: 'subscription',
            //submit_type: '',
            line_items: [
                {
                    quantity: 1,
                    price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM,
                }
            ],
            success_url: `${headers().get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${headers().get('origin')}/checkout/cancel`
        })

    redirect(checkoutSession.url as string)
}

export async function createPaymentIntent(data: FormData): Promise<{ client_secret: string }> {
    const paymentIntent: Stripe.PaymentIntent =
        await stripe.paymentIntents.create({
            amount: formatAmountForStripe(
                Number(data.get('') as string),
                CURRENCY
            ),
            automatic_payment_methods: { enabled: true },
            currency: CURRENCY
        })

    return { client_secret: paymentIntent.client_secret as string}
}