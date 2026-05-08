import { FaRegHospital } from '@react-icons/all-files/fa/FaRegHospital';
import { IoMdMale } from '@react-icons/all-files/io/IoMdMale';

import { getName } from '@init-globals';

export const Branch = ({ name, id, handleSelect }: { [key: string]: any }) => (
  <div
    onClick={() => handleSelect('branch')(name, id)}
    className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
  >
    <span className="font-medium">{name}</span>
    <FaRegHospital size={18} />
  </div>
);

export const Site = ({ name, id, handleSelect }: { [key: string]: any }) => (
  <div
    onClick={() => handleSelect('site')(name, id)}
    className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
  >
    <span className="font-medium">{name}</span>
    <FaRegHospital size={18} />
  </div>
);


export const City = ({ name, id, handleSelect }: { [key: string]: any }) => (
  <div
    onClick={() => handleSelect('city')(name, id)}
    className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
  >
    <span className="font-medium">{name}</span>
    {/* <IoMdMale size={18} /> */}
  </div>
);

export const Country = ({ name, id, handleSelect }: { [key: string]: any }) => (
  <div
    onClick={() => handleSelect('country')(name, id)}
    className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
  >
    <span className="font-medium">{name}</span>
    {/* <IoMdMale size={18} /> */}
  </div>
);

export const Nurse = ({
  id,
  handleSelect,
  first_name,
  last_name,
  middle_name,
  user,
}: {
  [key: string]: any;
}) => (
  <div
    onClick={() =>
      handleSelect('nurse')(
        getName({
          first_name: user?.first_name || first_name,
          middle_name: user?.middle_name || middle_name,
          last_name: user?.last_name || last_name,
        }),
        user?.id || id
      )
    }
    className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
  >
    <span className="font-medium">
      {getName({
        first_name: user?.first_name || first_name,
        middle_name: user?.middle_name || middle_name,
        last_name: user?.last_name || last_name,
      })}
    </span>
    <IoMdMale size={18} />
  </div>
);


export const Doctor = ({
  id,
  handleSelect,
  user,
  employee_id,
  vivalink_synced,
}: {
  [key: string]: any;
}) => (
  <div
    onClick={() =>
      handleSelect('doctor')(
        getName({
          first_name: user?.first_name,
          middle_name: user?.middle_name,
          last_name: user?.last_name,
        }),
        user?.id // Passing the USER ID inside the user object
      )
    }
    className="flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
  >
    <div className="flex min-w-0 items-center gap-1 truncate font-medium">
      <span className="truncate">
        {getName({
          first_name: user?.first_name,
          middle_name: user?.middle_name,
          last_name: user?.last_name,
        })}
      </span>
      {employee_id && (
        <span className="shrink-0 font-semibold">({employee_id})</span>
      )}
    </div>
    <div className="flex shrink-0 items-center gap-2">
      <span
        className={`text-[11px] font-semibold ${
          vivalink_synced ? 'text-emerald-600' : 'text-rose-600'
        }`}
      >
        VL: {vivalink_synced ? 'Yes' : 'No'}
      </span>
      <IoMdMale size={18} />
    </div>
  </div>
);

