import request from 'umi-request';

export async function queryFakeList(params: { count: number }) {
  return request('/api/v1/manager/comic_crawler', {
    params,
  });
}

export async function saveComic(data: {}) {
  return request('/api/v1/manager/comic_crawler/save', {
    method: 'post',
    data,
  });
}
