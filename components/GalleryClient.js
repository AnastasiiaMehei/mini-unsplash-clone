"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./IconSprite";
import ColumnToggle from "./ColumnToggle";
import Header from "./Header";
import PhotoCard from "./PhotoCard";
import SearchBar from "./SearchBar";

function TabIcon({ type }) {
  const path = type === "photo"
    ? "M6 17h12l-3.75-5-3 4L9 13l-3 4Zm-3 4V3h18v18H3Zm2-2h14V5H5v14Z"
    : "m22.716 9.085-4.243 4.243-.8-.8-1.176 5.877L1.6 21.715 4.91 6.819l5.879-1.175-.801-.8L14.23.6l8.485 8.485ZM6.581 8.523l-1.942 8.74 4.125-4.126a1.998 1.998 0 0 1 3.346-1.93 1.997 1.997 0 0 1-1.93 3.344l-4.127 4.127 8.74-1.944 1.181-5.906-3.486-3.485-5.907 1.18Zm6.236-3.68 5.656 5.656 1.415-1.414-5.657-5.656-1.414 1.414Z";
  return <svg className="tab-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d={path} /></svg>;
}

function FilterIcon({ type }) {
  const path = type === "orientation"
    ? "M4 4h16v16H4V4Zm2 2v12h12V6H6Zm2 2h3v3H8V8Zm5 0h3v3h-3V8Zm-5 5h3v3H8v-3Zm5 0h3v3h-3v-3Z"
    : "m12 5.83 2.46 2.46a.996.996 0 1 0 1.41-1.41L12.7 3.7a.996.996 0 0 0-1.41 0L8.12 6.88a.996.996 0 1 0 1.41 1.41L12 5.83Zm0 12.34-2.46-2.46a.996.996 0 1 0-1.41 1.41l3.17 3.18c.39.39 1.02.39 1.41 0l3.17-3.17a.996.996 0 1 0-1.41-1.41L12 18.17Z";
  return <svg className="filter-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d={path} /></svg>;
}

function ArrowDownIcon() {
  return <Icon name="arrow-down" className="arrow-down-icon" size={18} />;
}

function FiltersIcon() {
  return <Icon name="filters" className="filters-icon" size={20} />;
}

function CheckmarkIcon() {
  return (
    <svg className="checkmark-icon" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="true">
      <path d="m10 17.4-5-5L6.4 11l3.6 3.6L17.6 7 19 8.4l-9 9Z" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg className="trend-icon" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="true">
      <path d="M3.4 18 2 16.6l7.4-7.45 4 4L18.6 8H16V6h6v6h-2V9.4L13.4 16l-4-4-6 6Z" />
    </svg>
  );
}

const orientationOptions = [
  ["All", "all"],
  ["Landscape", "landscape"],
  ["Portrait", "portrait"],
  ["Square", "square"],
];

function formatHeading(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

export default function GalleryClient({
  initialPhotos,
  initialPage,
  totalPages,
  initialQuery = "",
  initialTag = "",
  initialOrientation = "all",
  initialOrderBy = "relevance",
  initialStyle = "",
  initialError = "",
}) {
  const router = useRouter();
  const [columns, setColumns] = useState(3);
  const [query, setQuery] = useState(initialQuery || initialTag);
  const [activeTab, setActiveTab] = useState(
    initialQuery === "illustrations" ? "illustrations" : "photos",
  );
  const [selectedTopic, setSelectedTopic] = useState(
    initialTag || initialQuery || "Editorial",
  );
  const [photos, setPhotos] = useState(initialPhotos);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pages, setPages] = useState(totalPages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [draftFilters, setDraftFilters] = useState(null);
  const [filters, setFilters] = useState({
    orientation: initialOrientation === "all" ? "All" : initialOrientation === "squarish" ? "Square" : initialOrientation[0].toUpperCase() + initialOrientation.slice(1),
    sort: !initialQuery && !initialTag ? (initialOrderBy === "latest" ? "Newest" : "Popular") : initialOrderBy === "latest" ? "Newest" : "Relevance",
    style: initialStyle,
  });
  const [recentSearches, setRecentSearches] = useState([
    "zoom background office",
    "zoom",
    "online meeting",
    "meeting",
    "business",
  ]);
  const isIllustration = activeTab === "illustrations";
  const isEditorial = !isIllustration && !initialQuery && !initialTag;
  const sortOptions = isEditorial ? ["Popular", "Newest"] : ["Relevance", "Newest"];
  const hasActiveFilters =
    filters.orientation !== "All" || filters.sort !== (isEditorial ? "Popular" : "Relevance") || filters.style !== "";
  const illustrationStyles = [
    ["3D", "https://unsplash-assets.imgix.net/search/3d.jpg?auto=format&fit=crop&q=60", "3d"],
    ["Hand-drawn", "https://unsplash-assets.imgix.net/search/hand_drawn.jpg?auto=format&fit=crop&q=60", "hand drawn"],
    ["Line Art", "https://unsplash-assets.imgix.net/search/line_art.jpg?auto=format&fit=crop&q=60", "line art"],
    ["Flat", "https://unsplash-assets.imgix.net/search/flat.jpg?auto=format&fit=crop&q=60", "flat"],
  ];
  const showingInitialTag = Boolean(initialTag && query === initialTag);
  const searchWrapRef = useRef(null);
  const filterToolbarRef = useRef(null);
  const topicScrollerRef = useRef(null);
  const trendingTopicScrollerRef = useRef(null);
  const loadMoreSentinelRef = useRef(null);
  const loadMoreRef = useRef(false);
  const columnsStorageReadyRef = useRef(false);

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    setError("");
    const nextPage = currentPage + 1;
    if (nextPage > pages || isLoading) {
      setIsLoading(false);
      return;
    }

    const params = new URLSearchParams({
      page: String(nextPage),
      orientation: filters.orientation === "Square" ? "squarish" : filters.orientation.toLowerCase(),
      orderBy: filters.sort === "Newest" ? "latest" : filters.sort === "Popular" ? "popular" : "relevance",
    });
    if (initialTag) params.set("tag", initialTag);
    else params.set("query", query);
    if (isIllustration && filters.style) params.set("style", filters.style);

    try {
      const response = await fetch(`/api/photos?${params.toString()}`);
      if (!response.ok) throw new Error("Unable to load photos");
      const data = await response.json();
      setPhotos(items => {
        const existingIds = new Set(items.map(p => p.id));
        const newPhotos = data.photos.filter(p => !existingIds.has(p.id));
        return [...items, ...newPhotos];
      });
      setCurrentPage(nextPage);
      setPages(data.totalPages);
    } catch (error) {
      if (error instanceof Error) {
        setError("More photos could not be loaded. Please try again.");
      } else {
        setError("Connection error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pages, isLoading, query, filters, initialTag, isIllustration]);

  useEffect(() => {
    if (!columnsStorageReadyRef.current) {
      const savedColumns = window.localStorage.getItem("mosaic-columns");
      columnsStorageReadyRef.current = true;
      if (savedColumns === "3" || savedColumns === "5") {
        setColumns(Number(savedColumns));
      }
      return;
    }
    window.localStorage.setItem("mosaic-columns", String(columns));
  }, [columns]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        searchWrapRef.current &&
        !searchWrapRef.current.contains(event.target)
      )
        setSearchOpen(false);
      if (
        filterToolbarRef.current &&
        !filterToolbarRef.current.contains(event.target)
      )
        setActiveFilter(null);
    }

    function handleEscape(event) {
      if (event.key === "Escape") setSearchOpen(false);
      if (event.key === "Escape") setActiveFilter(null);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setPhotos(initialPhotos);
    setCurrentPage(initialPage);
    setPages(totalPages);
    setError(initialError);
    setQuery(initialQuery || initialTag);
    setFilters({
      orientation: initialOrientation === "all" ? "All" : initialOrientation === "squarish" ? "Square" : initialOrientation[0].toUpperCase() + initialOrientation.slice(1),
      sort: !initialQuery && !initialTag ? (initialOrderBy === "latest" ? "Newest" : "Popular") : initialOrderBy === "latest" ? "Newest" : "Relevance",
      style: initialStyle,
    });
  }, [initialPhotos, initialPage, totalPages, initialQuery, initialTag, initialOrientation, initialOrderBy, initialStyle, initialError]);

  useEffect(() => {
    const sentinel = loadMoreSentinelRef.current;
    if (!sentinel || currentPage >= pages) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && !loadMoreRef.current) {
          loadMoreRef.current = true;
          loadMore().finally(() => {
            loadMoreRef.current = false;
          });
        }
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [currentPage, pages, isLoading, query, filters, initialTag, loadMore]);

  const trendingSearches = [
    "conversation",
    "china",
    "words",
    "learning",
    "education",
  ];
  const trendingTopics = [
    [
      "Fall",
      "https://plus.unsplash.com/premium_photo-1759835659905-7abdfe607673?w=38&dpr=2&h=38&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    ],
    [
      "Textures",
      "https://plus.unsplash.com/premium_photo-1736568429435-87cecd0b2f17?w=38&dpr=2&h=38&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    ],
    [
      "Street Photography",
      "https://images.unsplash.com/photo-1788328916107-4d0e4bf134c8?w=38&dpr=2&h=38&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    ],
    [
      "Experimental",
      "https://plus.unsplash.com/premium_vector-1750769513055-c6db92c08409?w=38&dpr=2&h=38&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    ],
  ];
  const trendingCollections = [
    "Fantasy Worldbuilding",
    "Summer Light",
    "abstract / electric",
    "Cyber Punk & Industrial Vibes",
    "End of Dots",
  ];
  function scrollTopics(distance) {
    topicScrollerRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  }

  function scrollTrendingTopics(distance) {
    trendingTopicScrollerRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  }

  const buildHref = useCallback((value = query, page = 1, nextFilters = filters, preserveTag = false) => {
    const params = new URLSearchParams();
    if (nextFilters.orientation !== "All") params.set("orientation", nextFilters.orientation === "Square" ? "squarish" : nextFilters.orientation.toLowerCase());
    if (nextFilters.sort === "Newest") params.set("orderBy", "latest");
    if (isEditorial && nextFilters.sort === "Popular") params.set("orderBy", "popular");
    if (isIllustration && nextFilters.style) params.set("style", nextFilters.style);
    const path = preserveTag && initialTag
      ? `/tags/${encodeURIComponent(initialTag)}`
      : value
        ? `/s/photos/${encodeURIComponent(value)}`
        : "/";
    return params.toString() ? `${path}?${params.toString()}` : path;
  }, [initialTag, query, filters, isEditorial, isIllustration]);

  function submitSearch(event) {
    event.preventDefault();
    const value = query.trim();
    if (!value) {
      setSearchOpen(true);
      return;
    }
    setSelectedTopic(value || "Editorial");
    setRecentSearches((items) =>
      [value, ...items.filter((item) => item !== value)].slice(0, 5),
    );
    router.push(buildHref(value));
    setSearchOpen(false);
  }

  function clearSearch() {
    setQuery("");
    setSelectedTopic("Editorial");
    router.push(buildHref(""));
  }

  function chooseSearch(value) {
    setQuery(value);
    setSelectedTopic(value);
    setRecentSearches((items) =>
      [value, ...items.filter((item) => item !== value)].slice(0, 5),
    );
    router.push(buildHref(value));
    setSearchOpen(false);
  }

  function chooseTab(tab) {
    const value = tab === "illustrations" ? "illustrations" : "";
    const nextFilters = { ...filters, style: "" };
    setActiveTab(tab);
    setQuery(value);
    setSelectedTopic(value || "Editorial");
    setFilters(nextFilters);
    router.push(buildHref(value, 1, nextFilters));
  }

  function openAllFilters() {
    setDraftFilters({ ...filters });
    setActiveFilter(activeFilter === "all" ? null : "all");
  }

  function chooseFilter(filter, value) {
    const nextFilters = { ...filters, [filter]: value };
    setFilters(nextFilters);
    setActiveFilter(null);
    router.push(buildHref(query, 1, nextFilters, Boolean(initialTag)));
  }

  function chooseModalFilter(filter, value) {
    setDraftFilters((current) => ({ ...(current || filters), [filter]: value }));
  }

  function applyModalFilters() {
    const nextFilters = draftFilters || filters;
    setFilters(nextFilters);
    setDraftFilters(null);
    setActiveFilter(null);
    router.push(buildHref(query, 1, nextFilters, Boolean(initialTag)));
  }

  function closeModalFilters() {
    setDraftFilters(null);
    setActiveFilter(null);
  }

  const resetFilters = useCallback(() => {
    const nextFilters = { orientation: "All", sort: isEditorial ? "Popular" : "Relevance", style: "" };
    setFilters(nextFilters);
    setActiveFilter(null);
    router.push(buildHref(query, 1, nextFilters, Boolean(initialTag)));
  }, [query, router, buildHref, initialTag, isEditorial]);

  const collectionHref = buildHref(initialTag ? "" : query, currentPage, filters, Boolean(initialTag));
  const collectionParams = new URLSearchParams(collectionHref.split("?")[1] || "");
  if (initialTag) collectionParams.set("tag", initialTag);
  if (!initialTag && query) collectionParams.set("q", query);
  collectionParams.set("ids", photos.map((photo) => photo.id).join(","));
  const collectionQuery = collectionParams.toString() ? `?${collectionParams.toString()}` : "";

  return (
    <main className="api-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <Link className="sidebar-logo" href="/" aria-label="Home">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" />
          </svg>
        </Link>
      </aside>
      <div className="api-content">
        <Header>
          <div className="search-wrap" ref={searchWrapRef}>
            <SearchBar query={query} onChange={setQuery} onSubmit={submitSearch} onFocus={() => setSearchOpen(true)} onClear={clearSearch} />
            {searchOpen && (
              <div
                className="search-modal"
                role="dialog"
                aria-label="Search options"
              >
                <div className="search-modal-section">
                  <div className="search-modal-title">
                    Recent Searches{" "}
                    {recentSearches.length > 0 && (
                      <button type="button" onClick={() => setRecentSearches([])}>
                        · Clear
                      </button>
                    )}
                  </div>
                  <div className="search-chips">
                    {recentSearches.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => chooseSearch(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="search-modal-section">
                  <div className="search-modal-title">Trending Searches</div>
                  <div className="search-chips trending">
                    {trendingSearches.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => chooseSearch(item)}
                      >
                        <><TrendIcon />{item}</>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="search-modal-section">
                  <div className="search-modal-title">Trending Topics</div>
                  <div className="trending-topics-strip">
                    <div className="search-chips image-chips" ref={trendingTopicScrollerRef}>
                      {trendingTopics.map(([item, image]) => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => chooseSearch(item)}
                        >
                          <img src={image} alt="" />
                          <span className="topic-chip-label">{item}</span>
                        </button>
                      ))}
                    </div>
                    <button type="button" className="trending-topics-arrow" onClick={() => scrollTrendingTopics(220)} aria-label="Next trending topics"><Icon name="chevron-right" size={18} /></button>
                  </div>
                </div>
                <div className="search-modal-section">
                  <div className="search-modal-title">Trending Collections</div>
                  <div className="search-chips">
                    {trendingCollections.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => chooseSearch(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className="header-filters-button"
            type="button"
            aria-label="Open filters"
            onClick={openAllFilters}
          >
            <FiltersIcon />
          </button>
        </Header>
        <div className="tabs-toolbar">
          <div className="api-tabs">
          <Link
            className={activeTab === "photos" ? "active" : ""}
            href="/"
            onClick={(event) => {
              event.preventDefault();
              chooseTab("photos");
            }}
          >
            <TabIcon type="photo" />
            Photos
          </Link>
          <Link
            className={activeTab === "illustrations" ? "active" : ""}
            href="/?q=illustrations"
            onClick={(event) => {
              event.preventDefault();
              chooseTab("illustrations");
            }}
          >
            <TabIcon type="illustration" />
            Illustrations
          </Link>
          </div>
          <div className="api-toolbar" ref={filterToolbarRef}>
          {hasActiveFilters && (
            <button className="clear-filter" type="button" onClick={resetFilters}>
              Clear
            </button>
          )}
          <div className="compact-filters">
            <div className="filter-menu">
              <button type="button" onClick={() => setActiveFilter(activeFilter === "orientation" ? null : "orientation")}>
                <FilterIcon type="orientation" />
                <span>{filters.orientation}</span>
                <ArrowDownIcon />
              </button>
              {activeFilter === "orientation" && (
                <div className="filter-dropdown">
                  <strong>Orientation</strong>
                  {orientationOptions.map(([label]) => (
                    <button className={filters.orientation === label ? "chosen" : ""} type="button" key={label} onClick={() => chooseFilter("orientation", label)}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="filter-menu">
              <button type="button" onClick={() => setActiveFilter(activeFilter === "sort" ? null : "sort")}>
                <FilterIcon type="sort" />
                <span>Sort by {filters.sort}</span>
                <ArrowDownIcon />
              </button>
              {activeFilter === "sort" && (
                <div className="filter-dropdown sort-dropdown">
                  <strong>Sort by</strong>
                  {sortOptions.map((value) => (
                    <button className={filters.sort === value ? "chosen" : ""} type="button" key={value} onClick={() => chooseFilter("sort", value)}>
                      {value}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            className="all-filters-button"
            type="button"
            onClick={openAllFilters}
          >
            <FiltersIcon /> Filters
          </button>
          {activeFilter === "all" && (
            <div className="filters-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModalFilters(); }}>
              <div className="all-filters-modal" role="dialog" aria-modal="true" aria-label="Filters">
                <div className="filters-modal-header">
                  <strong>Filters</strong>
                  <button type="button" className="filters-modal-close" onClick={closeModalFilters} aria-label="Close filters">×</button>
                </div>
                {isIllustration && (
                  <div className="all-filter-section illustration-style-section">
                    <h3>Style</h3>
                    <div className="illustration-style-grid">
                      {illustrationStyles.map(([label, image, value]) => (
                        <button
                          className={(draftFilters || filters).style === value ? "chosen" : ""}
                          type="button"
                          key={value}
                          onClick={() => chooseModalFilter("style", value)}
                        >
                          <img src={image} alt="" />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="all-filter-section">
                  <h3>Sort by</h3>
                  <div className="filter-choice-grid sort-choice-grid">
                    {sortOptions.map((value) => (
                      <button className={(draftFilters || filters).sort === value ? "chosen" : ""} type="button" key={value} onClick={() => chooseModalFilter("sort", value)}>
                        {(draftFilters || filters).sort === value && <CheckmarkIcon />}
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="all-filter-section">
                  <h3>Orientation</h3>
                  <div className="filter-choice-grid orientation-grid">
                    {orientationOptions.map(([label, value]) => (
                      <button className={(draftFilters || filters).orientation === label ? "chosen" : ""} type="button" key={value} onClick={() => chooseModalFilter("orientation", label)}>
                        {(draftFilters || filters).orientation === label && <CheckmarkIcon />}
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="filters-modal-actions">
                  <button type="button" className="filters-modal-secondary" onClick={resetFilters}>Clear</button>
                  <button type="button" className="filters-modal-primary" onClick={applyModalFilters}>Apply</button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
        <section className="results-section">
          <div className="results-heading">
            <h1>{formatHeading(showingInitialTag ? initialTag : selectedTopic)}</h1>
            <ColumnToggle columns={columns} onChange={setColumns} />
          </div>
          <div className="topic-strip">
            <button
              className="topic-scroll-button"
              onClick={() => scrollTopics(-360)}
              aria-label="Previous topics"
            >
              <Icon name="chevron-left" className="topic-scroll-icon" size={24} />
            </button>
            <div className="topic-row" ref={topicScrollerRef} aria-label="Topics">
              {[
                ...(showingInitialTag ? [initialTag] : []),
                ...[
                    "Nature",
                    "Travel",
                    "Architecture",
                    "People",
                    "Food & Drink",
                    "Interiors",
                    "Landscape",
                    "Street Photography",
                    "Minimalism",
                    "Wildlife",
                    "Technology",
                    "Fashion",
                    "Wellness",
                    "Textures",
                    "Sunset",
                    "Black & White",
                    "Abstract",
                  ],
              ].filter((topic, index, topics) => topics.indexOf(topic) === index).map((topic) => (
                <Link
                  className={selectedTopic === topic ? "selected" : ""}
                  onClick={(event) => {
                    event.preventDefault();
                    setSelectedTopic(topic);
                    setQuery(topic);
                    router.push(initialTag ? `/tags/${encodeURIComponent(topic)}` : buildHref(topic));
                  }}
                  href={initialTag ? `/tags/${encodeURIComponent(topic)}` : buildHref(topic)}
                  key={topic}
                >
                  {topic}
                </Link>
              ))}
            </div>
            <button
              className="topic-scroll-button"
              onClick={() => scrollTopics(360)}
              aria-label="Next topics"
            >
              <Icon name="chevron-right" className="topic-scroll-icon" size={24} />
            </button>
          </div>
          {photos.length ? (
            <div className={`masonry columns-${columns}`}>
              {photos.map((photo) => (
                <div className="masonry-item" key={photo.id}>
                  <PhotoCard photo={photo} href={`/photos/${photo.id}${collectionQuery}`} />
                </div>
              ))}
              {error && <div className="empty-state" role="alert">{error}</div>}
            </div>
          ) : isLoading ? (
            <div className="empty-state">Loading photos...</div>
          ) : error ? (
            <div className="empty-state" role="alert">{error}</div>
          ) : (
            <div className="empty-state">
              <strong>No images found{hasActiveFilters ? " for these filters" : ""}.</strong>
              {hasActiveFilters && <p>Try clearing a filter or choosing a different search.</p>}
              {hasActiveFilters && <button className="empty-state-action" type="button" onClick={resetFilters}>Clear filters</button>}
            </div>
          )}
          {currentPage < pages && (
            <div ref={loadMoreSentinelRef} className="load-more-sentinel" aria-live="polite">
              {isLoading && <div className="photos-loader" role="status" aria-label="Loading more photos"><span /><span /><span /></div>}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
