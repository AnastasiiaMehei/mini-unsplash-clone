import Link from "next/link";
import Image from "next/image";

export default function PhotoCard({ photo, href }) {
  // Create a placeholder with photo's actual color for better visual feedback
  const placeholderColor = photo.color || "#e0e0e0";
  
  return (
    <div className="photo-card-shell">
      <Link className="photo-card" href={href} aria-label={`Open photo: ${photo.alt}`}>
        <div style={{ backgroundColor: placeholderColor, position: "relative", width: "100%", paddingBottom: `${(photo.height / photo.width) * 100}%` }}>
          <Image
            className="photo-card-image"
            src={photo.urls.small || photo.urls.regular}
            alt={photo.alt} 
            fill
            sizes="(max-width: 375px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: "cover" }}
            placeholder="empty"
          />
        </div>
        <span className="photo-card-overlay">
          <strong>{photo.user?.name || "Unsplash contributor"}</strong>
          <span>{photo.likes ?? 0} likes</span>
        </span>
      </Link>
    </div>
  );
}
