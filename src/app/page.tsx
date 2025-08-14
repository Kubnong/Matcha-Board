'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { createClient } from '@/lib/supabase/client';
import { Key, Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation' //ใช้ตอนอยู่ use client
import Link from 'next/link'

export default function Home() {
  type BoardContent = {
    board_id?: string
    content?: string;
    time_stamp?: string | null;
    tag_id?: string;
    users?: {username?: string;};
    typeboard?: {tag_name?: string;};
  };
  const [users, setUser] = useState<any>({})
  const [content, setContent] = useState<BoardContent[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // tag_id -> name   time_stamp -> 25/8/2568 14.32   user_id -> username
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      //ดึงชื่อ username ของเรา
      const { data: userData, error } = await supabase
        .from('users')
        .select(`username`)
        .eq('user_id',userId)

      if(error) {
        console.log('Error',error)
        router.push("/login")
      } else {
        setUser(userData[0])
      }

      //ดึงข้อมูล post ทั้งหมด
      const { data: contentData, error: getContentDataError } = await supabase
        .from('board')
        .select(`*,users:user_id(username),typeboard:tag_id(tag_name)`)
        .order('time_stamp', { ascending: false })

      if(getContentDataError) {
        console.log('getContentError',getContentDataError)
      } else {
        console.log(contentData)
        setContent(contentData)
      }
      console.log(contentData)
      
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) 
    return <div>Loading...</div>

  return (
    <Suspense fallback={<div>กำลังโหลดข้อมูล...</div>}>
      <div className="flex flex-col max-w-screen-2xl mx-auto w-full bg-[#35453848] p-6 gap-y-5">
        <div className="overflow-x-auto w-full">
          <Swiper
            spaceBetween={8}
            slidesPerView="auto"
            className="w-full"
            slidesOffsetAfter={24}
          >
            {['ทั้งหมด', 'ทั่วไป', 'การเรียน', 'ความงาม', 'เกมส์', 'การ์ตูน', 'ดนตรี'].map((cat, idx) => (
              <SwiperSlide key={idx} className="!w-auto py-3">
                <button className="bg-[#5D6A60] hover:bg-[#677c6b] text-white px-4 py-2 rounded-xl whitespace-nowrap text-2xl">
                  {cat}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="text-4xl font-bold text-white whitespace-nowrap">
          User : {users.username}
        </div>
        <div className="flex flex-col bg-[#758b79] p-5 rounded-2xl gap-y-5">
          {content.map((item: BoardContent, index: number) => (
            <Link href={`detail_board/${item.board_id}-${item.content?.slice(0,40)}`} key={item.board_id} className="flex flex-col bg-[#f5f0e1c5] p-5 rounded-2xl gap-3">
              <div className="flex gap-2 justify-between">
                <div className="p-2 rounded-lg bg-[#8F8585] w-fit">
                  {item.typeboard?.tag_name}
                </div>
                <div className="p-2 rounded-lg bg-[#8F8585] w-fit">
                  {/* {item.time_stamp} */}
                  {item.time_stamp ? new Date(item.time_stamp).toLocaleString('th-TH', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  }) : 'No date availble'}
                </div>
              </div>
              <div className='text-xl font-semibold text-black'>
                {item.content}
              </div>
              {
                users.username === item.users?.username
                  ? <div className='text-blue-500'>{item.users?.username}</div>
                  : <div>{item.users?.username}</div>
              }
            </Link>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
