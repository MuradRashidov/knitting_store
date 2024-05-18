"use client"
import { useUser } from '@clerk/nextjs'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface HeartFavoriteProps {
    product:ProductType;
    updateSignedInUser?:(user:UserType)=>void
}
const HeartFavorite = ({product,updateSignedInUser}:HeartFavoriteProps) => {
    const router = useRouter();
    const {user} = useUser();

    const [loading,setLoading] = useState(false);
    const [isLiked,setIsLiked] = useState(false);

    const getUser = async() => {
        try {
            setLoading(true)
            const res = await fetch('/api/users',{method:"GET"});
            const data = await res.json();
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
                updateSignedInUser && updateSignedInUser(updatedUser);
                setIsLiked(updatedUser.wishlist.includes(product._id));
            }
        } catch (error) {
            console.log('[whislist_POST]',error);
        }
    }
  return (
    <button onClick={handleLike}>
      <Heart fill={`${isLiked ? "red" : "white"}`} />
    </button>
  )
}

export default HeartFavorite