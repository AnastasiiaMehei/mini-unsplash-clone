import { getPhotos } from '../lib/photos';
import GalleryClient from '../components/GalleryClient';
import { redirect } from 'next/navigation';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || '';
  return { title: query ? `${query} — Mosaic` : 'Mosaic — Find beauty everywhere' };
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const query = params?.q || '';
  const orientation = params?.orientation || 'all';
  const orderBy = params?.orderBy || 'relevance';
  const style = params?.style || '';
  if (query) {
    const searchParams = new URLSearchParams();
    if (orientation !== 'all') searchParams.set('orientation', orientation);
    if (orderBy !== 'relevance') searchParams.set('orderBy', orderBy);
    if (style) searchParams.set('style', style);
    const suffix = searchParams.toString();
    redirect(`/s/photos/${encodeURIComponent(query)}${suffix ? `?${suffix}` : ''}`);
  }
  const { photos, totalPages, error } = await getPhotos({ page, query, orientation, orderBy });
  return <GalleryClient initialPhotos={photos} initialPage={page} totalPages={totalPages} initialQuery={query} initialOrientation={orientation} initialOrderBy={orderBy} initialStyle={style} initialError={error} />;
}
