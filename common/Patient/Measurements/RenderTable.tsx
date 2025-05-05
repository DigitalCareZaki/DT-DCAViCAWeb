'use client';

import { useSelector } from 'react-redux';

import type { ClientComponent, ClientComponentProps, PatientMeasurementProps, UserProps } from '@types';
import type { ReduxProps, StorePatientState } from '@store-types';

import { getName } from '@init-globals';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { updateMeasurementStatus } from '@service';
import { showModalReducer } from '@slice';
import { FaStar } from '@react-icons/all-files/fa/FaStar';

const RenderStatus = {
  HIGH: (
    <div title="High" className="h-[10px] w-[10px] rounded-sm bg-rag-red" />
  ),
  LOW: (
    <div title="Low" className="h-[10px] w-[10px] rounded-sm bg-rag-amber" />
  ),
  NORMAL: (
    <div title="Normal" className="h-[10px] w-[10px] rounded-sm bg-rag-green" />
  ),
};

const RenderTable: ClientComponentProps<{ user: UserProps }> = ({ user }) => {

  const { patientMeasurementListing, pagination } = useSelector<ReduxProps, StorePatientState>(
    (state) => state.patients
  );

  const [data, setData] = useState<any>([]);
  const [selectedMeasurement, setSelectedMeasurement] = useState<any>(null);


  useEffect(() => {
    console.log("upserted");
    // var newData = patientMeasurementListing.map((item) => {
    //   return item;
    // });

    setData(patientMeasurementListing.data);
  }, [patientMeasurementListing]);
  const [forceRender, setForceRender] = useState(false);

  return (
    <>
      {data?.map((el: any) => (
        <tr
          key={el.id}
          className="cursor-pointer border-b transition duration-150 odd:bg-white even:bg-gray-50 hover:bg-gray-100"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
          >
            {el.title}
          </th>
          <td className="px-6 py-4">
            {new Date(el.created_at).toLocaleDateString()}
          </td>
          <td className="px-6 py-4">
            {new Date(el.created_at).toLocaleTimeString()}
          </td>
          <td className="px-6 py-4">{el.type}</td>
          <td className="px-6 py-4 ">
            <div className='flex items-center'>
              {el.status ? RenderStatus[el.status as keyof typeof RenderStatus] : 'Pending'}
              {
                el.updated_status != null ? <FaStar className="text-green-400 ml-2 w-4" /> : null
              }
            </div>
          </td>
          {user.role?.toLowerCase() != "doctor" && <td className="px-6 py-4">
            {el.updated_status != null ? (
              <div className="text-md text-gray-500">
                {el.updated_status == 0 ? 'Called Patient' : el.updated_status == 1 ? 'Contacted Doctor' : el.updated_status == 2 ? 'Contacted Other' : el.updated_status == 3 ? 'No, action Required' : el.updated_status == 4 ? 'False alarm' : 'Close alert'}
              </div>
            ) : (
              <div className="text-md text-gray-500">No Update</div>
            )}
          </td>}
          {user.role?.toLowerCase() == "doctor" && <td className="px-6 py-4">
            {/* dropdown */}
            <div className="mt-2 grid grid-cols-1">

              <select
                id="location"
                name="location"
                defaultValue="Canada"
                value={el.updated_status ?? -1}
                onChange={async (e) => {
                  const val = parseInt(e.target.value);
                  if (val == -1) {
                    return;
                  }


                  var ret = await updateMeasurementStatus(el.id, val, user.name ?? (user.first_name ?? ""));
                  if (ret != true) {
                    showModalReducer({ message: 'Failed to update status', type: 'ERROR', show: true });
                    return;
                  }

                  var newData = data.map((item: any) => {
                    if (item.id == el.id) {
                      return { ...item, updated_status: val, updated_status_by: user.name ?? (user.first_name ?? "") };
                    }
                    return item;
                  }
                  );

                  setData(newData);

                }}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                {
                  el.updated_status == null && <option value={-1}>No Update</option>
                }
                <option value={0}>Called Patient</option>
                <option value={1}>Contacted Doctor</option>
                <option value={2}>Contacted Other</option>
                <option value={3}>No, action Required</option>
                <option value={4}>False alarm</option>
                <option value={5}>Close alert</option>

              </select>
              <IoChevronDownCircleOutline
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>

          </td>}
          <td className="px-6 py-4">
            {/* button */}
            <button
              onClick={() => {
                setSelectedMeasurement(el);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              View
            </button>
          </td>
          <td className="px-6 py-4">{el.mode}</td>
          <td className="px-6 py-4">{el.values.toString()}</td>
          <td className="px-6 py-4">{el.unit.toString()}</td>
          <td className="px-6 py-4">{el.reading_source.toString()}</td>
          {
            user.role?.toLowerCase() != "patient" &&
            <td className="px-6 py-4">
              {/*  if the login patient this column will be hidden */}

              {
                getName({
                  first_name: el.patient.user.first_name,
                  middle_name: el.patient.user.middle_name,
                  last_name: el.patient.user.last_name,
                })

              }
            </td>
          }

          <td className="px-6 py-4">
            {el?.doctor
              ? 'Dr.' +
              ' ' +
              getName({
                first_name: el.doctor.user.first_name,
                middle_name: el.doctor.user.middle_name,
                last_name: el.doctor.user.last_name,
              })
              : el?.nurse
                ? 'RN' +
                ' ' +
                getName({
                  first_name: el.nurse.user.first_name,
                  middle_name: el.nurse.user.middle_name,
                  last_name: el.nurse.user.last_name,
                })
                : 'Self'}
          </td>
        </tr >
      ))}

      {selectedMeasurement != null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Log Details</h2>
            <p className='pb-2'>Updated at:
              {
                (selectedMeasurement.updated_status_at == null) ? "No Update" : new Date(selectedMeasurement.updated_status_at).toLocaleString()
              }
            </p>
            <p className='pb-2'>Updated by:
              {
                selectedMeasurement.updated_status_by == null ? 'No Update' : selectedMeasurement.updated_status_by
              }
            </p>
            <p className='pb-2'>Action: {
              selectedMeasurement.updated_status == 0 ? 'Called Patient' : selectedMeasurement.updated_status == 1 ? 'Contacted Doctor' : selectedMeasurement.updated_status == 2 ? 'Contacted Other' : selectedMeasurement.updated_status == null ? 'No Update' : 'No, action Required'
            }</p>
            <button
              // move it to right
              onClick={() => {
                setSelectedMeasurement(null);
              }}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md  float-right w-100"
            >
              Close
            </button>
          </div>
        </div >
      )}
    </>
  );
};

export default RenderTable;
