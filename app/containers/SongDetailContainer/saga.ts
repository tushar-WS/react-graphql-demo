import { put, call, takeLatest } from 'redux-saga/effects';
import { requestGetSingleItune, successGetSingleItune } from './reducer';
import { getSingleItune } from '@app/services/ituneApi';

export function* getItune(action: any): Generator<any, any> {
  const res: any = yield call(getSingleItune, action.payload);
  const { data, ok } = res;
  /* istanbul ignore else */
  if (ok) {
    yield put(successGetSingleItune(data));
  }
}

function* songDetailContainerSaga() {
  yield takeLatest(requestGetSingleItune.toString(), getItune);
}
export default songDetailContainerSaga;
