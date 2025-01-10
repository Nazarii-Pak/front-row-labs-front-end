'use client';

import { FC, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteReviewApi } from '@/services/reviews';

type DeleteReviewButtonProps = {
  id: string;
};

const DeleteReviewButton: FC<DeleteReviewButtonProps> = ({ id }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    if (ref.current) {
      ref.current.showModal();
    }
  };

  const handleCloseModal = () => {
    if (ref.current) {
      ref.current.close();
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteReviewApi(id);
      router.push('/');
      handleCloseModal();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-outline w-fit" onClick={handleOpenModal}>
        Delete
      </button>
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure you want to delete this review?</h3>

          <div className="modal-action">
            <button disabled={isLoading} className="btn btn-active" onClick={handleCloseModal}>
              Cancel
            </button>
            <button disabled={isLoading} className="btn btn-outline" onClick={handleDelete}>
              Delete
            </button>
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </dialog>
    </>
  );
};

export default DeleteReviewButton;
