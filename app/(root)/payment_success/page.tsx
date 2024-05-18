"use client"
import useCart from '@/lib/hooks/useCart'
import { TicketCheck } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

const SuccessfullPayment = () => {
  const cart = useCart();
  useEffect(()=>{cart.clearCart()},[])
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5'>
        <TicketCheck width={100} height={100} className='text-headinig4-bold text-green-500'/>
        <p className='text-headinig4-bold text-green-500'>Ödəniş uğurlu oldu, sifarişiniz qeydə alındı</p>
        <p>Bizi seçdiyiniz üçün təşəkkürlər.</p>
        <Link className='p-4 border text-base-bold hover:text-white hover:bg-black' href="/">Davam et</Link>
    </div>
  )
}

export default SuccessfullPayment