'use client';
import { useEffect, useState } from 'react';
import { fetchMeetingMetadata } from '@service';
import type { TopbarProps } from './types';
import { FaInfoCircle } from '@react-icons/all-files/fa/FaInfoCircle';


export default function Topbar({ id }: TopbarProps) {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchMeetingMetadata(id);
        if (res.success) {
          setData(res.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading || error || !data) return null;




  return (
    <div className="w-full px-8 py-4 flex items-center justify-between bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 shadow-lg rounded-t-2xl border-b border-white/10">
      <div className="flex items-center gap-5 mt-2">
        {/* <FaInfoCircle className="text-blue-400 text-3xl" /> */}
        <div>
          <div className="text-xl font-extrabold text-white tracking-wide leading-tight">{data?.title}</div>
          <div className="text-base text-gray-300 mt-1">{data.description}</div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="text-base text-gray-200 flex items-center gap-2">
          <span className="font-semibold">Date:</span>
          <span>{new Date().toDateString()}</span>
        </div>
        <div className="text-sm text-white bg-blue-600/80 px-4 py-1 rounded-md font-semibold shadow border border-blue-400">
          <span className="font-semibold">Invited:</span> +{data.participants?.length}
        </div>
      </div>
    </div>
  );
}
