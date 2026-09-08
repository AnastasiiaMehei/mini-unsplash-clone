import { getPhotos } from '../../../lib/photos';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = await getPhotos({
      page: Number(searchParams.get('page') || 1),
      query: searchParams.get('query') || '',
      tag: searchParams.get('tag') || '',
      orientation: searchParams.get('orientation') || 'all',
      orderBy: searchParams.get('orderBy') || 'relevance',
      style: searchParams.get('style') || '',
    });
    if (data.error) return Response.json({ error: data.error }, { status: data.status || 502 });
    return Response.json(data);
  } catch {
    return Response.json({ error: 'Unable to reach the photo service.' }, { status: 502 });
  }
}
