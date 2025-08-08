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
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-col bg-[#58695B] items-center">
        {/* content select tag */}
        <form>
          <div>Add_board</div>
          <div className="p-5">
            <div className="flex flex-col bg-[#a7bbab] gap-4">
              <div className="">
                <div>Content</div>
                <input
                  id="content"
                  name="content"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border border-amber-800"
                  required
                />
              </div>
              <div className="bg-red-400 flex gap-4 p-3">
                {tag.map((item: string, index: Key) => (
                  <button
                    key={index}
                    type="button"
                    name={tag}
                    onClick={() => setSelectedTag(item)}
                    className={`p-3 rounded-md text-black hover:bg-blue-400 ${
                      selectedTag === item ? "bg-blue-400" : "bg-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <input type="hidden" name="tag" value={selectedTag ?? ""}/>
          <div>
            <button formAction={post}>Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}
