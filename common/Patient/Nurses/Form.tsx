'use client';

import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import {
  ButtonPrimary, InputDropdown, DropdownSecondary,
  ClientGenerator
} from '@common';
import {
  toggleDoctorPatientNurseReducer,
  pushIntoPatientNurseListingReducer,
} from '@slice';
import { debounce, getName } from '@init-globals';
import { searchNurse } from '@actions';
import { addPatientNurse } from '@service';
import { selectSpecitlity } from '@service';
import { selectNurse } from '@service';
import Speciality from './Speciality';
import Doctor from './Doctor';
import type {
  ClientComponent,
  SearchNursesProps,
  PatientNursesProps,
} from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';

const Form: ClientComponent = () => {
  const params = useSearchParams();

  const [showDropdown, setShowDropdown] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<{ name: string; id: string } | null>(null);
  const [selectedNurse, setSelectedNurse] = useState<{ name: string; id: string } | null>(null);

  const [data, setData] = useState<SearchNursesProps[]>([]);
  // const [selectedNurse, setSelectedNurse] = useState<
  //   SearchNursesProps | null | undefined
  // >(undefined);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const global = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );

  const dispatch = useDispatch();

  const handleHideForm = () => dispatch(toggleDoctorPatientNurseReducer());
  const pushIntoPatientNurses = (nurse: PatientNursesProps) =>
    dispatch(pushIntoPatientNurseListingReducer({ nurse }));


  useEffect(() => {
    const fetchSpecialities = async () => {
      const res = await selectSpecitlity();
      if (res.success) {
        const mapped = res.data.map((item: any) => ({
          name: item.title,
          value: item.id,
        }));
        setSpecialities(mapped);
      }
      setLoading(false);
    };

    fetchSpecialities();
  }, []);


  const handleSpecialitySelect = async (name: string, value: string) => {
    setSelectedSpeciality({ name, id: value });
    setSelectedNurse(null); // reset doctor

    const res = await selectNurse(value);

    if (res.success) {
      const mapped = res?.data?.map((item: any) => ({
        name: `${item?.user?.first_name} ${item?.user?.last_name}`,
        value: item?.user?.id,
      }));
      setDoctors(mapped);
    }
  };

  const handleDoctorSelect = (name: string, value: string) => {
    setSelectedNurse({ name, id: value });

    // 👇 Use this doctor ID for further actions

  };

  const onChange = debounce(async (event: ChangeEvent<HTMLInputElement>[]) => {
    const value = event[0].target.value;

    try {
      setLoading(true);
      const res = await searchNurse(value);

      setData(res.data);
    } catch (err: any) {
      console.log(err?.message);
      //
    } finally {
      setLoading(false);
    }
  }, 1000);

  // const handleSelectedNurse = (data: SearchNursesProps) => {
  //   setSelectedNurse(data);
  //   setShowDropdown((prev) => prev + 1);
  // };

  // const onClear = useCallback(() => {
  //   setSelectedNurse(null);
  // }, []);

  const onSave = useCallback(async () => {
    try {
      setSaving(true);
      const data = {
        patient_id: params?.get('patient')?.toString(),
        nurse_id: selectedNurse?.id,
      };
      const res = await addPatientNurse(btoa(JSON.stringify(data)));

      if (!res?.success) {
        setError(res?.message.toString());
        return;
      }

      pushIntoPatientNurses({
        user: {
          ...(res.user as any),
        },
        departments: [...((res.departments as any) ?? [])],
      });
      handleHideForm();
    } catch (err) {
    } finally {
      setSaving(false);
    }
  }, [params, selectedNurse?.id]);

  return (
    <AnimatePresence>
      {global.modals.doctorPatientNurseForm && (
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
          className="absolute right-0 top-24 flex h-[35rem] w-[26rem] flex-col justify-between overflow-y-scroll rounded-lg rounded-r-none border bg-white p-6 shadow-2xl transition"
        >
          <>
            <div className="w-fit">
              <span className="text-sm font-bold uppercase text-gray-600">
                Add Nurse
              </span>
              <div className="h-[3px] w-full rounded-full bg-theme-doctor-primary" />
            </div>
            <div className="relative mt-10 flex h-full w-full flex-col gap-4">
              <DropdownSecondary
                title="Select Speciality"
                label="Speciality"
                borderTheme
                inputWrapperClassName="bg-background"
                icon="MdPin"
                selected={selectedSpeciality?.name}
              >
                {!loading && (
                  <ClientGenerator data={specialities} handleSelect={handleSpecialitySelect}>
                    <Speciality />
                  </ClientGenerator>
                )}
              </DropdownSecondary>

              {selectedSpeciality && (
                <DropdownSecondary
                  title="Select Nurse"
                  label="Nurse"
                  borderTheme
                  inputWrapperClassName="bg-background"
                  icon="MdPin"
                  selected={selectedNurse?.name}
                >
                  <ClientGenerator data={doctors} handleSelect={handleDoctorSelect}>
                    <Doctor />
                  </ClientGenerator>
                </DropdownSecondary>
              )}

              {/* <InputDropdown
                loading={loading}
                label="Search Nurse"
                placeholder="Search nurse by name, email, employee id or npi number"
                title="Search Nurse"
                onChange={onChange}
                selected={
                  selectedNurse ? getName(selectedNurse?.user) : undefined
                }
                overrideShow={showDropdown}
                onClear={onClear}
              >
                <>
                  {data?.map((el) => (
                    <div
                      key={el.user.id}
                      onClick={() => handleSelectedNurse(el)}
                      className="flex h-12 w-full cursor-pointer items-center rounded-md border bg-white  px-4 text-ssx font-semibold transition duration-150 doctor:text-theme-doctor-primary hover:doctor:bg-theme-doctor-primary hover:doctor:text-white"
                    >
                      <span>{getName(el.user)}</span>
                    </div>
                  ))}
                </>
              </InputDropdown> */}
            </div>
            <div className="mt-4 flex w-full flex-col items-center gap-2">
              <span className="w-full text-start text-ssx font-semibold text-red-500">
                {error}
              </span>
              <ButtonPrimary
                name="Save"
                className="h-10 rounded-lg bg-t-color-secondary"
                onClick={onSave}
                type="button"
                disabled={!selectedNurse?.id}
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
