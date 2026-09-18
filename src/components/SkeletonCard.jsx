export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster shimmer-anim" />
      <div className="skeleton-body">
        <div className="skeleton-line short shimmer-anim" />
        <div className="skeleton-line title shimmer-anim" />
        <div className="skeleton-line btn shimmer-anim" />
      </div>
    </div>
  );
}
