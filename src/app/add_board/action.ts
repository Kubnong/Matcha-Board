'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { timeStamp } from 'node:console'

export async function post(formData: FormData) {
    const supabase = await createClient()
// content time_stamp tag_id user_id
    const { data: {session} } = await supabase.auth.getSession();

    const content = formData.get('content') as String
    const tag = formData.get('tag') as String
    // const timeStamp = Date.now().toString() 
    const userId = session?.user?.id;

    const { data, error } = await supabase
        .from('typeboard')
        .select('tag_id')
        .eq('tag_name',tag)

    if(error) {
        console.log('fetch uuid from type board error',error)
        redirect('/error')
    } else {
        const {error : errorPost} = await supabase
            .from('board')
            .insert({content:content, time_stamp:new Date(), tag_id: data[0].tag_id, user_id:userId})

            if(errorPost) {
                console.log('Post error',errorPost)
                redirect('/error')
            } else {
                console.log('Post Success')
                redirect('/')
            }
    }
}