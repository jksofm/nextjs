import useSWR, { SWRConfiguration } from 'swr';
import { authApi, worksApi } from '../api-client';
import { LoginPayload, UserProfile, Work } from '@/models';
import { StorageKeys, SwrKeys } from '@/constants';
import { ListParams } from '@/models/api';

export interface UseWorkDetailProps {
  workId: string;
  options?: SWRConfiguration;
  enabled?: boolean;
}
export function useWorkDetail({ workId, options, enabled }: UseWorkDetailProps) {
  //  Ta truyền vào tham số thứ nhất cảu params không phải là một chuỗi bởi vì mỗi lần ta thay đổi params nó sẽ gọi lại swr
  const swrResponse = useSWR<Work | null>(
    enabled ? [SwrKeys.GET_WORK_DETAIL, workId] : null,
    () => worksApi.get(workId),
    {
      dedupingInterval: 30 * 1000,
      fallbackData: null,
      keepPreviousData: true,

      ...options,
    }
  );
  async function updateWork(payload: FormData) {
    const newWork = await worksApi.update(payload);
    swrResponse.mutate();
  }
  return { ...swrResponse, updateWork };
}
