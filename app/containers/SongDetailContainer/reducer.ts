import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Draft } from 'immer';

type initialStateType = {
  trackId: string | null;
  singleItune: any;
};
export const initialState: initialStateType = { trackId: null, singleItune: {} };

const songDetailContainerSlice = createSlice({
  name: 'songDetailContainer',
  initialState,
  reducers: {
    requestGetSingleItune: (state: any, action: PayloadAction<string>) => {
      state.trackId = action.payload;
    },
    successGetSingleItune: (state: Draft<typeof initialState>, action: PayloadAction<any>) => {
      state.singleItune = action.payload;
    }
  }
});

export const { requestGetSingleItune, successGetSingleItune } = songDetailContainerSlice.actions;

export default songDetailContainerSlice.reducer;
