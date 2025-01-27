'use client';

import { useDispatch } from 'react-redux';
import { toggleDoctorEducationReducer } from '@slice';

import { InputBasic, ButtonPrimary } from '@common';

import type { ClientComponent } from '@types';

const EducationHeader: ClientComponent = () => {
  const dispatch = useDispatch();

  const handleAddContentClick = () => {
    dispatch(toggleDoctorEducationReducer());
  };

  return (
    <div className="flex w-full justify-between">
      <span className="screen-title">Education</span>
      <div className="flex w-fit items-center gap-4">
        <div className="flex w-60">
          <InputBasic placeholder="Search" icon="IoSearch" />
        </div>
        <div className="w-36">
          <ButtonPrimary
            title="Add content"
            name="Add Content"
            className="h-10 rounded-lg"
            variant="icon"
            icon="IoMdAdd"
            onClick={handleAddContentClick}
          />
        </div>
      </div>
    </div>
  );
};

export default EducationHeader;
