import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type stateType = {
  userToken: string;
};
const initialState: stateType = {
  userToken: '',
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    add: (state: stateType, action: PayloadAction<stateType>) => {
      state.userToken = action.payload.userToken;
    },
    remove: (state: stateType) => {
      state.userToken = "";
    },
  },
});
export const { add, remove } = userSlice.actions;
export default userSlice.reducer;
