'use server';

import type { ServerComponent, UserRole } from '@types';
import Form from './Calendar';
import { getCalendar } from '@service';

const Form1: ServerComponent = async () => {

  var data = await getCalendar();
  // sort the data.data.slots
  data.data.slots.sort((a, b) => {
    return a.day - b.day;
  });

  console.log('data', data.data);
  return (
    <>
      <Form data={data.data}></Form>
    </>
  );
};

export default Form1;
