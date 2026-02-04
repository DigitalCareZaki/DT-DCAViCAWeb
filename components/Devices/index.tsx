'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Home/Header';
import Table from './Home/Table';
import getDevices from 'service/device/getDevices';
import getAllDevicesForPatient from 'service/device/getAllDevicesForPatient';
import { setDevices } from 'store/devices.slice';
import type { ReduxProps } from 'store/types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
interface DevicesProps {
  patient?: string | null;
}

const Devices = ({ patient }: DevicesProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: ReduxProps) => state.user.user);
  const devices = useSelector((state: ReduxProps) => state.devices.devices);

  useEffect(() => {
    async function fetchDevices() {
      let res;
      if (patient) {
        res = await getAllDevicesForPatient(patient);
        if (res.success) {
          dispatch(setDevices(res.data ?? []));
        }
      } else {
        res = await getDevices();
        if (res.success) {
          dispatch(setDevices(res.data ?? []));
        }
      }
    }
    fetchDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, patient]);

  if (!user?.role) return null;

  return (
    <div className="flex h-screen w-full flex-col gap-4 px-6 pt-4">
      <Header userRole={user.role?.toLowerCase()} data={devices} />
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Table userRole={user.role?.toLowerCase()} patient={patient} />
      </div>
    </div>
  );
};

export default Devices;
