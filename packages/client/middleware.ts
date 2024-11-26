/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

export const middleware = (req: Request) => {
  const url = new URL(req.url);

  if (url.pathname.startsWith('/api/')) {
    url.hostname = process.env.API_URL || 'server';
    url.port = '3000';
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
};
