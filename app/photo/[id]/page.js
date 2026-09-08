import { redirect } from 'next/navigation';

export default async function LegacyPhotoPage({ params, searchParams }) {
  const routeParams = await params;
  const query = await searchParams;
  const suffix = new URLSearchParams(query || {}).toString();
  redirect(`/photos/${encodeURIComponent(routeParams.id)}${suffix ? `?${suffix}` : ''}`);
}
