import React from 'react';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { FaUserMd } from '@react-icons/all-files/fa/FaUserMd';
import { FaUserNurse } from '@react-icons/all-files/fa/FaUserNurse';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import { getName } from '@init-globals';

interface UserProfileModalProps {
    user: any;
    onClose: () => void;
}

const labelClass = 'text-sm font-medium text-gray-500';
const valueClass = 'text-base font-semibold text-gray-900';

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose }) => {
    if (!user) return null;

    console.log('user kia coming nurse >>>', user.nurse);

    // Helper to render fields
    const renderField = (label: string, value: any) => (
        <div className="flex flex-col mb-2">
            <span className={labelClass}>{label}</span>
            <span className={valueClass}>{value || 'N/A'}</span>
        </div>
    );

    // Role-specific details
    let roleDetails = null;
    if (user.role === 'DOCTOR') {
        roleDetails = (
            <>
                {renderField('Department', user.doctor?.departments?.[0]?.title)}
                {renderField('Speciality', user.doctor?.speciality)}
                {renderField('License Number', user.doctor?.license_number)}
                {/* Add more doctor fields as needed */}
            </>
        );
    } else if (user.role === 'NURSE') {
        roleDetails = (
            <>
                {renderField('Department', user.nurse?.department?.title)}
                {/* {renderField('License Number', user.nurse?.license_number)} */}
                {/* Add more nurse fields as needed */}
            </>
        );
    } else if (user.role === 'PATIENT') {
        roleDetails = (
            <>
                {renderField('Date of Birth', user.patient?.dob)}
                {renderField('Gender', user.gender)}
                {renderField('Assigned Doctor', user.patient?.doctors?.[0]?.full_name)}
                {renderField('Medical Record No.', user.patient?.medical_record_number)}
                {renderField('Address', user.patient?.address)}
                {renderField('Phone', user.phone_number)}
                {/* Add all fields from AddPatients form here */}
            </>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-all duration-300">
            <div className="bg-white rounded-2xl p-0 max-w-xl w-full mx-4 shadow-2xl relative animate-fadeInUp">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1 transition"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <FaTimes size={22} />
                </button>
                <div className="flex flex-col items-center pt-8 pb-4 px-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                    <div className="mb-2">
                        {user.role === 'DOCTOR' && <FaUserMd className="text-blue-500 bg-white rounded-full border-4 border-blue-100 shadow-lg" size={60} />}
                        {user.role === 'NURSE' && <FaUserNurse className="text-green-500 bg-white rounded-full border-4 border-green-100 shadow-lg" size={60} />}
                        {user.role === 'PATIENT' && <FaUser className="text-purple-500 bg-white rounded-full border-4 border-purple-100 shadow-lg" size={60} />}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
                        {getName({
                            first_name: user.first_name,
                            last_name: user.last_name,
                            middle_name: user.middle_name,
                        })}
                    </h2>
                    <span className="text-sm text-gray-500 mb-2 capitalize">{user.role?.toLowerCase()}</span>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{user.active ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="px-8 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
                        {renderField('Email', user.email)}
                        {renderField('Branch', user.associated_branches?.[0]?.name)}
                    </div>
                    <hr className="my-4 border-gray-200" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Role Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {roleDetails}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .animate-fadeInUp {
                    animation: fadeInUp 0.3s cubic-bezier(0.4,0,0.2,1);
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 40px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default UserProfileModal;
