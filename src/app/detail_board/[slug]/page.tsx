'use client'

import { use, useEffect, useState } from "react"
import { createClient } from '@/lib/supabase/client';

interface PageProps {
    params: Promise<{slug?: string}>
}

type BoardContent = {
    board_id?: string
    content?: string;
    time_stamp?: string | null;
    tag_id?: string;
    users?: {username?: string;};
    typeboard?: {tag_name?: string;};
};

export default function Page({params}: PageProps) {
    const {slug} = use(params)
    const [content, setContent] = useState<BoardContent>({})

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
                console.log('getContentError',getContentDataError)
            } else {
                setContent(contentData)
            }
            console.log(contentData)
        }

        fetchData()
    },[])

    return (
        <div className="flex flex-col max-w-screen-2xl mx-auto w-full bg-[#35453848] p-6 gap-y-5">
            <div className="flex flex-col bg-[#758b79] p-5 rounded-2xl gap-y-3">
                <div className="flex w-fit bg-[#5D6A60] text-white px-4 py-2 rounded-xl whitespace-nowrap text-xl">
                    {content.typeboard?.tag_name}
                </div>
                <div className="text-2xl ml-6">
                    {content.content}
                </div>
                <div className="font-semibold text-xl">
                    User : {content.users?.username}
                </div>
            </div>
            <div className="flex flex-col bg-[#758b79] p-5 rounded-2xl gap-y-3">
                <input
                    type="text"
                    placeholder="พิมพ์คอมเมนต์..."
                    className="flex-1 border rounded px-3 py-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col bg-[#758b79] p-5 rounded-2xl gap-y-3">
                
            </div>

            <div className="flex flex-col bg-[#758b79] p-5 rounded-2xl gap-y-3">
                
            </div>
            <div className="flex flex-col bg-[#758b79] p-5 rounded-2xl gap-y-3">
                
            </div>
        </div>
    ) 
}