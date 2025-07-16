"use client";

import { PrimaryHeader, ClientGenerator } from "@common";
import Topbar from "./Topbar";
import Patient from "../components/Appointment";
import type { UserRole } from "@types";

const MeetingsClient = ({ appointments, userType }: { appointments: any[]; userType: UserRole | null }) => {
    return (
        <div className="hidescrollbar flex h-full w-full flex-col gap-6 overflow-y-scroll px-4">
            <Topbar userType={userType as UserRole} />
            <div className="grid w-full grid-cols-4 flex-wrap gap-4 1000:grid-cols-3 1300:grid-cols-4 1600:grid-cols-5">
                <ClientGenerator data={appointments} dynamicWidth>
                    <Patient />
                </ClientGenerator>
            </div>
        </div>
    );
};

export default MeetingsClient;
