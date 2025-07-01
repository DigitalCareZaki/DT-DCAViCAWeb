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
    <div className="w-full px-6 py-3 flex items-center gap-6 bg-white/10 backdrop-blur-md shadow-md rounded-t-2xl border-b border-white/10">
      <div className="flex items-center gap-3">
        <FaInfoCircle className="text-blue-400 text-2xl" />
        <div>
          <div className="text-lg font-bold text-white tracking-wide">{data?.title}</div>
          <div className="text-sm text-gray-300"> {data.description}</div>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-6">
        <div className="text-sm text-gray-200 flex items-center gap-2">
          <span className="font-medium">Date:</span>
          <span>{new Date().toDateString()}</span>
        </div>
        <div className="text-xs text-gray-400 bg-gray-800/60 px-3 py-1 rounded-md select-all border border-gray-700">
          <span className="font-semibold">Invited:</span> +{data.participants?.length}
        </div>
      </div>
    </div>
  );
}
