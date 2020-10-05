import { Effect, Reducer } from 'umi';

import { ListItemDataType } from './data.d';
import { queryList, showComic, showContent } from './service';

export interface StateType {
  list: ListItemDataType[];
  detail: Detail;
  content: any;
}

export interface Detail {
  id: string;
  name: string;
  cover: string;
  comicChapter: ComicChapter[];
}

export interface ComicChapter {
  id: string;
  num: string;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    show: Effect;
    content: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    showComic: Reducer<StateType>;
    showContent: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'comic',

  state: {
    list: [],
    detail: {},
    content: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },

    *show({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(showComic, id);
      yield put({
        type: 'showComic',
        payload: response.data ? response.data : {},
      });
      console.log('response: ', response);
    },

    *content({ payload }, { call, put }) {
      const response = yield call(showContent, payload);
      yield put({
        type: 'showContent',
        payload: response.success ? response : {},
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },

    showComic(state, action) {
      return {
        ...state,
        detail: action.payload,
      };
    },

    showContent(state, action) {
      return {
        ...state,
        content: action.payload,
      };
    },
  },
};

export default Model;
