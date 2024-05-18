import { cache } from "react";

export const getCollections = async () => {
    const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`,{
        headers: {
            'Cache-Control': 'no-cache'
            
        },
        cache:"no-store"
    });
    return await collections.json();
}

export const getCollectionDetails = async (collectionId: string) => {
    const collection = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`,{
        cache:"no-store"
    })
    return await collection.json()
  }
export const getProducts = async (query?:string) => {
    const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?query=${query}`,{
        headers: {
            'Cache-Control': 'no-cache'
        },
        cache:"no-store"
    });
    return await products.json();
}

export const getProductDetails = async(productId:string) => {
    console.log(12345);
    
    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,{
        headers: {
            'Cache-Control': 'no-cache'
        },
        cache:"no-cache"
    });
    return await product.json();
}
export const getOrders = async (customerId: string) => {
    const orders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`,{
        cache:"no-cache"
    })
    return await orders.json()
  }
  
  export const getRelatedProducts = async (productId: string) => {
    const relatedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`,{cache:"no-cache"})
    return await relatedProducts.json()
  }
export const dynamic = "force-dynamic";
