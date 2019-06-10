import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchRepos } from '../../api';
import * as actions from './actions';
import * as types from './types';

function* fetchUserReposSagaWorker({ payload: userName }) {
  try {
    const repos = yield call(fetchRepos, userName);
    yield put(actions.fetchReposSuccess(repos));
  } catch (error) {
    yield put(actions.fetchReposFailure(error));
  }
}

export default function* reposWatcherSaga() {
  yield takeLatest(types.REPOS_GET_REQUEST, fetchUserReposSagaWorker);
}
