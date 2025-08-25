import { FaRegHospital } from '@react-icons/all-files/fa/FaRegHospital';
import { IoMdMale } from '@react-icons/all-files/io/IoMdMale';

export const Branch = ({ name, id, handleSelect }: { [key: string]: any }) => (
  <div
    onClick={() => handleSelect('branch')(name, id)}
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

export const Department = ({
  title,
  id,
  handleSelect,
}: {
  [key: string]: any;
}) => (
  <div
    onClick={() => handleSelect('department')(title, id)}
    className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
  >
    <span className="font-medium">{title}</span>
    <FaRegHospital size={18} />
  </div>
);
