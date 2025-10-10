'use server';

import { getTelemedDetails } from '@service';

import Header from '../components/Header';
import Topbar from './Topbar';
import Participant from './Participants';
import Discussion from './Discussion';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const ViewMeeting: ServerComponentProps<Props> = async ({ id }) => {
  const res = await getTelemedDetails(id);

  return (
    <div className="hidescrollbar flex h-full w-full flex-col gap-6 overflow-y-scroll px-4 py-4">
      {/* <Header /> */}
      <Topbar {...res.data} appointment_id={id} />
      <div className="flex h-[60vh] w-full items-center gap-4">
        <Participant participants={res.data.participants} />
        <div className="h-[60vh] w-[50%] rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Medication</h3>
          </div>

          {(res.data as any).appointmentObservation?.medications ? (
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium text-base capitalize">
                      {(res.data as any).appointmentObservation?.medications}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">Prescribed medication</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-gray-400">
              <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
              <p className="text-sm">No medication prescribed</p>
            </div>
          )}
        </div>
        <Discussion id={id} />
      </div>
    </div>
  );
};

export default ViewMeeting;
