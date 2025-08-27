import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { User } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { MessageCircleMore } from "lucide-react";

export default async function Page() {
  const supabase = await createClient();

  const { data: users, error: getUsersError } = await supabase
    .from("users")
    .select("*");

  if (getUsersError) {
    console.log("Error", getUsersError);
    redirect("/error");
  }

  const { data: boards, error: getBoardsError } = await supabase
    .from("board")
    .select("*");

  if (getBoardsError) {
    console.log("Error", getBoardsError);
    redirect("/error");
  }

  const { data: comments, error: getCommentsError } = await supabase
    .from("comment")
    .select("*");

  if (getCommentsError) {
    console.log("Error", getCommentsError);
    redirect("/error");
  }

  return (
    <div className="bg-black flex flex-col justify-center items-center h-screen gap-y-10">
      <div className="font-bold text-4xl bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-transparent bg-clip-text">
        Dashboard Overview
      </div>
      <div className="flex gap-10">
        {/* user */}
        <div className="flex border-2 border-indigo-400 bg-purple-500 p-5 gap-5 items-center rounded-2xl">
          <div className="flex flex-col">
            <div className="font-semibold">Total User</div>
            <div className="text-4xl font-bold">{users.length}</div>
          </div>
          <div>
            <User size={40}/>
          </div>
        </div>
        {/* board */}
        <div className="flex border-2 border-indigo-400 bg-purple-500 p-5 gap-5 items-center rounded-2xl">
          <div className="flex flex-col">
            <div className="font-semibold">Total Board</div>
            <div className="text-4xl font-bold">{boards.length}</div>
          </div>
          <div>
            <ClipboardList size={40}/>
          </div>
        </div>
        {/* comment */}
        <div className="flex border-2 border-indigo-400 bg-purple-500 p-5 gap-5 items-center rounded-2xl">
          <div className="flex flex-col">
            <div className="font-semibold">Total Comment</div>
            <div className="text-4xl font-bold">{comments.length}</div>
          </div>
          <div>
            <MessageCircleMore size={40}/>
          </div>
        </div>
      </div>
    </div>
  );
}
