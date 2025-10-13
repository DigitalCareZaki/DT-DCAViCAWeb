'use client';


import useForm from './useForm';
import { useRouter } from 'next/navigation';
import { InputBasic, ButtonPrimary, DropdownSecondary } from '@common';
// Removed getUser import and useEffect for role
import type { ClientComponent } from '@types';
import { useUser } from '@selectors';

const Form: ClientComponent = () => {
  // Update useForm to return user/role as well
  const [register, onSubmit, errors, loading, handleSelect, selectors, branches] = useForm();
  const router = useRouter();
  const [user] = useUser();



  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-2xl bg-white p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
        <div className="w-full sm:w-1/2">
          <InputBasic
            title="Video title"
            label="Title"
            placeholder="Enter video title"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('title')}
            error={!!errors.title?.message?.length}
            errorMessage={errors.title?.message || '&'}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <InputBasic
            title="Video description"
            label="Description"
            placeholder="Enter video description"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('description')}
            error={!!errors.description?.message?.length}
            errorMessage={errors.description?.message || '&'}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
        <div className="w-full">
          <InputBasic
            title="Video link"
            label="Link"
            placeholder="Enter video link"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('uri')}
            error={!!errors.uri?.message?.length}
            errorMessage={errors.uri?.message || '&'}
          />
        </div>

        {/* // Dropdown Branches start */}
        {user?.role === 'SUPERADMIN' && (
          // <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
          <div className="w-full">
            <DropdownSecondary
              title="Branch"
              label="Branch"
              borderTheme
              inputWrapperClassName="bg-background"
              error={!!errors.branch_id?.message}
              errorMessage={errors.branch_id?.message}
              selected={branches.find((b: any) => b.id === selectors.branch_id)?.name || ''}
            >
              {branches && branches.length > 0 ? (
                branches.map((branch: any) => (
                  <div
                    key={branch.id}
                    onClick={() => handleSelect('branch_id')(branch.id)}
                    className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                  >

                    <span className="font-medium">{branch.name}</span>
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-400">No branches found</div>
              )}
            </DropdownSecondary>
          </div>
          // </div>
        )}
        {/* // Dropdown Branches end */}

      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
        <div className="w-full sm:w-1/2">
          <DropdownSecondary
            title="Video Priority"
            label="Priority"
            borderTheme
            inputWrapperClassName="bg-background"
            error={!!errors.priority?.message}
            errorMessage={errors.priority?.message}
            selected={selectors.priority}
          >
            <>
              <div
                onClick={() => handleSelect('priority')('HIGH')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">HIGH</span>
              </div>
              <div
                onClick={() => handleSelect('priority')('LOW')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">LOW</span>
              </div>
              <div
                onClick={() => handleSelect('priority')('UNDEFINED')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">UNDEFINED</span>
              </div>
            </>
          </DropdownSecondary>
        </div>
        <div className="w-full sm:w-1/2">
          <DropdownSecondary
            title="Video Category"
            label="Category"
            borderTheme
            inputWrapperClassName="bg-background"
            error={!!errors.category?.message}
            errorMessage={errors.category?.message}
            selected={selectors.category}
          >
            <>
              <div
                onClick={() => handleSelect('category')('ECG')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">ECG</span>
              </div>
              <div
                onClick={() => handleSelect('category')('SPO2')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">SPO2</span>
              </div>
              <div
                onClick={() => handleSelect('category')('BLOODPRESSURE')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">BLOODPRESSURE</span>
              </div>
              <div
                onClick={() => handleSelect('category')('BLOODGLUCOSE')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">BLOODGLUCOSE</span>
              </div>
              <div
                onClick={() => handleSelect('category')('TEMPERATURE')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">TEMPERATURE</span>
              </div>
            </>
          </DropdownSecondary>
        </div>
      </div>


      {/* Submit Button */}
      <div className="flex flex-col gap-3 sm:flex-col sm:gap-4">
        <ButtonPrimary
          title={'Save'}
          name={'Save'}
          loading={loading}
          className="w-full"
        />
        <ButtonPrimary
          title={'Close'}
          name={'Close'}
          onClick={() => router.back()}
          className="w-full"
        />
      </div>

      {/* <ButtonPrimary title={'Save'} name={'Save'} loading={loading} />
      <ButtonPrimary title="Close" name="Close" loading={loading} onClick={() => router.back()} /> */}

    </form>
  );
};

export default Form;
