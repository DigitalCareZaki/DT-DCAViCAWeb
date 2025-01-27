'use client';

import {
  InputBasic,
  InputDropdown,
  DropdownSecondary,
  ButtonPrimary,
  ClientGenerator,
} from '@common';

import Booking from '../components/Booking';
import useForm from './useForm';
import {
  TypeSelector,
  StatusSelector,
  AboutSelector,
  SelectedUser,
} from '../components/Selectors';
import SelectUser from '../components/SelectUser';

import type { ClientComponent } from '@types';

const Form: ClientComponent = () => {
  const [
    register,
    onSubmit,
    errors,
    loading,
    handleSelect,
    selectors,
    selectedTime,
    handleSelectTime,
    handleSearchUser,
    searching,
    users,
    handleSelectUser,
    selectedUsers,
    handleRemove,
  ] = useForm();

  return (
    <form
      onSubmit={onSubmit}
      className="h-full w-full rounded-b-2xl bg-white pb-10 text-lg"
    >
      <div className="flex h-fit w-full flex-col gap-10 rounded-2xl bg-fuchsia-500 p-8">
        <div>
          <span className="text-xl font-semibold text-white">
            Book Appointment
          </span>
        </div>
        <div className="flex w-full flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <div className="flex w-full items-end gap-4">
              <div className="w-full">
                <InputDropdown
                  loading={searching}
                  label="Invite participants"
                  placeholder="Invite participants by searching their email"
                  title="Invite participants"
                  overrideShow={0}
                  hideInfo
                  labelClassName="text-white text-lg"
                  inputWrapperClassName="bg-fuchsia-400 doctor:focus-within:border-fuchsia-100 patient:focus-within:border-fuchsia-100 nurse:focus-within:border-fuchsia-100 border-transparent hover:bg-fuchsia-400"
                  inputClassName="bg-transparent placeholder:text-fuchsia-200 text-fuchsia-100 text-lg"
                  icon="IoSearch"
                  iconColor="#fff"
                  onChange={handleSearchUser}
                  dropdownClassName="bg-fuchsia-200"
                >
                  <ClientGenerator
                    data={users}
                    handleSelectUser={handleSelectUser}
                  >
                    <SelectUser />
                  </ClientGenerator>
                </InputDropdown>
              </div>
              <div className="h-10 w-32 shrink-0">
                <ButtonPrimary
                  className="w-full text-lg rounded-full text-white doctor:bg-fuchsia-600 patient:bg-fuchsia-600 nurse:bg-fuchsia-600"
                  name="Invite"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <ClientGenerator data={selectedUsers} handleRemove={handleRemove}>
                <SelectedUser />
              </ClientGenerator>
            </div>
          </div>
          <InputBasic
            name="title"
            placeholder="Enter appointment title"
            defaultBorder
            inputWrapperClassName="bg-fuchsia-400 doctor:focus-within:border-fuchsia-100 patient:focus-within:border-fuchsia-100 nurse:focus-within:border-fuchsia-100 border-transparent"
            label="Appointment title"
            inputClassName="bg-transparent placeholder:text-fuchsia-200 text-fuchsia-100 text-lg"
            hideInfo
            labelClassName="text-white text-lg"
            hookProps={register('title')}
            error={!!errors?.title?.message?.length}
            errorMessage={errors?.title?.message}
            errorClassName="text-rose-200"
          />
          <InputBasic
            name="description"
            placeholder="Enter appointment description"
            defaultBorder
            inputWrapperClassName="bg-fuchsia-400 doctor:focus-within:border-fuchsia-100 patient:focus-within:border-fuchsia-100 nurse:focus-within:border-fuchsia-100 border-transparent"
            label="Appointment description"
            inputClassName="bg-transparent placeholder:text-fuchsia-200 text-fuchsia-100 text-lg"
            hideInfo
            labelClassName="text-white text-lg"
            hookProps={register('description')}
            error={!!errors?.description?.message?.length}
            errorMessage={errors?.description?.message}
            errorClassName="text-rose-200"
          />
          <div className="flex w-full items-center gap-4">
            <div className="w-1/2">
              <DropdownSecondary
                title="Select appointment type"
                label="Appointment type"
                borderTheme
                icon="FaGenderless"
                hideInfo
                inputWrapperClassName="bg-fuchsia-400 doctor:focus-within:border-fuchsia-100 border-transparent hover:bg-fuchsia-300"
                labelClassName="text-white text-lg"
                titleClassName="text-white text-lg"
                iconColor="#fff"
                error={!!errors?.type?.message?.length}
                errorMessage={errors?.type?.message}
                errorClassName="text-rose-200"
                selected={selectors.type}
              >
                <TypeSelector handleSelect={handleSelect} />
              </DropdownSecondary>
            </div>
            <div className="w-1/2">
              <DropdownSecondary
                title="Select appointment about"
                label="Appointment about"
                borderTheme
                icon="FaGenderless"
                hideInfo
                inputWrapperClassName="bg-fuchsia-400 doctor:focus-within:border-fuchsia-100 border-transparent hover:bg-fuchsia-300"
                labelClassName="text-white text-lg"
                titleClassName="text-white text-lg"
                iconColor="#fff"
                error={!!errors?.about?.message?.length}
                errorMessage={errors?.about?.message}
                errorClassName="text-rose-200"
                selected={selectors.about}
              >
                <AboutSelector handleSelect={handleSelect} />
              </DropdownSecondary>
            </div>
          </div>
        </div>
      </div>
      <Booking selectedUserId={
        selectedUsers.length > 0 ? selectedUsers[0].id : undefined
      } handleSelectDate={handleSelectTime} />

      <div className="w-full p-2 px-10 pb-0 pt-10">
        <ButtonPrimary
          className="h-14 text-lg w-full doctor:bg-fuchsia-500 patient:bg-fuchsia-500 nurse:bg-fuchsia-500"
          name="Create Appointment"
          loading={loading}
        />
      </div>
    </form>
  );
};

export default Form;