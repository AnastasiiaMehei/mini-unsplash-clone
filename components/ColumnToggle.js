export default function ColumnToggle({ columns, onChange }) {
  return (
    <div className="view-switcher" aria-label="Column count">
      <span>View</span>
      {[3, 5].map((value) => (
        <button className={columns === value ? "active" : ""} key={value} onClick={() => onChange(value)} aria-label={`${value} columns`}>
          {value}
        </button>
      ))}
    </div>
  );
}
