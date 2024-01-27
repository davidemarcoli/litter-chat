"use server"

import type {Stripe} from 'stripe'

import {redirect} from 'next/navigation'
import {headers} from 'next/headers'

import {stripe} from '@/lib/stripe'
import {formatAmountForStripe} from '../(utils)/stripe-helpers'
import {CURRENCY} from '../(config)/CurrencyConstants'
import ApiService from "@/app/(services)/ApiService";


// Function to create or retrieve a customer in Stripe
async function getOrCreateCustomer(userId: string | undefined): Promise<Stripe.Customer> {
    // Check if the customer already exists in Stripe
    if (userId) {

        return await ApiService.get('/stripe-customer-mapping/' + userId)
            .then(async (response) => {
                const stripeCustomerId = response.data.stripeCustomerId
                console.log("trying to retrieve stripe customer with id: " + stripeCustomerId)
                let existingCustomer = await stripe.customers.retrieve(stripeCustomerId);
                if (existingCustomer && existingCustomer.deleted) {
                    console.log("customer was deleted")
                    // If the customer exists but was deleted, update its status and save it
                    existingCustomer = await stripe.customers.update(stripeCustomerId, {
                        metadata: {status: 'active'},
                    });
                }
                return existingCustomer;
            })
            .catch(async () => {
                // If the customer doesn't exist, create a new one
                console.log("customer does not exist, creating new one")
                return await ApiService.get('/user/' + userId)
                    .then(async (response) => {
                        console.log("creating customer with email: " + response.data.email)
                        const newCustomer = await stripe.customers.create({
                            email: response.data.email,
                        });
                        console.log("created customer with id: " + newCustomer.id)
                        await ApiService.post('/stripe-customer-mapping', {
                            userId: userId,
                            stripeCustomerId: newCustomer.id
                        })
                        return newCustomer;
                    })
                    .catch((error) => {
                        console.log(error)
                        throw new Error("Error while creating customer", error)
                    })
            })

        // try {
        //     let existingCustomer = await stripe.customers.retrieve(userId);
        //     if (existingCustomer && existingCustomer.deleted) {
        //         // If the customer exists but was deleted, update its status and save it
        //         existingCustomer = await stripe.customers.update(userId, {
        //             metadata: { status: 'active' },
        //         });
        //     }
        //     return existingCustomer;
        // } catch (error) {
        //     // If the customer doesn't exist, create a new one
        //     const newCustomer = await stripe.customers.create({
        //         id: userId, // Set the customer's ID to the user ID
        //         // You can also add other customer information here if needed
        //     });
        //     return newCustomer;
        // }
    }
    throw new Error("User ID is not provided");
}

export async function createCheckoutSession(data: FormData, userId: string | undefined): Promise<void> {

    const customer = await getOrCreateCustomer(userId)

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
            cancel_url: `${headers().get('origin')}/checkout/cancel`,
            customer: userId,
        })

    redirect(checkoutSession.url as string)
}

export async function createPaymentIntent(data: FormData, userId: string | undefined): Promise<{
    client_secret: string
}> {
    const paymentIntent: Stripe.PaymentIntent =
        await stripe.paymentIntents.create({
            amount: formatAmountForStripe(
                Number(data.get('') as string),
                CURRENCY
            ),
            automatic_payment_methods: {enabled: true},
            currency: CURRENCY,
            customer: userId
        })

    return {client_secret: paymentIntent.client_secret as string}
}

export async function getSubscriptionsOfUser(userId: string): Promise<Stripe.Subscription[]> {
    const subscriptions = await stripe.subscriptions.list({
        customer: userId
    })

    const data = subscriptions.data.map((subscription) => {
        console.log(subscription)
    })

    return subscriptions.data;
}