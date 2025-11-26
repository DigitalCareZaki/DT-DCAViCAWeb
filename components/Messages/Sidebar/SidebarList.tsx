'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ClientGenerator } from '@common';
import { setInboxReducer } from '@slice';
import Preview from './Preview';

import type { ClientComponentProps } from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';

type Props = {
    initialData: any[];
    type?: string;
};

const SidebarList: ClientComponentProps<Props> = ({ initialData, type }) => {
    const dispatch = useDispatch();
    const { inbox } = useSelector<ReduxProps, StoreGlobalState>((state) => state.global);

    useEffect(() => {
        dispatch(setInboxReducer(initialData));
    }, [initialData, dispatch]);

    let list = Array.isArray(inbox) ? inbox : initialData;

    if (type === 'starred') {
        list = list.filter((item: any) => item.starred);
    }

    return (
        <ClientGenerator data={list}>
            <Preview />
        </ClientGenerator>
    );
};

export default SidebarList;


