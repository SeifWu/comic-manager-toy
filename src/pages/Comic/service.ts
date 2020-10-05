import request from 'umi-request';

export async function queryList(params: { count: number }) {
  return request('/api/v1/manager/comics', {
    params,
  });
}

export async function showComic(id: string) {
  console.log('Re', id);
  return request(`/api/v1/manager/comics/${id}`, {
    method: 'GET',
  });
}

export async function showContent(params: { id: string; iid: string }) {
  return request(`/api/v1/manager/comics/${params.id}/${params.iid}`, {
    method: 'GET',
  });
}
