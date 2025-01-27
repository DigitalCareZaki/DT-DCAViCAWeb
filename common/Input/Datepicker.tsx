'use client';

import { useState } from 'react';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { AnimatePresence, motion } from 'framer-motion';

import { addDays } from 'date-fns';
import { DateRangePicker, Range } from 'react-date-range';

import type { ClientComponentProps } from '@types';
import type { DatepickerProps } from './types';

const Datepicker: ClientComponentProps<DatepickerProps> = ({
  loading,
  children,
  title,
}) => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  return (
    <div className="relative flex w-full flex-col gap-4">
      <div
        className="bg-zinc-800 p-2 text-white"
        onClick={() => setShow((prev) => !prev)}
      >
        {state.length > 0 && state[0]?.startDate?.toLocaleDateString()} -
        {state.length > 0 && state[0]?.endDate?.toLocaleDateString()}
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 1,
            }}
            exit={{
              y: 10,
              opacity: 0,
            }}
            className={'h-full w-fit'}
          >
            <DateRangePicker
              onChange={(item) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Datepicker;
