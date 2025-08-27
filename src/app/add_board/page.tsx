"use client";

import { Key, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { post } from "./action";

export default function Page() {
  const [tag, setTag] = useState<any>([]);
  const [selectedTag, setSelectedTag] = useState<string>();
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      const { data: tagData, error } = await supabase
        .from("typeboard")
        .select("tag_name");

      if (error) {
        console.log("get tag error :", error);
        router.push("/error");
      } else {
        console.log(tagData);
        setTag(tagData.map((item) => item.tag_name));
        //setTag(tagData)
      }

    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#58695B] p-4 rounded-2xl">
        {/* content select tag */}
        <form className="flex flex-col items-center gap-y-4">
          <div className="text-2xl font-extrabold">
            Add_board
          </div>
          <div className="">
            <div className="flex flex-col bg-[#a7bbab] rounded-2xl">
              <div className="flex flex-col p-3 gap-2">
                <div className="text-xl font-bold text-black">
                  Content
                </div>
                <textarea
                  id="content"
                  name="content"
                  value={content}
                  placeholder="Write your content here!!"
                  onChange={(e) => setContent(e.target.value)}
                  className="flex border border-green-700 p-5 w-full text-black"
                  required
                />
              </div>
              <div className="flex flex-col p-3 gap-2">
                <div className="text-xl font-bold text-black">
                  Type
                </div>
                <div className="flex gap-4">
                  {tag.map((item: string, index: Key) => (
                    <button
                      key={index}
                      type="button"
                      name={tag}
                      onClick={() => setSelectedTag(item)}
                      className={`p-3 rounded-md text-black hover:bg-linear-to-bl from-green-500 to-green-200 ${
                        selectedTag === item ? "bg-linear-to-bl from-green-500 to-green-200" : "bg-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <input type="hidden" name="tag" value={selectedTag ?? ""}/>
          <div className="w-full bg-green-600 text-center rounded-2xl p-2">
            <button formAction={post}>Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}
