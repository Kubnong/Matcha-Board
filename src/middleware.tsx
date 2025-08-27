import { NextRequest, NextResponse} from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
    const supabase = await createClient()

    const {data: { user }, error} = await supabase.auth.getUser()
    if(error || !user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('admin_id', user.id)
    
    if(adminError) {
        console.log('query Error',adminError)
        return NextResponse.redirect(new URL('/error', request.url))
    }

    if (!adminData || adminData.length === 0) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'] // match /admin และทุก path ต่อท้าย
}