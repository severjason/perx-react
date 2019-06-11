import * as types from './types';
import { mainCollectionName } from './vars';

const initialState = {
  // collection is a dictionary object to improve storing the data
  [mainCollectionName]: {},
  order: [],
  loading: false,
  error: null,
  nextPage: null,
};

const reposReducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
  case types.REPOS_GET_REQUEST:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case types.REPOS_GET_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      [mainCollectionName]: payload,
      order: Object.keys(payload),
      nextPage: meta.nextPage ? (state.nextPage || 1) + 1 : null,
    };
  case types.REPOS_GET_MORE_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      [mainCollectionName]: {
        ...state,
        ...payload,
      },
      order: [
        ...state,
        ...Object.keys(payload),
      ],
      nextPage: meta.nextPage ? (state.nextPage || 1) + 1 : null,
    };
  case types.REPOS_GET_FAILURE:
  case types.REPOS_GET_MORE_FAILURE:
    return {
      ...state,
      loading: false,
      error: payload,
    };
  default:
    return state;
  }
};

export default reposReducer;
