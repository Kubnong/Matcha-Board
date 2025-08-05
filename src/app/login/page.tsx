// import Link from 'next/link';

// export default function Page() {
//     return(
//         <div className="flex flex-col p-5 bg-[#3E5F44] gap-3 items-center justify-center w-full h-full">
//             <div className="flex flex-col items-center  bg-white p-10 gap-3 ">
//                 <div className="text-2xl font-bold text-black">
//                     เข้าสู่ระบบ 
//                 </div>
//                 <div className="flex w-full">
//                     <input
//                         type='email'
//                         placeholder='อีเมล'
//                         className='text-black border-1 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-[#2196F3] w-full h-10 p-3 rounded-md'
//                     />
//                 </div>
//                 <div className="flex w-full">
//                     <input
//                         type='email'
//                         placeholder='รหัสผ่าน'
//                         className='flex text-black border-1 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-[#2196F3] w-full h-10 p-3 rounded-md'
//                     />
//                 </div>
//                 <div className="flex justify-between w-full text-black items-center">
//                     <div className="flex items-center">
//                         <input
//                             type='checkbox'
//                             className="mr-2 size-4"
//                         />
//                         จำฉันเข้าระบบ
//                     </div>
//                     <Link href='/signup'>
//                         ลืมรหัสผ่าน?
//                     </Link>
//                 </div>
//                 <button className='flex rounded-md bg-[#2196F3] text-white w-full h-10 items-center justify-center'>
//                     เข้าสู่ระบบ
//                 </button>
//                 <div className="flex items-center w-full h-5 justify-center gap-2">
//                     <div className="w-full h-px bg-gray-500"/>
//                         <span className="px-2 text-gray-500 text-sm">หรือ</span>
//                     <div className="w-full h-px bg-gray-500"/>
//                 </div>
//                 <div className='flex border-1 border-gray-400 rounded-md bg-white text-blue-700 w-100 h-10 justify-center'>
//                     <button>
//                         เข้าสู่ระบบด้วย Facebook
//                     </button>
//                 </div>
//                 <div className='flex border-1 border-gray-400 rounded-md bg-white text-gray-400 w-100 h-10 justify-center'>
//                     <button>
//                         เข้าสู่ระบบด้วย Google
//                     </button>
//                 </div>
//                 <div className="text-gray-400">
//                     ไม่ใช้สมาชิก?
//                     <a href="#" className='text-black'> สมัครสมาชิก</a>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { login, signup, logout } from './actions'

export default function LoginPage() {
  return (
    <div>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <label htmlFor="username">Username:</label>
        <input id="username" name="username" type="text"/>
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
      <button onClick={logout}>Log out</button>
    </div>
    
    
  )
}