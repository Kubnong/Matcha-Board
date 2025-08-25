'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation' //ใช้ตอนอยู่ use server

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  console.log('success login')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string

  const { data: authData , error: authError } = await supabase.auth.signUp({
    email : email,
    password : password,
  })

  if (authError) {
    console.log('Auth error :',authError)
    redirect('/error')
  }

  const userId = authData.user?.id
  if (!userId) {
    console.error('No user ID returned from auth')
    redirect('/error')
  }

  const {error : errorInsert} = await supabase
    .from('users')
    .insert({ user_id:userId, username:username, role:'user'})

  if(errorInsert) {
    console.log('Insert error :',errorInsert)
    redirect('/error')
  }
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // }
  // const { error } = await supabase.auth.signUp(data)

  // if (error) {
  //   redirect('/error')
  // }

  // revalidatePath('/', 'layout')
  // console.log('success singup')
  // redirect('/')
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  console.log('success logout')
  redirect('/')
}