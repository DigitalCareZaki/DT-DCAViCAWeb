'use client';

import { useSelector } from 'react-redux';
import { ClientGenerator } from '@common';
import Preview from './Preview';

import type { ClientComponentProps } from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';

type Props = {
    initialData: any[];
};

const SidebarList: ClientComponentProps<Props> = ({ initialData }) => {
    const { inbox } = useSelector<ReduxProps, StoreGlobalState>((state) => state.global);

    const list = Array.isArray(inbox) && inbox.length ? inbox : initialData;

    console.log('list >>>>>>', list);
    return (
        <ClientGenerator data={list}>
            <Preview />
        </ClientGenerator>
    );
};

export default SidebarList;


