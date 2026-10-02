import React from 'react';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { FaUserMd } from '@react-icons/all-files/fa/FaUserMd';
import { FaUserNurse } from '@react-icons/all-files/fa/FaUserNurse';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import { getName } from '@init-globals';
import Image from 'next/image';
interface UserProfileModalProps {
    user: any;
    onClose: () => void;
}

const labelClass = 'text-sm font-medium text-gray-500';
const valueClass = 'text-base font-semibold text-gray-900';

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose }) => {

    console.log('user >>>>', user);

    if (!user) return null;



    // Helper to render fields
    const renderField = (label: string, value: any) => (
        <div className="flex flex-col mb-2 overflow-hidden">
            <span className={labelClass}>{label}</span>
            <span className={`${valueClass} break-all`}>{value || 'N/A'}</span>
        </div>
    );

    // Role-specific details
    let roleDetails = null;
    if (user.role === 'DOCTOR') {
        const specialitiesStr = user.doctor?.specialities?.length > 0
            ? user.doctor.specialities.map((s: any) => s.title).join(', ')
            : null;
        roleDetails = (
            <>
                {renderField('Title', user.title)}
                {renderField('Username', user.username)}
                {renderField('Date of Birth', user.dob ? user.dob.split('T')[0] : null)}
                {renderField('Country', user.location?.country?.name ?? user.location?.country?.title)}
                {renderField('City', user.location?.city?.name ?? user.location?.city?.title)}
                {renderField('Department', user.doctor?.departments?.[0]?.title)}
                {renderField('Specialities', specialitiesStr)}
                {renderField('Employee ID', user.doctor?.employee_id)}
                {renderField('Institute', user.doctor?.institute)}
                {renderField('Contract', user.doctor?.contract)}
                {renderField('NPI Number', user.doctor?.npi_number)}
                {renderField('PMDC Number', user.doctor?.pmdc_number)}
                {renderField('AViCardia Monitoring', user.doctor?.avicardia_monitoring ?? (user.doctor?.vivalink_synced ? 'YES' : 'NO'))}
                {renderField('Address', user.location?.address)}
            </>
        );
    } else if (user.role === 'NURSE') {
        const nurseNamesStr = user.nurse?.specialities?.length > 0
            ? user.nurse.specialities.map((s: any) => s.title).join(', ')
            : null;
        roleDetails = (
            <>
                {renderField('Title', user.title)}
                {renderField('Username', user.username)}
                {renderField('Date of Birth', user.dob ? user.dob.split('T')[0] : null)}
                {renderField('Country', user.location?.country?.name ?? user.location?.country?.title)}
                {renderField('City', user.location?.city?.name ?? user.location?.city?.title)}
                {renderField('Department', user.nurse?.departments?.[0]?.title)}
                {renderField('Specialisation', nurseNamesStr)}
                {renderField('Employee ID', user.nurse?.employee_id)}
                {renderField('NPI Number', user.nurse?.npi_number)}
                {renderField('Address', user.location?.address)}
            </>
        );
    } else if (user.role === 'PATIENT') {
        const primaryDoctorUser = user.patient?.doctors?.[0]?.user;
        const primaryNurseUser = user.patient?.nurses?.[0]?.user;
        const assignedDoctorName = primaryDoctorUser
            ? getName({
                first_name: primaryDoctorUser.first_name,
                last_name: primaryDoctorUser.last_name,
                middle_name: primaryDoctorUser.middle_name,
            })
            : null;
        const assignedNurseName = primaryNurseUser
            ? getName({
                first_name: primaryNurseUser.first_name,
                last_name: primaryNurseUser.last_name,
                middle_name: primaryNurseUser.middle_name,
            })
            : null;
        roleDetails = (
            <>
                {renderField('Title', user.title)}
                {renderField('Username', user.username)}
                {renderField('Date of Birth', user.dob ? user.dob.split('T')[0] : null)}
                {renderField('Country', user.location?.country?.name ?? user.location?.country?.title)}
                {renderField('City', user.location?.city?.name ?? user.location?.city?.title)}
                {renderField('Weight (KG)', user.patient?.weight)}
                {renderField('Height (cm)', user.patient?.height)}
                {renderField('Assigned Doctor', assignedDoctorName)}
                {renderField('Assigned Nurse', assignedNurseName)}
                {renderField('Address', user.location?.address)}
                {/* {renderField('Cardiac Monitoring Site', user.patient?.site?.name ?? user.patient?.site?.title ?? user.patient?.site?.label)} */}
            </>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-all duration-300">
            <div className="bg-white rounded-2xl p-0 max-w-2xl w-full mx-4 shadow-2xl relative animate-fadeInUp">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1 transition"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <FaTimes size={22} />
                </button>
                <div className="flex flex-col items-center pt-8 pb-4 px-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                    <div className="mb-2">
                        {user?.uri ? (
                            <Image
                                src={user?.uri}
                                alt="Profile"
                                className="w-[60px] h-[60px] object-cover rounded-full border-4 border-purple-100 shadow-lg bg-white"
                                width={60}
                                height={60}
                            />
                        ) : (
                            <>
                                {user.role === 'DOCTOR' && <FaUserMd className="text-blue-500 bg-white rounded-full border-4 border-blue-100 shadow-lg" size={60} />}
                                {user.role === 'NURSE' && <FaUserNurse className="text-green-500 bg-white rounded-full border-4 border-green-100 shadow-lg" size={60} />}
                                {user.role === 'PATIENT' && <FaUser className="text-purple-500 bg-white rounded-full border-4 border-purple-100 shadow-lg" size={60} />}
                            </>
                        )}
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
                <div className="px-8 py-6 max-h-[600px] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
                        {renderField('Email', user.email)}
                        {renderField('Phone Number', user.phone_number)}
                        {renderField('Username', user.username)}
                        {renderField('Title', user.title)}
                        {renderField('Gender', user.gender)}
                        {renderField('Department',
                            user.role === 'DOCTOR' ? user.doctor?.departments?.[0]?.title :
                                user.role === 'NURSE' ? user.nurse?.departments?.[0]?.title :
                                    user.role === 'PATIENT' ? user.patient?.doctors?.[0]?.departments?.[0]?.title : null
                        )}
                        {renderField('Branch', user.associated_branches?.[0]?.name)}
                        {renderField('Site',
                            user.role === 'DOCTOR' ? (user.doctor?.site?.name ?? user.doctor?.site?.title ?? user.doctor?.site?.label) :
                                user.role === 'NURSE' ? (user.nurse?.site?.name ?? user.nurse?.site?.title ?? user.nurse?.site?.label) :
                                    user.role === 'PATIENT' ? (user.patient?.site?.name ?? user.patient?.site?.title ?? user.patient?.site?.label) : null
                        )}
                        {user.role !== 'NURSE' && renderField('Monitoring',
                            user.role === 'DOCTOR' ? (user.doctor?.vivalink_synced ? 'YES' : user.doctor?.avicardia_monitoring) :
                                user.role === 'PATIENT' ? (user.patient?.vivalink_synced ? 'YES' : user.patient?.cardiac_monitoring) : null
                        )}
                    </div>
                    {roleDetails && (
                        <>
                            <hr className="my-4 border-gray-200" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Role Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    {roleDetails}
                                </div>
                            </div>
                        </>
                    )}
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
