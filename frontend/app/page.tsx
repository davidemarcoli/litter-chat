import type { Metadata } from 'next'

import Image from 'next/image'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Link from 'next/link'
import CheckoutForm from './components/form/CheckoutForm'

export const metadata: Metadata = {
  title: 'Home | Litter Chat',
}

const Home = () => {
  return (
    <>
      {/*<Navbar/>*/}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <h1>Sign up gangy...</h1>
          <h1>We all know you got no motion. N O N E</h1>
          <h1>no hoes</h1>

          <ul className="card-list">
            <li>
              <Link
                href="/donate-with-checkout"
                className="card checkout-style-background"
              >
                <h2 className="bottom">Donate with Checkout</h2>
                <img src="/checkout-one-time-payments.svg" />
              </Link>
            </li>
            <li>
              <Link
                href="/donate-with-elements"
                className="card elements-style-background"
              >
                <h2 className="bottom">Donate with Elements</h2>
                <img src="/elements-card-payment.svg" />
              </Link>
            </li>
          </ul>


          <CheckoutForm/>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Home