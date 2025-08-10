import { useMemo } from "react";
import { Icon } from "~/ui/Icon";

export function RatingStars({ rating }: { rating: number }) {
  const renderStars = useMemo(() => {
    const stars = Array.from({ length: 5 }, (_, i) => (
      <span key={i} aria-hidden="true">
        {i < rating ? (
          <Icon name="starFull" className="size-6 text-amber-300" />
        ) : (
          <Icon name="star" className="size-6 text-amber-300" />
        )}
      </span>
    ));
    return (
      <div className="flex justify-center gap-2">
        <div className="flex items-center justify-center gap-0.5">{stars}</div>
      </div>
    );
  }, [rating]);

  return renderStars;
}
