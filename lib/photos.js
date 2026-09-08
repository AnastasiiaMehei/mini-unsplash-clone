import { unsplashRequest } from './unsplash';

export const fallbackPhotos = [
  { id: 'p-01', width: 4000, height: 6000, color: '#d8d0c2', alt: 'Sunlit corridor in a forest', description: 'Light finding its way through a quiet forest.', user: { name: 'Juli Kosolapova', username: 'juli_kosolapova' }, urls: { raw: 'https://images.unsplash.com/photo-1448375240586-882707db888b', full: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=85', regular: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80' }, tags: ['nature', 'forest', 'green'] },
  { id: 'p-02', width: 5000, height: 3333, color: '#9ba8ad', alt: 'Ocean wave', description: 'The blue hour, held still for a moment.', user: { name: 'Annie Spratt', username: 'anniespratt' }, urls: { raw: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', full: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85', regular: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80' }, tags: ['ocean', 'blue', 'travel'] },
  { id: 'p-03', width: 4000, height: 6000, color: '#c7b6a1', alt: 'Old city architecture', description: 'A warm afternoon in the old quarter.', user: { name: 'Tom Podmore', username: 'tompodmore' }, urls: { raw: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df', full: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1800&q=85', regular: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80' }, tags: ['city', 'architecture', 'urban'] },
  { id: 'p-04', width: 6000, height: 4000, color: '#aebfc0', alt: 'Mountain landscape', description: 'A view that makes the day feel wider.', user: { name: 'Simon Berger', username: '8moments' }, urls: { raw: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b', full: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85', regular: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80' }, tags: ['mountains', 'landscape', 'adventure'] },
  { id: 'p-05', width: 4000, height: 6000, color: '#dfc6ad', alt: 'Ceramic vases', description: 'Small objects, made slowly and well.', user: { name: 'Jared Rice', username: 'jaredrice' }, urls: { raw: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85', full: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1800&q=85', regular: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=80' }, tags: ['interior', 'design', 'ceramic'] },
  { id: 'p-06', width: 6000, height: 4000, color: '#b7c3c6', alt: 'Birds over water', description: 'A soft morning over the wetlands.', user: { name: 'Joshua Earle', username: 'joshuaearle' }, urls: { raw: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f', full: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1800&q=85', regular: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=900&q=80' }, tags: ['wildlife', 'water', 'birds'] },
  { id: 'p-07', width: 5000, height: 3333, color: '#c8b9a8', alt: 'Morning coffee', description: 'The ritual before the rush.', user: { name: 'Nathan Dumlao', username: 'nate_dumlao' }, urls: { raw: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', full: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=85', regular: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80' }, tags: ['coffee', 'morning', 'lifestyle'] },
  { id: 'p-08', width: 4000, height: 6000, color: '#d4b1a6', alt: 'Valley in pink light', description: 'The last light over a quiet valley.', user: { name: 'Luca Bravo', username: 'lucabravo' }, urls: { raw: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', full: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85', regular: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' }, tags: ['sunset', 'travel', 'landscape'] },
  { id: 'p-09', width: 6000, height: 4000, color: '#a7b6b1', alt: 'Rocks on the shore', description: 'Texture, tide, and a little patience.', user: { name: 'Maksym Mazur', username: 'maksymmazur' }, urls: { raw: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b', full: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1800&q=85', regular: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80' }, tags: ['texture', 'sea', 'nature'] },
  { id: 'p-10', width: 4000, height: 6000, color: '#d2c6b4', alt: 'Bright room', description: 'A room with a view and room to think.', user: { name: 'Spacejoy', username: 'spacejoy' }, urls: { raw: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', full: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85', regular: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80' }, tags: ['interior', 'home', 'minimal'] },
  { id: 'p-11', width: 6000, height: 4000, color: '#b3c2c8', alt: 'Road between trees', description: 'Take the long way home.', user: { name: 'Kevin Young', username: 'kevin_young' }, urls: { raw: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8', full: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1800&q=85', regular: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80' }, tags: ['road', 'forest', 'journey'] },
  { id: 'p-12', width: 4000, height: 6000, color: '#c0b4a4', alt: 'Palm tree shadows', description: 'Graphic shadows on a warm afternoon.', user: { name: 'Erol Ahmed', username: 'erol' }, urls: { raw: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57', full: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1800&q=85', regular: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80' }, tags: ['palm', 'shadow', 'summer'] },
];

function normalizePhoto(photo) {
  return {
    ...photo,
    likes: photo.likes ?? 0,
    created_at: photo.created_at || null,
    alt: photo.alt || photo.alt_description || photo.description || 'Unsplash photo',
    description: photo.description || photo.alt_description || 'Untitled photo',
    tags: (photo.tags || []).map((tag) => typeof tag === 'string' ? tag : tag.title).filter(Boolean),
  };
}

function matchesOrientation(photo, orientation) {
  if (orientation === 'all' || !photo.width || !photo.height) return true;
  if (orientation === 'landscape') return photo.width > photo.height;
  if (orientation === 'portrait') return photo.height > photo.width;
  if (orientation === 'square' || orientation === 'squarish') {
    return Math.abs(photo.width - photo.height) / Math.max(photo.width, photo.height) < 0.1;
  }
  return true;
}

export async function getPhotos({ page = 1, query = '', tag = '', orientation = 'all', orderBy = 'relevance', style = '' } = {}) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  const apiOrientation = orientation === 'square' ? 'squarish' : orientation;
  if (key) {
    const apiQuery = query && style ? `${query} ${style}` : query || tag;
    const searchParams = { query: apiQuery, page, per_page: 12 };
    if (apiOrientation !== 'all') searchParams.orientation = apiOrientation;
    if (query || tag) searchParams.order_by = orderBy === 'latest' ? 'latest' : 'relevant';
    let response;
    try {
      response = query || tag
        ? await unsplashRequest('/search/photos', searchParams)
        : await unsplashRequest('/photos', {
          page,
          per_page: 12,
          order_by: orderBy === 'latest' ? 'latest' : 'popular',
          orientation: apiOrientation !== 'all' ? apiOrientation : undefined,
          color: undefined,
        });
    } catch {
      return { photos: [], totalPages: 1, error: 'Unable to reach Unsplash.', status: 502 };
    }
    if (response.ok) {
      const payload = await response.json();
      const photos = (payload.results || payload).map(normalizePhoto);
      const totalPages = payload.total
        ? Math.max(1, Math.ceil(payload.total / 12))
        : photos.length === 12
          ? page + 1
          : page;
      return { photos, totalPages };
    }
    if (response.status === 403 || response.status === 429) {
      return { photos: [], totalPages: 1, error: response.status === 429 ? 'Unsplash rate limit reached.' : 'Unsplash access was denied.', status: response.status };
    }
    if (response.status === 401) {
      return { photos: [], totalPages: 1, error: 'Unsplash authentication failed.', status: 401 };
    }
    return { photos: [], totalPages: 1, error: `Unsplash request failed (${response.status}).`, status: response.status };
  }
  const term = (query || tag).toLowerCase();
  const termFiltered = term
    ? fallbackPhotos.filter((photo) => [photo.alt, photo.description, ...photo.tags].join(' ').toLowerCase().includes(term))
    : fallbackPhotos;
  const filtered = orientation === 'landscape'
    ? termFiltered.filter((photo) => photo.width > photo.height)
    : orientation === 'portrait'
      ? termFiltered.filter((photo) => photo.height > photo.width)
      : orientation === 'squarish' || orientation === 'square'
        ? termFiltered.filter((photo) => Math.abs(photo.width - photo.height) / Math.max(photo.width, photo.height) < 0.1)
        : termFiltered;
  const photos = filtered.map(normalizePhoto);
  return { photos, totalPages: Math.max(1, Math.ceil(photos.length / 12)) };
}

export async function getPhotoById(id) {
  const fallback = fallbackPhotos.find((photo) => photo.id === id);
  if (fallback) return normalizePhoto(fallback);
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return null;
  const response = await unsplashRequest(`/photos/${encodeURIComponent(id)}`);
  return response.ok ? normalizePhoto(await response.json()) : null;
}
