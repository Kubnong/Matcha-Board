"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { createClient } from "@/lib/supabase/client";
import { Key, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; //ใช้ตอนอยู่ use client
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { deleteBoard } from "./action";
import Layout from "./components/layout";

export default function Home() {
  type BoardContent = {
    board_id?: string;
    content?: string;
    time_stamp?: string | null;
    tag_id?: string;
    users?: { user_id?: string; username?: string };
    typeboard?: { tag_name?: string };
  };
  const [users, setUser] = useState<any>({});
  const [content, setContent] = useState<BoardContent[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // tag_id -> name   time_stamp -> 25/8/2568 14.32   user_id -> username
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      // 1) ดูว่ามี session ใน client ไหม
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      }

      // 2) ดึง user จาก server ด้วย token ปัจจุบัน
      const {
        data: { user },
        error: sessionError,
      } = await supabase.auth.getUser();
      const userId = user?.id;
      if (sessionError) {
        router.push("/login");
      }

      // ดึงชื่อ username ของเรา
      // error ไม่ต้องมี type เพรามันชื่อ error อยู่แล้วเลยทำได้
      const { data: userData, error } = await supabase
        .from("users")
        .select(`*`)
        .eq("user_id", userId);

      if (error) {
        //(query ผิดพลาด, DB ล่ม, column ไม่ตรง ฯลฯ)
        console.log("Error", error);
        router.push("/login");
      } else if (userData.length > 0) {
        setUser(userData[0]);
      } else {
        const { data: adminData, error: adminError } = await supabase
          .from("admins")
          .select("*")
          .eq("admin_id", userId);

        if (!adminError) {
          console.log(adminData[0]);
          setUser(adminData[0]);
        } else {
          console.log("Error", error);
          router.push("/login");
        }
      }

      // ดึงข้อมูล post ทั้งหมด
      // supabase.from('board')
      // ดึงข้อมูลจากตาราง board.
      // .select('*')
      // เลือกข้อมูลทุก column ของ board (* = select all).
      // users:user_id(username)
      // เป็นการ ทำ Join กับตาราง users ผ่าน foreign key user_id ของ board.
      // แล้วเลือก column username จากตาราง users.
      // alias ที่ได้ในผลลัพธ์คือ users.

      const { data: contentData, error: getContentDataError } = await supabase
        .from("board")
        .select(`*,users:user_id(user_id,username),typeboard:tag_id(tag_name)`)
        .order("time_stamp", { ascending: false });

      if (getContentDataError) {
        console.log("getContentError", getContentDataError);
      } else {
        setContent(contentData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Suspense fallback={<div>กำลังโหลดข้อมูล...</div>}>
      <Layout>
        <div className="flex flex-col max-w-screen-2xl mx-auto w-full bg-[#35453848] p-6 gap-y-5">
          <div className="overflow-x-auto w-full">
            <Swiper
              spaceBetween={8}
              slidesPerView="auto"
              className="w-full"
              slidesOffsetAfter={24}
            >
              {[
                "ทั้งหมด",
                "ทั่วไป",
                "การเรียน",
                "ความงาม",
                "เกมส์",
                "การ์ตูน",
                "ดนตรี",
              ].map((cat, idx) => (
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
              <div
                className="flex flex-col bg-[#f5f0e1c5] p-5 rounded-2xl gap-3"
                key={item.board_id}
              >
                <Link
                  href={`detail_board/${item.board_id}-${item.content?.slice(
                    0,
                    40
                  )}`}
                >
                  <div className="flex gap-2 justify-between">
                    <div className="p-2 rounded-lg bg-[#8F8585] w-fit">
                      {item.typeboard?.tag_name}
                    </div>
                    <div className="p-2 rounded-lg bg-[#8F8585] w-fit">
                      {/* {item.time_stamp} */}
                      {item.time_stamp
                        ? new Date(item.time_stamp).toLocaleString("th-TH", {
                            dateStyle: "long",
                            timeStyle: "short",
                          })
                        : "No date availble"}
                    </div>
                  </div>
                  <div className="text-xl font-semibold text-black">
                    {item.content}
                  </div>
                </Link>
                <div className="flex justify-between">
                  <div>
                    {users.username === item.users?.username ? (
                      <div className="text-blue-500">
                        {item.users?.username}
                      </div>
                    ) : (
                      <div>{item.users?.username}</div>
                    )}
                  </div>
                  {/* ถ้า users.user_id === item.users?.user_id เป็น true ⇒ คืน <form>...</form> ⇒ เรนเดอร์ฟอร์มปุ่มลบ
                ถ้าเป็น false ⇒ คืน false ⇒ React ไม่เรนเดอร์อะไรเลย */}
                  {users.user_id === item.users?.user_id ||
                  users.role === "admin" ? (
                    <form action={deleteBoard}>
                      <input
                        type="hidden"
                        name="boardId"
                        value={item.board_id}
                      />
                      <button
                        className="text-red-500 hover:text-rose-800 relative z-50"
                        type="submit"
                      >
                        <Trash2 />
                      </button>
                    </form>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </Suspense>
  );
}
