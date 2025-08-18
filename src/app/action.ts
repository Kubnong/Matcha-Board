'use server'

import { createClient } from "@/lib/supabase/server"
import { UUID } from "crypto"
import { redirect } from "next/navigation"

export async function deleteBoard(formData: FormData) {
    const supabase = await createClient()
    const boardID = formData.get('boardId') as UUID
    const { data : deleteData, error : deleteError } = await supabase
        .from('board')
        .delete()
        .eq('board_id', boardID)
    
    if(deleteError) {
        console.log('Delete Error',deleteError)
        redirect('/error')
    } else {
        console.log('Delete',deleteData)
    }
}