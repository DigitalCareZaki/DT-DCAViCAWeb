'use client';

import { ReactNode } from 'react';

import { useDispatch } from 'react-redux';
import { toggleAddMeasurementFormReducer } from '@slice';

import { ButtonPrimary, ExportButton } from '@common';

import type { ClientComponentProps, PatientMeasurementProps } from '@types';

const LegendItem = ({
  title,
  twRagColor,
}: {
  title: string;
  twRagColor: string;
}): JSX.Element => {
  return (
    <>
      <div className="flex min-w-8 items-center gap-2">
        <div className={`h-4 w-4 rounded-sm ${twRagColor}`} />
        <span className="text-xs font-semibold leading-none text-gray-500">
          {title}
        </span>
      </div>
    </>
  );
};

const RenderLegend = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <div className="flex items-center gap-4 rounded-md bg-white p-3">
        {children}
      </div>
    </>
  );
};

const Header: ClientComponentProps<{
  hideActions?: boolean;
  data: PatientMeasurementProps[];
}> = ({ hideActions, data }) => {
  const dispatch = useDispatch();

  const handleAddMeasurementClick = () => {
    dispatch(toggleAddMeasurementFormReducer());
  };

  return (
    <>
      <div className="flex w-full justify-between">
        <span className="screen-title">{!hideActions && 'Measurements'}</span>
        <div className="flex w-fit flex-col gap-4">
          <RenderLegend>
            <LegendItem title="High" twRagColor="bg-rag-red" />
            <LegendItem title="Normal" twRagColor="bg-rag-green" />
            <LegendItem title="Low" twRagColor="bg-rag-amber" />
            <LegendItem title="Alert Not Set" twRagColor="bg-rag-no-reading" />
          </RenderLegend>
          <div className="flex items-center justify-end gap-4">
            {!hideActions && (
              <div className={'w-40'}>
                <ButtonPrimary
                  title="Add Measurement"
                  name="Add Measurement"
                  className="h-12 w-fit rounded-lg p-4"
                  // variant="icon"
                  // icon="IoMdAdd"
                  onClick={handleAddMeasurementClick}
                />
              </div>
            )}

            {Array.isArray(data) && data.length > 0 &&
              <ExportButton
                // data={data.map((el) => ({
                //   ...el,
                //   patient: `${el.patient.user.first_name} ${el.patient.user.last_name}`,
                //   doctor: `${el.doctor?.user?.first_name ?? 'N/A'} ${el.doctor?.user.last_name}`,
                //   nurse: `${el.nurse?.user?.first_name ?? 'N/A'} ${el.nurse?.user.last_name}`,
                //   created_at: new Date(el.created_at).toLocaleTimeString(),
                // }))}

                data={data.map((el) => ({
                  ...el,
                  patient: `N/A`,
                  doctor: `N/A`,
                  nurse: `N/A`,
                  created_at: new Date(el.created_at).toLocaleTimeString(),
                }))}

                headers={
                  [
                    {
                      label: 'Title',
                      key: 'title',
                    },
                    {
                      label: 'Status',
                      key: 'status',
                    },
                    {
                      label: 'Mode',
                      key: 'mode',
                    },
                    {
                      label: 'Type',
                      key: 'type',
                    },
                    {
                      label: 'Values',
                      key: 'values',
                    },
                    {
                      label: 'Unit',
                      key: 'unit',
                    },
                    {
                      label: 'Patient',
                      key: 'patient',
                    },
                    {
                      label: 'Doctor',
                      key: 'doctor',
                    },
                    {
                      label: 'Nurse',
                      key: 'nurse',
                    },
                  ]}
                filename="RAG Data"
              />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
