'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";

const Sidebar = ()=>{
  const pathname = usePathname();

    return(
        <div className="flex flex-col w-2/12 gap-2">
            <Link className={`px-4 py-3 ${pathname==="/restaurant/dashboard/settings" ? "bg-neutral-100":"bg-white"} text-lg font-semibold rounded-lg cursor-pointer`} href={"/restaurant/dashboard/settings"}>Restaurant</Link>
            <Link className={`px-4 py-3 ${pathname==="/restaurant/dashboard/settings/testimonials" ? "bg-neutral-100":"bg-white"} text-lg font-semibold rounded-lg cursor-pointer`} href={"/restaurant/dashboard/settings/testimonials"}>Testimonials</Link>
        </div>
    )
}

export default Sidebar;