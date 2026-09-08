const UNSPLASH_API_BASE_URL = 'https://api.unsplash.com';

export async function unsplashRequest(path, searchParams = {}) {
  const url = new URL(path, UNSPLASH_API_BASE_URL);
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value);
  });

  return fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      'Accept-Version': 'v1',
    },
    next: { revalidate: 300 },
  });
}
