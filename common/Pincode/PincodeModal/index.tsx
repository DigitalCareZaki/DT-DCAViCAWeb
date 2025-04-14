'use client';

import { useState } from 'react';
import { ButtonPrimary } from '@common';
import Modal from '../Modal';

const PincodeClient = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div>
            <div className="flex justify-end">
                <ButtonPrimary
                    title="Add Pincode"
                    name="Add Pincode"
                    className="w-36 h-10 rounded-lg"
                    variant="icon"
                    icon="IoMdAdd"
                    onClick={handleOpenModal}
                />
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default PincodeClient;
