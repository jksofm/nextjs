import { ListParams, ListResponse } from '@/models/api';
import { Work } from '../models';
import axiosClient from './axios-client';

export const worksApi = {
  // Sử dụng partial khi bạn chỉ mún truyên một trong những property trong interface đó
  getAll(params: Partial<ListParams>): Promise<ListResponse<Work>> {
    return axiosClient.get('/works', { params });
  },
  get(id: string): Promise<Work> {
    return axiosClient.get(`/works/${id}`);
  },
  update(payload: FormData): Promise<Work> {
    return axiosClient.patch(`/works/${payload.get(`id`)}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  add(payload: FormData): Promise<Work> {
    return axiosClient.post(`/works`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
