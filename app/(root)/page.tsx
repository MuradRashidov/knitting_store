import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image src="/banner.png" width={2000} height={500} alt="knitting_store" className="w-screen"/>
      <Collections/>
      <ProductList/>
    </div>
  );
}
export const dynamic = "force-dynamic";
