
'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence, motion } from 'framer-motion';

import type { ClientComponentProps } from '@types';
import type { Slot, TimeSectionProps } from './types';
import { createHours } from '@init-globals';

const TimeSection: ClientComponentProps<TimeSectionProps> = ({
  onAdded,
  min,
  max,
  slot,
  onChange,
  deleteSlot,
  setSlot,
  baseDate,
}) => {
  const [show, setShow] = useState<boolean>(false);

  const handleSelect = () => {
    setShow((prev) => !prev);
  };

  function setTimeOnDate(baseLike: Date | string | number | undefined, hhmm: string): Date {
    const [h, m] = hhmm.split(':').map(Number);
    // prefer provided baseLike, then provided baseDate prop, otherwise today
    const base = baseLike ? new Date(baseLike) : baseDate ? new Date(baseDate) : new Date();
    // preserve only date part of base and set hours/minutes
    base.setHours(h, m, 0, 0); // interpret as local 24h time
    return base;
  }

  function getTimeValue(value: Date | undefined) {
    if (!value) return "--";
    const d = new Date(value);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  function format12h(dateLike: Date | string | number) {
    const d = new Date(dateLike);
    // [] = use default locale; force hour12 for AM/PM
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  }


  function getTitle() {
    // show label only when both times are selected
    if (!slot || !slot.startTime || !slot.endTime || onAdded) return 'Select Time';

    return `${format12h(slot.startTime)} - ${format12h(slot.endTime)}`;
  }

  return (
    <AnimatePresence>
      <div className="relative">
        <div
          onClick={handleSelect}
          className={twMerge(
            'flex h-11 w-40 cursor-pointer select-none items-center justify-center rounded-lg bg-fuchsia-100 text-xs font-semibold text-gray-600 transition duration-200 hover:bg-fuchsia-500 hover:text-white'
          )}
        >
          {getTitle()}
        </div>
        {show && (
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: 'tween',
            }}
            className="absolute -bottom-24 z-50 flex h-20 w-fit items-center gap-4 rounded-lg bg-fuchsia-500 p-2"
          >
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-white">
                Start Time
              </span>
              <input
                type="time"
                className="rounded-md bg-fuchsia-200 p-2 text-xs font-semibold"
                value={getTimeValue(slot?.startTime)}
                min={min}
                max={max}
                onChange={(e) => {
                  const startTime = setTimeOnDate(slot?.startTime, e.target.value); // no "am" append
                  setSlot({ ...(slot || {}), startTime });
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-white">End Time</span>
              <input
                type="time"
                className="rounded-md bg-fuchsia-200 p-2 text-xs font-semibold"
                value={getTimeValue(slot?.endTime)}
                min={min}
                max={max}
                onChange={(e) => {
                  const endTime = setTimeOnDate(slot?.endTime, e.target.value); // no "am" append
                  setSlot({ ...(slot || {}), endTime });
                }}
              />
            </div>
            {
              !onAdded && <button
                className="flex  items-center justify-center rounded-lg  text-fuchsia-500 hover:bg-fuchsia-400 hover:text-white transition"
                onClick={() => {
                  deleteSlot && deleteSlot();
                  setShow(false);
                }}
              >
                <svg fill="white" className="h-7 w-7" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 457.503 457.503" >
                  <g>
                    <g>
                      <path d="M381.575,57.067h-90.231C288.404,25.111,261.461,0,228.752,0C196.043,0,169.1,25.111,166.16,57.067H75.929
			c-26.667,0-48.362,21.695-48.362,48.362c0,26.018,20.655,47.292,46.427,48.313v246.694c0,31.467,25.6,57.067,57.067,57.067
			h195.381c31.467,0,57.067-25.6,57.067-57.067V153.741c25.772-1.02,46.427-22.294,46.427-48.313
			C429.936,78.761,408.242,57.067,381.575,57.067z M165.841,376.817c0,8.013-6.496,14.509-14.508,14.509
			c-8.013,0-14.508-6.496-14.508-14.509V186.113c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z
			 M243.26,376.817c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.508-6.496-14.508-14.509V186.113
			c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z M320.679,376.817
			c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.509-6.496-14.509-14.509V186.113c0-8.013,6.496-14.508,14.509-14.508
			s14.508,6.496,14.508,14.508V376.817z"/>
                    </g>
                  </g>
                </svg>
              </button>
            }

            {onAdded && <button
              className="flex  items-center justify-center rounded-lg  text-fuchsia-500 hover:bg-fuchsia-400 hover:text-white transition"
              onClick={() => {
                if (slot && slot.startTime && slot.endTime) {
                  onAdded(slot);
                }
                setSlot({
                  startTime: undefined,
                  endTime: undefined,
                });

                // clsoe it
                setShow(false);
              }}
            >
              <svg className="h-7 w-7" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>plus</title>
                <desc>Created with Sketch Beta.</desc>
                <defs>
                </defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                  <g id="Icon-Set-Filled" transform="translate(-362.000000, -1037.000000)" fill="white">
                    <path d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049" id="plus" >
                    </path>
                  </g>
                </g>
              </svg>
            </button>
            }

          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default TimeSection;
