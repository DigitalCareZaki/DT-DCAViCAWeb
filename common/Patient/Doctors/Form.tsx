'use client';

import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonPrimary, InputDropdown } from '@common';
import {
  toggleDoctorPatientDoctorReducer,
  pushIntoPatientDoctorListingReducer,
} from '@slice';
import { debounce, getName } from '@init-globals';
import { searchDoctor } from '@actions';
import { addPatientDoctor } from '@service';
import toast from 'react-hot-toast';
import type {
  ClientComponent,
  SearchDoctorProps,
  PatientDoctorsProps,
} from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';

const Form: ClientComponent = () => {
  const params = useSearchParams();

  const [showDropdown, setShowDropdown] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SearchDoctorProps[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<
    SearchDoctorProps | null | undefined
  >(undefined);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const global = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );

  const dispatch = useDispatch();

  const handleHideForm = () => dispatch(toggleDoctorPatientDoctorReducer());
  const pushIntoPatientDoctors = (doctors: PatientDoctorsProps) => {
    dispatch(pushIntoPatientDoctorListingReducer({ doctors }));
  };

  const onChange = debounce(async (event: ChangeEvent<HTMLInputElement>[]) => {
    const value = event[0].target.value;

    try {
      setLoading(true);
      const res = await searchDoctor(value);

      // uncomment this after resolving issue - 404 not found
      setData(res.data);
    } catch (err: any) {
      console.log(err?.message);
    } finally {
      setLoading(false);
    }
  }, 1000);

  const handleSelectedDoctor = (data: SearchDoctorProps) => {
    setSelectedDoctor(data);
    setShowDropdown((prev) => prev + 1);
  };

  const onClear = useCallback(() => {
    setSelectedDoctor(null);
  }, []);

  const onSave = useCallback(async () => {
    try {
      setSaving(true);
      const data = {
        doctorId: selectedDoctor?.user.id,
        patientId: params?.get('patient')?.toString(),
      };

      const res = await addPatientDoctor(btoa(JSON.stringify(data)));

      if (!res?.success) {
        toast.error(res?.message.toString());
        setError(res?.message.toString());
        return;
      }

      pushIntoPatientDoctors({
        user: {
          ...(res.user as any),
        },
        departments: {
          ...(res.departments as any),
        },
        specialities: {
          ...(res.specialities as any),
        },
      });
      handleHideForm();
    } catch (err) {
    } finally {
      setSaving(false);
    }
  }, [selectedDoctor]);

  return (
    <AnimatePresence>
      {global.modals.doctorPatientDoctorForm && (
        <motion.form
          initial={{ right: -1000 }}
          animate={{ right: 0 }}
          transition={{
            type: 'keyframes',
            duration: 0.8,
          }}
          exit={{
            right: -1000,
          }}
          className="absolute right-0 top-24 flex h-[35rem] w-[26rem] flex-col justify-between rounded-lg rounded-r-none border bg-white p-6 shadow-2xl transition"
        >
          <>
            <div className="w-fit">
              <span className="text-sm font-bold uppercase text-gray-600">
                Add Doctor
              </span>
              <div className="h-[3px] w-full rounded-full bg-theme-doctor-primary" />
            </div>
            <div className="mt-10 flex h-full w-full flex-col gap-4">
              <InputDropdown
                loading={loading}
                label="Search Doctor"
                placeholder="Search doctor by name, email or employee id"
                title="Search Doctor"
                onChange={onChange}
                selected={
                  selectedDoctor ? getName(selectedDoctor?.user) : undefined
                }
                overrideShow={showDropdown}
                onClear={onClear}
              >
                <>
                  {data?.map((el) => (
                    <div
                      key={el.user.id}
                      onClick={() => handleSelectedDoctor(el)}
                      className="flex h-12 w-full cursor-pointer items-center rounded-md border bg-white  px-4 text-ssx font-semibold transition duration-150 doctor:text-theme-doctor-primary hover:doctor:bg-theme-doctor-primary hover:doctor:text-white"
                    >
                      <span>{getName(el.user)}</span>
                    </div>
                  ))}
                </>
              </InputDropdown>
              {/* <InputBasic
                label="Speciality"
                placeholder="Enter speciality"
                borderTheme
                labelVariant="tiny"
                title="Enter speciality"
                defaultBorder
              /> */}
            </div>
            <div className="mt-4 flex w-full flex-col items-center gap-2">
              <ButtonPrimary
                name="Save"
                className="h-10 rounded-lg bg-t-color-secondary"
                onClick={onSave}
                type="button"
                disabled={!selectedDoctor?.user.id}
                loading={saving}
              />
              <ButtonPrimary
                name="Close"
                className="h-10 rounded-lg border bg-transparent text-gray-600"
                onClick={handleHideForm}
                type="button"
                outlined
              />
            </div>
          </>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default Form;
