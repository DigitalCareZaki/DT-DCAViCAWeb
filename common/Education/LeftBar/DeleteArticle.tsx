'use client';

import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { MdDelete } from '@react-icons/all-files/md/MdDelete';
import { showModalReducer } from '@slice';
import { deleteArticle } from '@service';

import type { ClientComponentProps } from '@types';
import { CircleSpinner } from 'react-spinners-kit';

const DeleteArticle: ClientComponentProps<{
  id: string;
  selfContent: boolean;
}> = ({ id, selfContent }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await deleteArticle(id);

      if (!res.success) throw new Error('Something went wrong');

      dispatch(
        showModalReducer({
          type: 'SUCCESS',
          message: 'Post deleted successfully',
          show: true,
        })
      );
    } catch (err) {
      dispatch(
        showModalReducer({
          type: 'ERROR',
          message: 'Cannot delete this post right now',
          show: true,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  if (!selfContent) return <></>;

  return (
    <div>
      {loading ? (
        <CircleSpinner size={20} color="#000000" />
      ) : (
        <MdDelete onClick={handleDelete} size={20} />
      )}
    </div>
  );
};

export default DeleteArticle;
