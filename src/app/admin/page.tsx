import { createClient } from "@/lib/supabase/server"
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = await createClient()

  const { data: users , error: getUsersError } = await supabase
    .from('users')
    .select('*')

  if(getUsersError) {
    console.log('Error',getUsersError)
    redirect('/error')
  }

  const { data: boards , error: getBoardsError } = await supabase
    .from('board')
    .select('*')

  if(getBoardsError) {
    console.log('Error',getBoardsError)
    redirect('/error')
  }

  const { data: comments , error: getCommentsError } = await supabase
    .from('comment')
    .select('*')

  if(getCommentsError) {
    console.log('Error',getCommentsError)
    redirect('/error')
  }

  return (
    <div>
      <div>
        Total User : {users.length}
      </div>
      <div>
        Total board : {boards.length}
      </div>
      <div>
        Total comment : {comments.length}
      </div>
    </div>
  )
}