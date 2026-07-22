'use server';

import fetch from '@fetch';

import { SitesResponse } from '../types';

const getSites = async (
  page: number = 1,
  limit: number = 10,
  branchId?: string
): Promise<SitesResponse> => {
  if (branchId) {
    const res = await fetch(`/api/v1/web/sites/${branchId}`);

    const data = await res.json();
    const sites = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.data)
          ? data.data.data
          : [];
    const pagination = data?.pagination ||
      data?.data?.pagination || {
        totalItems: sites.length,
        perPage: sites.length,
        currentPage: 1,
        totalPages: sites.length ? 1 : 0,
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null,
      };

    return {
      data: {
        data: sites,
        pagination,
      },
      success: res.ok,
    };
  }

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(`/api/v1/web/sites?${params.toString()}`);

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
};

export default getSites;
