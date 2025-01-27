'use server';

import Patient from './Patient';

import type { ServerComponent } from '@types';

const Patients: ServerComponent = async () => {
  return (
    <div className="hidescrollbar flex h-[30rem] w-[30%] flex-col justify-between rounded-lg bg-white p-6">
      <span className="screen-title normal-case">Participants</span>
      <div className="hidescrollbar flex h-[90%] w-full flex-col gap-4 overflow-y-scroll rounded-lg">
        <Patient
          imageURI="https://img-new.cgtrader.com/items/4259571/d7777b320a/large/3d-avatar-profession-as-doctor-3d-model-d7777b320a.jpg"
          name="Dr. Haris Iqbal"
          designation="Cardiologist (You)"
        />
        <Patient
          imageURI="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611728.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708387200&semt=ais"
          name="Syed Azeem Javed"
          designation="Patient"
        />
        <Patient
          imageURI="https://cdn3d.iconscout.com/3d/premium/thumb/nurse-6779106-5580749.png"
          name="Dr. Hooriya Javed Chaudhry"
          designation="Nurse"
        />
      </div>
    </div>
  );
};

export default Patients;
