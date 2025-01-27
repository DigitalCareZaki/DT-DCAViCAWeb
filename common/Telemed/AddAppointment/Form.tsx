'use server';

import Link from 'next/link';

import { InputBasic } from '../../Input';
import { ButtonPrimary } from '../../Button';

import type { ServerComponent } from '@types';

const Form: ServerComponent = async () => {
  return (
    <form className="grid w-[60%] grid-cols-2 gap-6">
      <InputBasic
        placeholder="Title"
        label="Enter appointment title"
        icon="SiNamecheap"
        borderTheme
      />
      <InputBasic
        placeholder="Select Patient"
        label="Select Patient"
        icon="FaUser"
        borderTheme
      />
      <InputBasic
        placeholder="Select Appointment Type"
        label="Select Appointment Type"
        icon="MdMergeType"
        borderTheme
      />
      <InputBasic
        placeholder="Select Appointment Start Date"
        label="Appointment Start Date"
        icon="FaCalendarAlt"
        borderTheme
      />
      <InputBasic
        placeholder="Select Appointment End Date"
        label="Appointment End Date"
        icon="FaCalendarAlt"
        borderTheme
      />
      <InputBasic
        placeholder="Reports Type"
        label="Select Reports Type"
        icon="IoDocumentText"
        borderTheme
      />
      <div className="col-span-2 w-full">
        <InputBasic
          placeholder="Enter appointment description"
          label="Description"
          icon="BiSolidMessageSquareEdit"
          borderTheme
        />
      </div>
      <div className="col-span-2 flex w-full flex-col gap-4">
        <ButtonPrimary title="Save" name="Save" className="rounded-lg" />
        <Link passHref href="/doctor/telemed">
          <ButtonPrimary
            name="Close"
            className="h-10 rounded-lg border bg-white text-gray-600"
            type="button"
            outlined
          />
        </Link>
      </div>
    </form>
  );
};

export default Form;
