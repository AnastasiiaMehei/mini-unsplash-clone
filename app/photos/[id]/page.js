import { notFound } from 'next/navigation';
import { getPhotoById, getPhotos } from '../../../lib/photos';
import PhotoLightbox from '../../../components/PhotoLightbox';

export async function generateMetadata({ params }) {
  const routeParams = await params;
  const photo = await getPhotoById(routeParams.id);
  return { title: photo?.alt ? `${photo.alt} — Mosaic` : 'Photo — Mosaic' };
}

export default async function PhotoPage({ params, searchParams }) {
  const routeParams = await params;
  const queryParams = await searchParams;
  const photo = await getPhotoById(routeParams.id);
  if (!photo) notFound();
  const page = Number(queryParams?.page || 1);
  const query = queryParams?.q || '';
  const tag = queryParams?.tag || '';
  const orientation = queryParams?.orientation || 'all';
  const orderBy = queryParams?.orderBy || 'relevance';
  const style = queryParams?.style || '';
  const collectionIds = queryParams?.ids ? String(queryParams.ids).split(',').filter(Boolean) : [];
  let navigationIds = collectionIds;
  if (!navigationIds.length) {
    const { photos } = await getPhotos({ page, query, tag, orientation, orderBy, style });
    navigationIds = photos.map((item) => item.id);
  }
  const photoIndex = navigationIds.indexOf(photo.id);
  const previousId = photoIndex > 0 ? navigationIds[photoIndex - 1] : null;
  const nextId = photoIndex >= 0 && photoIndex < navigationIds.length - 1 ? navigationIds[photoIndex + 1] : null;
  const collectionParams = new URLSearchParams();
  if (query) collectionParams.set('q', query);
  if (tag) collectionParams.set('tag', tag);
  if (page > 1) collectionParams.set('page', String(page));
  if (orientation !== 'all') collectionParams.set('orientation', orientation);
  if (orderBy !== 'relevance') collectionParams.set('orderBy', orderBy);
  if (style) collectionParams.set('style', style);
  if (collectionIds.length) collectionParams.set('ids', collectionIds.join(','));
  const collectionQuery = collectionParams.toString() ? `?${collectionParams.toString()}` : '';
  const closeParams = new URLSearchParams(collectionParams);
  closeParams.delete('tag');
  closeParams.delete('ids');
  const closeQuery = closeParams.toString() ? `?${closeParams.toString()}` : '';
  const closeHref = tag
    ? `/tags/${encodeURIComponent(tag)}${closeQuery}`
    : query
      ? `/s/photos/${encodeURIComponent(query)}${collectionQuery}`
      : `/${collectionQuery}`;
  return <PhotoLightbox photo={photo} previousId={previousId} nextId={nextId} collectionQuery={collectionQuery} closeHref={closeHref} />;
}
