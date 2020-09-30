import { message } from 'antd';
import { Effect, Reducer } from 'umi';

import { ListItemDataType } from './data.d';
import { queryFakeList, saveComic } from './service';

export interface StateType {
  list: ListItemDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    save: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'comicCrawlerAndListSearch',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },

    *save({ payload }, { call }) {
      const response = yield call(saveComic, payload);

      if (response.success) {
        message.success(response.message)
      } else {
        message.error(response.message)
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
