'use client';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useUser } from '@selectors';
import Control, { Modal } from './Control';
import Participants from './Participants';
import Topbar from './Topbar';
import Counter from './Counter';
import VitalsServerWrapper from './Vitals/ServerWrapper';
import FeedbackModal from './FeedbackModal';
import { MAX_MEETING_MS, MEETING_WARNING_MS } from './constants';
import dynamic from 'next/dynamic';

const AgoraCall = dynamic(() => import('./AgoraCall'), { ssr: false });

// Kept for the tab's lifetime, so reloading the page doesn't restart the time limit
function rememberStart(id: string) {
    const key = `meeting-started-at:${id}`;
    try {
        const saved = Number(sessionStorage.getItem(key));
        if (saved) return saved;
        const now = Date.now();
        sessionStorage.setItem(key, String(now));
        return now;
    } catch {
        return Date.now();
    }
}

export default function MeetingClient({ id }: { id: string }) {
    const [user] = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [startedAt, setStartedAt] = useState<number | null>(null);
    const [ended, setEnded] = useState(false);

    const isPatient = user?.role === 'PATIENT' || user?.type === 'PATIENT';

    const handleCallStart = useCallback(() => {
        setStartedAt((prev) => prev ?? rememberStart(id));
    }, [id]);

    // End the call once it has run for the maximum meeting length, warning
    // shortly before. Patients get the feedback prompt, as when they hang up;
    // doctors stay on the page so an open consultation report isn't lost.
    useEffect(() => {
        if (startedAt === null || ended) return;

        const remaining = startedAt + MAX_MEETING_MS - Date.now();
        const warning = remaining > MEETING_WARNING_MS
            ? window.setTimeout(() => {
                toast(`${MEETING_WARNING_MS / 60000} minutes left in this meeting`, { icon: '⏳', duration: 6000 });
            }, remaining - MEETING_WARNING_MS)
            : undefined;
        const end = window.setTimeout(() => {
            setEnded(true);
            if (isPatient) setShowFeedbackModal(true);
        }, remaining);

        return () => {
            window.clearTimeout(warning);
            window.clearTimeout(end);
        };
    }, [startedAt, ended, isPatient]);

    return (
        // h-full (not h-screen): the layout shell is scaled with transform and sized at
        // 150%, so a viewport unit here only covers ~2/3 of the screen and leaves a gap.
        <div className="grid h-full min-h-0 w-full grid-cols-4 gap-4 bg-[#f6fcfc]">
            <div className="col-span-3 flex h-full min-h-0 w-full flex-col gap-4 rounded-2xl bg-dark-secondary shadow-xl overflow-hidden">
                <div className="shrink-0 flex items-center px-6 border-b border-dark-main/30">
                    <Topbar id={id} />
                </div>
                <div className="flex flex-col flex-grow min-h-0 relative">
                    <div className="flex-grow min-h-0 flex items-stretch justify-center bg-dark-main shadow-lg overflow-hidden m-0 p-0">
                        <AgoraCall id={id} ended={ended} onStart={handleCallStart} />
                    </div>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
                        <Counter startedAt={startedAt} ended={ended} />
                        <Control
                            id={id}
                            setIsModalOpen={setIsModalOpen}
                            setShowFeedbackModal={setShowFeedbackModal}
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-1 flex h-full min-h-0 w-full flex-col gap-4">
                <div className="flex-1 min-h-0 rounded-2xl bg-dark-secondary shadow-xl flex flex-col overflow-hidden">
                    <Participants id={id} />
                </div>
            </div>
            <VitalsServerWrapper id={id} />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={id} />
            <FeedbackModal
                isOpen={showFeedbackModal}
                onClose={() => setShowFeedbackModal(false)}
                appointmentId={id}
            />
        </div>
    );
}