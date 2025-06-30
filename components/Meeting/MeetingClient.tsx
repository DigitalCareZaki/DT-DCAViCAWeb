'use client';
import { useState } from 'react';
import Control, { Modal } from './Control';
import Participants from './Participants';
import Discussion from './Discussion';
import Topbar from './Topbar';
import Counter from './Counter';
import VitalsServerWrapper from './Vitals/ServerWrapper';
import dynamic from 'next/dynamic';

const AgoraCall = dynamic(() => import('./AgoraCall'), { ssr: false });

export default function MeetingClient({ id }: { id: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className={`grid h-screen grid-cols-4 gap-4 p-4 duration-200`}>
            <div className="col-span-3 flex h-full w-full flex-col gap-4 rounded-2xl bg-dark-secondary shadow-xl overflow-hidden">
                <div className="h-[8%] flex items-center px-6 border-b border-dark-main/30">
                    <Topbar id={id} />
                </div>
                <div className="flex flex-col flex-grow relative">
                    <div className="flex-grow flex items-center justify-center bg-dark-main rounded-2xl m-4 shadow-lg overflow-hidden">
                        <AgoraCall id={id} />
                    </div>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
                        <Counter />
                        <Control id={id} setIsModalOpen={setIsModalOpen} />
                    </div>
                </div>
            </div>
            <div className="col-span-1 flex h-full w-full flex-col gap-4">
                <div className="flex-1 rounded-2xl bg-dark-secondary shadow-xl overflow-hidden flex flex-col">
                    <Participants id={id} />
                </div>
                <div className="flex-1 rounded-2xl bg-dark-secondary shadow-xl overflow-hidden flex flex-col mt-2">
                    <Discussion id={id} />
                </div>
            </div>
            <VitalsServerWrapper id={id} />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={id} />
        </div>
    );
} 