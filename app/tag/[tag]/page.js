import { redirect } from 'next/navigation';

export default async function LegacyTagPage({ params, searchParams }) {
  const routeParams = await params;
  const query = await searchParams;
  const suffix = new URLSearchParams(query || {}).toString();
  redirect(`/tags/${encodeURIComponent(routeParams.tag || '')}${suffix ? `?${suffix}` : ''}`);
}
