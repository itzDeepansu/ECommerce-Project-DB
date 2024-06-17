import Link from 'next/link'
import React from 'react'

const Offerbar = () => {
  return (
    <div className='bg-black h-8 flex text-white text-sm justify-center items-center'>
      Summer Sale for all Swim Suits and Free Delivery
      <Link href='/shoppingarea' className='ml-3 border-white underline'>Shop Now</Link>
    </div>
  )
}

export default Offerbar
