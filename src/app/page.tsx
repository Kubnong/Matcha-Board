'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Home() {
  return (
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
      <div className="flex flex-col bg-[#58695B] p-5 rounded-2xl gap-y-5 tex">
        <div className="flex flex-col bg-[#736767] p-5 rounded-2xl gap-3">
          <div className="flex gap-2">
            <div className="p-2 px-4 rounded-lg bg-[#8F8585] w-fit">
              ทั่วไป
            </div>
            <div className="p-2 px-4 rounded-lg bg-[#8F8585] w-fit">
              ความรัก
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
        </div>
      </div>
    </div>
  );
}
