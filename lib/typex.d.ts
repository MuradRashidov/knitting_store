type CollectionType = {
    _id:string;
    title:string;
    description:string;
    image:string;
    products:ProductType[];
}

type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    collections: [CollectionType];
    tags: [string];
    sizes: [string];
    colors: [string];
    price: number;
    expense: number;
    createdAt: Date;
    updatedAt: Date;
  }

  type UserType = {
    clerkId: string;
    wishlist: [string];
    createdAt: string;
    updatedAt: string;
  };
  
  type OrderType = {
    shippingAddress: Object;
    _id: string;
    customerClerkId: string;
    products: [OrderItemType]
    shippingRate: string;
    totalAmount: number
  }
  
  type OrderItemType = {
    product: ProductType;
    color: string;
    size: string;
    quantity: number;
    _id: string;
  }