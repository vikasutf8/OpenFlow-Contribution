import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getOrcreateDB from './models/server/dbSetup';
import getOrCreateStorage from './models/server/storageConfig';

export async function middleware(request: NextRequest) {
  // Perform database and storage setup asynchronously
  await Promise.all([getOrcreateDB(), getOrCreateStorage()]);
  
  // Proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/image|_next/static|favicon.ico).*)",
 
  ]
};
