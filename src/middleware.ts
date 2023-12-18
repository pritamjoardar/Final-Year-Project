import {NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest, nextResponse: NextResponse){
    const path = request.nextUrl.pathname ;
    const isPublic = path ==='/login' || path ==='/signup' ;
    const token = request.cookies.get('notes')?.value || '';
    if(isPublic && token){
        return NextResponse.redirect(new URL('/',request.nextUrl));
    }
    if(!isPublic && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl));
    }

}
// for Matchinf path
export const config = {
    matcher:[
        '/',
        '/profile',
        '/login',
        '/signup'
    ]
}