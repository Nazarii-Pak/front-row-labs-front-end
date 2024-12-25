import { FC } from 'react';

const loading: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 10 }, (_, index) => (
        <div key={index} className="skeleton h-8 w-full odd:bg-gray-800" />
      ))}
    </div>
  );
};

export default loading;
