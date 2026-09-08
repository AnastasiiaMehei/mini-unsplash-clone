import { getPhotos } from '../../../lib/photos';
import GalleryClient from '../../../components/GalleryClient';

export async function generateMetadata({ params }) {
  const routeParams = await params;
  const tag = decodeURIComponent(routeParams.tag || '');
  return { title: `#${tag} — Mosaic` };
}

export default async function TagPage({ params, searchParams }) {
  const routeParams = await params;
  const paramsFromUrl = await searchParams;
  const tag = decodeURIComponent(routeParams.tag || '');
  const page = Number(paramsFromUrl?.page || 1);
  const orientation = paramsFromUrl?.orientation || 'all';
  const orderBy = paramsFromUrl?.orderBy || 'relevance';
  const { photos, totalPages, error } = await getPhotos({ tag, page, orientation, orderBy });
  return <GalleryClient initialPhotos={photos} initialPage={page} totalPages={totalPages} initialTag={tag} initialOrientation={orientation} initialOrderBy={orderBy} initialError={error} />;
}
