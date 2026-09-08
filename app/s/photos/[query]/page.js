import { getPhotos } from '../../../../lib/photos';
import GalleryClient from '../../../../components/GalleryClient';

export async function generateMetadata({ params }) {
  const routeParams = await params;
  const query = decodeURIComponent(routeParams.query || '');
  return { title: `${query} photos — Mosaic` };
}

export default async function SearchPage({ params, searchParams }) {
  const routeParams = await params;
  const paramsFromUrl = await searchParams;
  const query = decodeURIComponent(routeParams.query || '');
  const page = Number(paramsFromUrl?.page || 1);
  const orientation = paramsFromUrl?.orientation || 'all';
  const orderBy = paramsFromUrl?.orderBy || 'relevance';
  const style = paramsFromUrl?.style || '';
  const { photos, totalPages, error } = await getPhotos({ query, page, orientation, orderBy, style });
  return <GalleryClient initialPhotos={photos} initialPage={page} totalPages={totalPages} initialQuery={query} initialOrientation={orientation} initialOrderBy={orderBy} initialStyle={style} initialError={error} />;
}
