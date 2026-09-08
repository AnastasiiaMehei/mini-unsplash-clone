'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from './IconSprite';
import Image from 'next/image';

function CloseIcon() {
  return <Icon name="close" className="lightbox-icon" />;
}

function ChevronLeftIcon() {
  return <Icon name="chevron-left" className="lightbox-icon" />;
}

function ChevronRightIcon() {
  return <Icon name="chevron-right" className="lightbox-icon" />;
}

export default function PhotoLightbox({ photo, previousId, nextId, collectionQuery = '', closeHref = '/' }) {
  const router = useRouter();
  const previewRef = useRef(null);

  function closeLightbox() {
    router.push(closeHref);
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }
    previewRef.current?.requestFullscreen();
  }

  return (
    <main className="photo-lightbox" onMouseDown={(event) => { if (event.target === event.currentTarget) closeLightbox(); }}>
      <button className="lightbox-close" type="button" onClick={closeLightbox} aria-label="Close photo"><CloseIcon /></button>
      {previousId && <Link className="photo-nav photo-nav-prev" href={`/photos/${previousId}${collectionQuery}`} aria-label="Previous photo"><ChevronLeftIcon /></Link>}
      {nextId && <Link className="photo-nav photo-nav-next" href={`/photos/${nextId}${collectionQuery}`} aria-label="Next photo"><ChevronRightIcon /></Link>}
      <article className="photo-modal">
        <header className="photo-modal-header">
          <div className="photo-author">
            {photo.user?.profile_image?.medium ? <img className="avatar" src={photo.user.profile_image.medium} alt="" width={34} height={34} /> : <div className="avatar">{photo.user?.name?.[0] || "U"}</div>}
            <div><strong>{photo.user?.name || "Unsplash contributor"}</strong><span>@{photo.user?.username || "unsplash"}</span></div>
          </div>
        </header>
        <button
          className="photo-preview"
          ref={previewRef}
          type="button"
          onClick={toggleFullscreen}
          aria-label="Open photo fullscreen"
          title="Open fullscreen"
        >
          <Image src={photo.urls.regular || photo.urls.small} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 768px) 100vw, 80vw" priority />
        </button>
        <section className="photo-details">
          <div className="photo-summary">
            <div className="featured-label">Featured in<strong>{photo.tags?.[0] || 'Photos'}</strong></div>
            <div className="photo-stats">
              <div><h3>Views</h3><strong>{(photo.views ?? 0).toLocaleString('en-US')}</strong></div>
              <div><h3>Downloads</h3><strong>{(photo.downloads ?? 0).toLocaleString('en-US')}</strong></div>
            </div>
          </div>
          <p className="photo-description">{photo.description}</p>
          <div className="photo-detail-list">
            <span><strong>Published on</strong> {photo.created_at ? new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(photo.created_at)) : 'Unsplash'}</span>
            {(photo.exif?.make || photo.exif?.model) && <span><strong>Camera</strong> {[photo.exif.make, photo.exif.model].filter(Boolean).join(', ')}</span>}
            <span><strong>License</strong> Free to use under the <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Unsplash License</a></span>
          </div>
          <div className="tags">{(photo.tags || []).map((tag) => <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>#{tag}</Link>)}</div>
          <div className="photo-meta"><span>{photo.width} × {photo.height}</span><span>By <strong>{photo.user?.name || 'Unsplash contributor'}</strong></span>{photo.location?.name ? <span>{photo.location.name}</span> : null}</div>
        </section>
      </article>
    </main>
  );
}
