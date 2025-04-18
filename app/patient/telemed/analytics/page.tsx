
import { PageInfo } from '@common';
import { getAllPatientsReports, getPatientEMRRecords } from '@service';
import type { ServerComponentProps } from '@types';
import { Analytics } from '@components';



export default function Page(): JSX.Element {
    return (
        <main className="h-full w-full">
            <Analytics />
        </main>
    );
}
