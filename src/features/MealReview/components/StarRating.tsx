import { FC } from 'react';
import StarIcon from '@/assets/icons/StarIcon';

type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
  withText?: boolean;
};

const StarRating: FC<StarRatingProps> = ({ value, onChange, withText = false }) => {
  return (
    <div className="flex gap-1 items-center ">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="focus:outline-none hover:scale-125 transition-all cursor-pointer"
        >
          <StarIcon isActive={star <= value} />
        </button>
      ))}
      {withText && <span className="text-[12px] text-neutral-500-base">{value} / 5</span>}
    </div>
  );
};

export default StarRating;
