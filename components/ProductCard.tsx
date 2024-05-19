"use client"
import { useUser } from '@clerk/nextjs'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import HeartFavorite from './HeartFavorite'
interface ProductCardProps {
    product:ProductType;
    updateSignedInUser?:(user:UserType)=>void
}
const ProductCard = ({product,updateSignedInUser}:ProductCardProps) => {
    const router = useRouter();
    const {user} = useUser();

    const [loading,setLoading] = useState(false);
    const [signedInUser,setSignedInUser] = useState<UserType | null>(null);
    const [isLiked,setIsLiked] = useState(false);

    const getUser = async() => {
        try {
            setLoading(true)
            const res = await fetch('/api/users',{method:"GET"});
            const data = await res.json();
            setSignedInUser(data);
            setIsLiked(data.wishlist.includes(product._id));
            setLoading(false)
            
        } catch (error) {
            console.log('[users_GET]',error);
            
        }
    }
    useEffect(()=>{
        if (!user) {
            getUser();
        }
    },[user])
    const handleLike = async(e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        e.stopPropagation();
        try {
            if(!user){
                router.push("/sign-in")
                return
            }
            else{
                const res = await fetch("/api/users/wishlist",{
                    method:"POST",
                    body:JSON.stringify({productId:product._id})
                });
                const updatedUser = await res.json();
                setSignedInUser(updatedUser);
                setIsLiked(updatedUser.wishlist.includes(product._id));
            }
        } catch (error) {
            console.log('[whislist_POST]',error);
        }
    }
  return (
    <div onClick={()=>{router.push(`/products/${product._id}`)}} className='w-[220px] flex flex-col gap-2 cursor-pointer]'>
        <Image style={{height:"300px"}} src={product.media[0]} alt={product.title} width={250} height={300} className='h-300 !important object-cover cursor-pointer rounded-lg'/>
        <div>
            <p className='text-base-bold'>{product.title}</p>
            <p className='text-small-medium text-grey-2'>{product.category}</p>
        </div>
        <div className='flex justify-between items-center'>
            <p className='text-body-bold'>(AZN){product.price}</p>
            <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} />
        </div>
    </div>
  )
}

export default ProductCard