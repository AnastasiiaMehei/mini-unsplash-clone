import { Icon } from "./IconSprite";

export default function SearchBar({ query, onChange, onSubmit, onFocus, onClear }) {
  return (
    <form className="api-search" onSubmit={onSubmit}>
      <button className="search-trigger" type="button" onClick={onFocus} aria-label="Open search options"><Icon name="search" className="search-icon" size={20} /></button>
      <input value={query} onFocus={onFocus} onChange={(event) => onChange(event.target.value)} placeholder="Search photos and illustrations" aria-label="Search photos and illustrations" />
      {query && <button className="search-clear" type="button" onClick={onClear} aria-label="Clear search"><Icon name="close" className="close-icon" /></button>}
    </form>
  );
}
