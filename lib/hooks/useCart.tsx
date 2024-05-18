import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
    item:ProductType;
    quantity:number;
    size?:string;
    color?:string;
}

interface CartStore {
    cartItems:CartItem[];
    addItem:(item:CartItem) => void;
    removeItem:(_id:string) => void;
    increaseQuantity:(_id:string) => void; 
    decreaseQuantity:(_id:string) => void; 
    clearCart:() => void
}

const useCart = create(persist<CartStore>(
    (set,get)=>({
        cartItems:[],
        addItem:(data:CartItem) => {
            const {item,quantity,size,color} = data;
            const currentItems = get().cartItems;
            const isExistig = currentItems.find((cartItem)=>cartItem.item._id === item._id);
            if (isExistig) {
                return toast("Item has already exsisted",{icon:"🛒"});
            }
            set({cartItems:[...currentItems,{item,quantity,size,color}]});
            toast.success("Item added to cart",{icon:"🛒"});
        },
        removeItem:(_id:string) => {
            const newCartItems = get().cartItems.filter((cartItem)=>cartItem.item._id !== _id);
            set({cartItems:newCartItems});
            toast("Item removed from cart");
        },
        increaseQuantity:(_id:string)=> {
            const newCartItems = get().cartItems.map((cartItem)=>cartItem.item._id === _id?{...cartItem,quantity:cartItem.quantity +1}:cartItem);
            set({cartItems:newCartItems});
            toast.success("Cart item quantity increased");
        },
        decreaseQuantity:(_id:string)=>{
            const newCartItems = get().cartItems.map((cartItem)=>cartItem.item._id === _id?{...cartItem,quantity:cartItem.quantity +1}:cartItem);
            set({cartItems:newCartItems});
            toast.success("Cart item quantity decreased");
        },
        clearCart:()=>{
            set({cartItems:[]})
        }
    }),

    {
        name:"cart-storage",
        storage:createJSONStorage(()=>localStorage)
    }
));

export default useCart;
