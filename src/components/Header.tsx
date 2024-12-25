import Link from 'next/link';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <div className="bg-gray-700 font-bold text-white p-4">
      <Link href="/">Front Row Labs</Link>
    </div>
  );
};

export default Header;
