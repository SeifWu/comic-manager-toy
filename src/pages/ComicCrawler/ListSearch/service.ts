import request from 'umi-request';

export async function queryFakeList(params: { count: number }) {
  return request('/api/v1/manager/comic_crawler', {
    params,
  });
}
