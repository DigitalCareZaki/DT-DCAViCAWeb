'use client';

import { useSelector } from 'react-redux';

import { ClientGenerator } from '@common';
import Content from './Content';

import type { ReduxProps } from '@store-types';
import type { ClientComponentProps, ArticleProps } from '@types';

interface ArticleListProps {
    initialData: ArticleProps[];
    userRole: string;
}

const ArticlesList: ClientComponentProps<ArticleListProps> = ({
    initialData,
    userRole,
}) => {
    const { trendingSearchArticles, isSearching } = useSelector(
        (state: ReduxProps) => state.articles
    );

    const data = isSearching ? trendingSearchArticles : initialData;

    return (
        <ClientGenerator data={data} userRole={userRole}>
            <Content />
        </ClientGenerator>
    );
};

export default ArticlesList;
