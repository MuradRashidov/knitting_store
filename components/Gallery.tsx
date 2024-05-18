"use client"
import Image from 'next/image'
import React, { useState } from 'react'

const Gallery = ({productMedia}:{productMedia:string[]}) => {
  const [mainImage,setMainImage] = useState(productMedia[0])
  return (
    <div className='flex flex-col gap-3 maw-w-[500px]'>
      <Image width={500} height={500} src={mainImage} alt="product" className="w-96 h-96 rounded-lg shadow-xl object-cover"/>
      <div className='flex gap-2 overflow-auto tailwind-scrollbar-hide'>
            {productMedia.map((image,index)=>(
                    <Image 
                    key={index} 
                    onClick={()=>setMainImage(image)} 
                    width={200} 
                    height={200} 
                    src={image} 
                    alt="product" 
                    className={`w-24 h-24 rounded-lg object-cover cursor-pointer ${mainImage === image?"border-2 border-black":""}`}/>
            ))}
      </div>
    </div>
  )
}

export default Gallery