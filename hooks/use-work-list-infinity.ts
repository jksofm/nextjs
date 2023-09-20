import axiosClient from '@/api-client/axios-client';
import { Work } from '@/models';
import { ListParams, ListResponse } from '@/models/api';
import qs from 'qs';
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite';

export interface UseWorkListProps {
  params: Partial<ListParams>;
  options?: SWRInfiniteConfiguration;
}
export function useWorkInfinitys({ params, options }: UseWorkListProps) {
  //  Ta truyền vào tham số thứ nhất cảu params không phải là một chuỗi bởi vì mỗi lần ta thay đổi params nó sẽ gọi lại swr
  const swrResponse = useSWRInfinite<ListResponse<Work>>(
    (index: number, previousPageData: ListResponse<Work>) => {
      const page = index + 1;
      const query: Partial<ListParams> = {
        _page: page,
        _limit: 5,
        ...params,
      };
      if (previousPageData) {
        const { _limit, _totalRows } = previousPageData?.pagination || { _limit: 5, _totalRows: 0 };
        const totalPages = Math.ceil(_totalRows / _limit);
        if (page > totalPages) {
          return null;
        }
      }

      return `/works?${qs.stringify(query)}`;
    },
    (url: string) => axiosClient.get(url),
    {
      ...options,
    }
  );

  return swrResponse;
}
