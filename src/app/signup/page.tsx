export default function Page() {
    return(
        <div className="flex items-center justify-center bg-[#3E5F44] p-10">
            <div className="flex flex-col p-5 bg-gray-100 gap-3 items-center justify-center w-200 h-full">
                <div className='text-black text-2xl font-bold'>
                    ลงทะเบียน
                </div>
                <div className='grid grid-cols-2 text-black gap-3 w-full'>
                    <div className="flex flex-col">
                        ชื่อ
                        <input
                            type='text'
                            placeholder='ชื่อ'
                            className='border-1 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-[#2196F3] width-500 h-10 p-3 rounded-md'
                            // focus:outline-none = ลบเส้นขอบสีน้ำเงินจาง ๆ ที่ browser เพิ่มให้อัตโนมัติ    
                        />
                    </div>
                    <div className="flex flex-col">
                        นามสกุล
                        <input
                            type='text'
                            placeholder='นามสกุล'
                            className='border-1 border-gray-300 h-10 p-3 rounded-md'   
                        />
                    </div>
                    <div className="flex flex-col">
                        เบอร์โทรศัพท์
                        <input
                            type='text'
                            placeholder='เบอร์โทรศัพท์'
                            className='border-1 border-gray-300 h-10 p-3 rounded-md'   
                        />
                    </div>
                    <div className="flex flex-col">
                        วันเกิด
                        <input
                            type='date'
                            placeholder='วันเกิด'
                            className='border-1 border-gray-300 h-10 p-3 rounded-md'   
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <div className="flex flex-col text-black">
                        อีเมล
                        <input
                            type='email'
                            placeholder='อีเมล'
                            className='border-1 border-gray-300 h-10 p-3 rounded-md'   
                        />
                    </div>
                    <div className="flex flex-col text-black">
                        รหัสผ่าน
                        <input
                            type='password'
                            placeholder='รหัสผ่าน'
                            className='border-1 border-gray-300 h-10 p-3 rounded-md'   
                        />
                    </div>
                    <div className="flex flex-col text-black">
                        ยืนยันรหัสผ่าน
                        <input
                            type='password'
                            placeholder='ยืนยันรหัสผ่าน'
                            className='border-1 border-gray-300 h-10 p-3 rounded-md'   
                        />
                    </div>
                    <button className='flex rounded-md bg-[#2196F3] text-white w-full h-10 items-center justify-center'>
                        สมัครสมาชิก
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center h-120 justify-center gap-2">
                <div className="w-px h-full bg-gray-700"/>
                    <span className="px-2 text-gray-800 text-sm">หรือ</span>
                <div className="w-px h-full bg-gray-700"/>
            </div>
            <div className='flex flex-col text-black p-5 bg-gray-100 items-center justify-center gap-3'>
                <div className='flex rounded-md bg-blue-700 text-white w-100 h-10 justify-center'>
                    <button>
                        เข้าสู่ระบบด้วย Facebook
                    </button>
                </div>
                <div className='flex rounded-md bg-blue-500 text-white w-100 h-10 justify-center'>
                    <button>
                        เข้าสู่ระบบด้วย Google
                    </button>
                </div>
                <div className="text-gray-400">
                    เป็นสมาชิกอยู่แล้ว? 
                    <a href="#" className='text-black'> เข้าสู่ระบบ</a>
                </div>
                <div className="text-gray-400">
                    หากท่าน
                    <a href="#" className='text-gray-700'> ลืมรหัสผ่าน</a>
                </div>
            </div>
        </div>
    ) 
}