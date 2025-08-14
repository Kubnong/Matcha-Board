'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from 'next/navigation'

export async function postComment(formData: FormData) {
    // comment_id , comment_content , comment_time , user_id , board_id
    const supabase = await createClient()
    const { data: {user}, error: sessionError } = await supabase.auth.getUser();
    const userId = user?.id;
    const comment = formData.get('comment') as String;
    const boardID = formData.get('boardID') as String;
    console.log(boardID)

    if(sessionError) {
        console.log('Session Error',sessionError)
        redirect('/error')
    }

    if(!boardID) {
        console.log('Not Found boardID')
        redirect('/error')
    } else {
        const {error : errorPostComment} = await supabase
            .from('comment')
            .insert({comment_content:comment, comment_time:new Date(), user_id:userId, board_id:boardID})

        if(errorPostComment) {
            console.log('Post Comment Error',errorPostComment)
            redirect('/error')
        } else {
            console.log('Post Comment Success')
        }
    }

}