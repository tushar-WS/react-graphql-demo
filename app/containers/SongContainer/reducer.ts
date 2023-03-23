import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Draft } from 'immer';

type initialStateType = {
  artistName: string | null;
  ituneData: any;
  loading: boolean;
};
export const initialState: initialStateType = { artistName: null, ituneData: {}, loading: false };

const songContainerSlice = createSlice({
  name: 'songContainer',
  initialState,
  reducers: {
    requestGetItuneSongs: (state: any, action: any) => {
      state.loading = true;
      state.artistName = action.payload;

      (artistName: string) => ({ payload: artistName });
    },
    successGetItuneSongs: (state: Draft<typeof initialState>, action: PayloadAction<any>) => {
      state.loading = false;
      state.ituneData = action.payload;
      console.log(action);
    },
    clearItuneSongs: (state: Draft<typeof initialState>) => {
      state.loading = false;
      state.artistName = null;
      state.ituneData = {};
    }
  }
});

export const { requestGetItuneSongs, successGetItuneSongs, clearItuneSongs } = songContainerSlice.actions;

export default songContainerSlice.reducer;
