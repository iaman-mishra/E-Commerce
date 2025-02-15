import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { shopContext } from '../context/shopContext'

const PlaceOrder = () => {

  const[PayMethod,SetPayMethod]=useState('cod')
  const{navigate}=useContext(shopContext)
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>

      {/* adress details */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'}  text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="email" placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input type="number" placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

      </div>



      {/* order summary */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'}  text2={'METHOD'}/>
        </div>
        {/* payment methods */}
        <div className='flex gap3 flex-col lg:flex-row'>
          <div onClick={()=>SetPayMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${PayMethod==='stripe' ? 'bg-green-400':'' }`}></p>
            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
          </div>
          <div onClick={()=>SetPayMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${PayMethod==='razorpay' ? 'bg-green-400' : '' }`}></p>
            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
          </div>
          <div onClick={()=>SetPayMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${PayMethod==='cod' ? 'bg-green-400' : '' }`}></p>
            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
          </div>
        </div>

        <div className='w-full text-end mt-8'>
          <button onClick={navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
        </div>
          
      </div>
    </div>
  )
}

export default PlaceOrder