'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { createClient } from '@/lib/supabase/client';
import { Key, Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation' //ใช้ตอนอยู่ use client
import { UUID } from 'crypto';
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';

export default function Home() {
  type BoardContent = {
    board_id?: UUID
    content?: string;
    time_stamp?: Timestamp;
    tag_id?: UUID;
    user_id?: UUID;
  };
  const [users, setUser] = useState<any>({})
  const [content, setContent] = useState<BoardContent[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      // const { data: {user} ,error } = await supabase.auth.getUser()
      // if(error) {
      //   router.push("/login")
      // } else {
      //   setUser(user)
      // }
      const { data: userData, error } = await supabase
        .from('users')
        .select(`username`)
        .eq('user_id',userId)

      if(error) {
        console.log('Error',error)
        router.push("/error")
      } else {
        console.log(userData)
        setUser(userData[0])
      }

      const { data: content, error: getContentError } = await supabase
        .from('board')
        .select('*')

      if(getContentError) {
        console.log('getContentError',getContentError)
      } else {
        console.log('setContent success')
        console.log(content)
        setContent(content)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) 
    return <div>Loading...</div>

  return (
    <Suspense fallback={<div>กำลังโหลดข้อมูล...</div>}>
      <div className="flex flex-col max-w-screen-2xl mx-auto w-full bg-[#354538] p-6 gap-y-5">
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
        {users.username}
      </div>
      <div className="flex flex-col bg-[#58695B] p-5 rounded-2xl gap-y-5 tex">
        {content.map((item: BoardContent, index: number) => (
          <div key={item.board_id} className="flex flex-col bg-[#736767] p-5 rounded-2xl gap-3">
            <div className="flex gap-2">
              <div className="p-2 px-4 rounded-lg bg-[#8F8585] w-fit">
                {item.tag_id}
              </div>
              <div className="p-2 px-4 rounded-lg bg-[#8F8585] w-fit">
                {item.time_stamp}
              </div>
            </div>
            <div>
              {item.content}
            </div>
            <div>
              {item.user_id}
            </div>
          </div>
        ))}
{/* 
        <div className="flex flex-col bg-[#736767] p-5 rounded-2xl gap-3">
          <div className="flex gap-2">
            <div className="p-2 px-4 rounded-lg bg-[#8F8585] w-fit">
              ทั่วไป
            </div>
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
          </div>
        </div>
        <div className="flex flex-col bg-[#736767] p-5 rounded-2xl gap-3">
          <div className="flex gap-2">
            <div className="p-2 px-4 rounded-lg bg-[#8F8585] w-fit">
              ดนตรี
            </div>
            <div className="p-2 px-4 rounded-lg bg-[#8F8585] w-fit">
              การเรียน
            </div>
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
          </div>
        </div>
        <div className="flex flex-col bg-[#736767] p-5 rounded-2xl gap-3">
          <div className="flex gap-2">
            <div className="p-2 px-4 rounded-lg bg-[#8F8585] w-fit">
              ทั่วไป
            </div>
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
          </div>
        </div>
        <div className="flex flex-col bg-[#736767] p-5 rounded-2xl gap-3">
          <div className="flex gap-2">
            <div className="p-2 px-4 rounded-lg bg-[#8F8585] w-fit">
              ทั่วไป
            </div>
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
          </div>
        </div>
        <div className="flex flex-col bg-[#736767] p-5 rounded-2xl gap-3">
          <div className="flex gap-2">
            <div className="p-2 px-4 rounded-lg bg-[#8F8585] w-fit">
              ทั่วไป
            </div>
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
          </div>
        </div>
        <div className="flex flex-col bg-[#736767] p-5 rounded-2xl gap-3">
          <div className="flex gap-2">
            <div className="p-2 px-4 rounded-lg bg-[#8F8585] w-fit">
              ทั่วไป
            </div>
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate laudantium nihil, id possimus maiores aliquam? Aut voluptatibus quas, doloribus ut praesentium similique neque voluptates facere officiis ea ullam pariatur mollitia!
          </div>
        </div> */}
      </div>
      </div>
    </Suspense>
  );
}
