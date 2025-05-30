import { DoctorEMR } from '@components';
import { PageInfo } from '@common';
import Table from './Table'
export default function Page(): JSX.Element {
    return (
        <div className="hidescrollbar mt-16 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
            {/* <PageInfo /> */}
            {/* <Header patient_id={patient_id} /> */}
            {/* <Table records={res.data} /> */}
            <Table />
        </div>
    );
}