"use client"
import useCart from "@/lib/hooks/useCart"
import { UserButton, useUser } from "@clerk/nextjs"
import { Menu, Search, ShoppingCart, UserCircleIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const Navbar = () => {
    const cart = useCart();
    const {user} = useUser();
    const [dropdownMenu,setDropdownMenu] = useState(false);
    const pathname = usePathname();
    const [query, setQuery] = useState("");
    const router = useRouter();

    console.log(user);
  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex justify-between items-center max-sm:px-2">
        <Link href="/">
            {/* <Image src="/logo.png" alt="logo" width={130} height={80}/> */}
            <p className="border p-2 rounded">knitty<span className="text-base-bold text-red-1">NG</span></p>
        </Link>

        <div className="flex gap-4 text-base-bold max-lg:hidden">
        <Link
          href="/"
          className={`hover:text-red-1 ${
            pathname === "/" && "text-red-1"
          }`}
        >
          Home
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className={`hover:text-red-1 ${
            pathname === "/wishlist" && "text-red-1"
          }`}
        >
          Wishlist
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`hover:text-red-1 ${
            pathname === "/orders" && "text-red-1"
          }`}
        >
          Orders
        </Link>
      </div>
      <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          disabled={query === ""}
        >
        <Search onClick={()=>router.push(`/search/${query}`)} className="cursor-pointer h-4 w-4 hover:text-red-1" />
        </button></div>
        <div className="flex gap-2 items-center relative">
            <Link href="/cart" className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden">
                <ShoppingCart/>
                <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
            </Link>
         
         {user &&   <Menu onClick={()=>setDropdownMenu(!dropdownMenu)} className="cursor-pointer"/>}
         {dropdownMenu && (
          <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden">
            <Link href="/" className="hover:text-red-1">
              Home
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className="hover:text-red-1"
            >
              Wishlist
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className="hover:text-red-1"
            >
              Orders
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
            >
              <ShoppingCart />
              <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
            </Link>
          </div>
        )}

         
         {
            user?<UserButton afterSignOutUrl="/sign-in"/>:(<Link href="sign-in"><UserCircleIcon/></Link>)
         }
        </div>
    </div>
  )
}

export default Navbar