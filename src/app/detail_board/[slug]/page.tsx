'use client'

import { use, useEffect, useState } from "react"
import { createClient } from '@/lib/supabase/client';
import { postComment } from "./action";
import { useRouter } from 'next/navigation'
import { MessageCircle, Send, Tag, User } from "lucide-react";


interface PageProps {
    params: Promise<{slug?: string}>
}

type BoardContent = {
    board_id?: string
    content?: string;
    time_stamp?: string | null;
    tag_id?: string;
    users?: {username?: string};
    typeboard?: {tag_name?: string;};
};

type CommentContent = {
    comment_id?: string;
    comment_content?: string;
    comment_time?: string;
    users?: {username?: string};
    board_id?: string;
}

export default function Page({params}: PageProps) {
    const {slug} = use(params)
    const [content, setContent] = useState<BoardContent>({})
    const [comment, setComment] = useState("");
    const [commentData, setCommentData] = useState<CommentContent[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient()
            const id = slug?.slice(0,36)
            if (!id) return <div>ทำไรวะะะะะะ</div>;

            const { data: contentData, error: getContentDataError } = await supabase
                .from('board')
                .select(`*,users:user_id(username),typeboard:tag_id(tag_name)`)
                .eq('board_id',id)
                .single();

            if(getContentDataError) {
                router.push("/error")
            } else {
                setContent(contentData)
            }

            const { data: dataComment, error: getCommentDateError } = await supabase
                .from('comment')
                .select('*,users:user_id(username)')
                .eq('board_id',id)

            if(getCommentDateError) {
                console.log(getCommentDateError)
                router.push("/error")
            } else {
                setCommentData(dataComment)
            }
                
        }

        // comment_id , comment_content , user_id , board_id

        fetchData()
    },[])

    return (
        <div className="flex flex-col max-w-screen-2xl mx-auto w-full p-6 gap-y-5">
            <div className="flex flex-col bg-[#e6e3e381] p-5 rounded-2xl gap-y-3">
                <div className="flex w-fit bg-[#e6e3e381] text-white px-4 py-2 rounded-xl whitespace-nowrap text-xl items-center gap-x-1">
                    <Tag size={24}/>
                    <div className="text-xl font-semibold text-white pb-1">
                       {content.typeboard?.tag_name} 
                    </div>                
                </div>
                <div className="text-3xl ml-6 font-bold">
                    {content.content}
                </div>
                <div className="flex font-bold text-xl text-green-800 gap-x-1">
                    <User className="bg-[#e6e3e3cb] rounded-2xl p-1" size={30}/>
                    <div >
                        {content.users?.username}
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-[#e6e3e381] p-5 rounded-2xl">
                <form className="flex flex-col gap-y-3">
                    <textarea
                        id="comment"
                        name="comment"
                        value={comment}
                        rows={3}
                        cols={40}
                        maxLength={350}
                        placeholder="พิมพ์คอมเมนต์..."
                        onChange={(e) => setComment(e.target.value)}
                        className="flex-1 rounded px-3 py-2 focus:outline-none border-black border-2 focus:border-green-700"
                        required
                    />
                    <input
                        type="hidden"
                        name="boardID"
                        value={content.board_id ?? ""}
                        // ใช้ controlled input ตลอด lifecycle ของ component
                        // เพื่อหลีกเลี่ยง warning “uncontrolled → controlled” ของ React
                        // และให้ FormData.get("board_id") ได้ค่าที่เชื่อถือได้เสมอ
                    />
                    <button className="flex items-center text-xl w-fit gap-x-1 bg-blue-600 p-3 rounded-2xl hover:bg-blue-800" formAction={postComment}>
                        <Send size={25} className="group-hover/btn:translate-x-1 transition-transform duration-300"/>
                        <div className="text-xl font-semibold text-white">Comment</div>
                    </button> 
                </form>
            </div>
            <div className="flex flex-col bg-[#e6e3e381] p-4 rounded-2xl"> 
                <div className="flex items-center gap-x-2 mb-4">
                    <MessageCircle className="text-green-800" size={30} />
                    <h3 className="text-xl font-semibold text-white pb-1">ความคิดเห็น ({commentData.length})</h3>
                </div>
                <div className="flex flex-col rounded-2xl gap-y-3">
                    {commentData.map((item: CommentContent) => (
                        <div key={item.comment_id} className="bg-[#455748] p-4 rounded-2xl">
                            <div className="flex text-md gap-x-1 mb-1 items-center">
                                <User className="bg-[#e6e3e3cb] rounded-2xl p-1" size={30}/>
                                {item.users?.username}
                            </div>
                            <div className="text-2xl">{item.comment_content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) 
}