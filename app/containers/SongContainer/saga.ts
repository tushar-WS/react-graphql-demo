import { put, call, takeLatest } from 'redux-saga/effects';
import { requestGetItuneSongs, successGetItuneSongs } from './reducer';
import { getItunes } from '@app/services/ituneApi';

export function* getItuneSongs(action: any): Generator<any, any> {
  const res: any = yield call(getItunes, action.payload);
  const { data, ok } = res;
  if (ok) {
    yield put(successGetItuneSongs(data));
  }
}

function* songContainerSaga() {
  yield takeLatest(requestGetItuneSongs.toString(), getItuneSongs);
}
export default songContainerSaga;
