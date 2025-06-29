'use client';

import { useDispatch } from 'react-redux';

import { ButtonPrimary } from '@common';
import { toggleDoctorPatientAlertReducer } from '@slice';

import type { ClientComponent } from '@types';

const Header: ClientComponent = () => {
  const dispatch = useDispatch();

  const toggleModal = () => dispatch(toggleDoctorPatientAlertReducer());

  return (
    <div className="flex w-full justify-between">
      <span className="screen-title">Alerts</span>
      <div className="w-32">
        <ButtonPrimary
          title="Add Alert"
          name="Add Alert"
          className="h-10 rounded-lg"
          // variant="icon"
          // icon="IoMdAdd"
          onClick={toggleModal}
        />
      </div>
    </div>
  );
};

export default Header;
