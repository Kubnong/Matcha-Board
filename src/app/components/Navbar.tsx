import { Search , User , Plus , ShoppingCart , LayoutGrid , ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex flex-col py-4 px-7 shadow-md gap-3">
            <div className="flex justify-between flex-wrap gap-4 items-center w-full max-w-screen-2xl mx-auto">
                <div className="flex items-center min-w-[150px] ">
                    {/* white-space: nowrap; -> "ไม่ให้ข้อความขึ้นบรรทัดใหม่ ไม่ว่าจะแคบแค่ไหนก็ตาม" */}
                    <h1 className="text-4xl font-bold text-white whitespace-nowrap">
                        Matcha
                    </h1>
                </div>
                <div className="flex flex-1 bg-[#677c6b] rounded-full h-10 border-1 border-gray-200 items-center p-4 gap-2 min-w-0 focus-within:border-2 focus-within:border-[#90b196]">
                    <Search className="text-white"/>
                    <input
                        placeholder="ค้นหาสิ่งที่ต้องการได้เลย!!!"
                        className="w-full bg-transparent outline-none placeholder:text-white text-lg"
                        name="Search"
                        type="text"
                    />
                </div>
                <div> 
                    <button className="flex p-2 gap-1 text-white font-semibold hover:bg-[#677c6b] rounded-full">
                        <User className="text-white"/>
                    </button>
                </div>
                <div> 
                    <Link href={"add_board"} className="flex p-2 gap-1 text-white font-semibold hover:bg-[#677c6b] rounded-full">
                        <Plus className="text-white"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}