import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type stateType = {
  userID: string;
  userToken: string;
};
const initialState: stateType = {
    userID: '',
    userToken: ''
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    add: (state: stateType, action: PayloadAction<stateType>) => {    
    state.userID = action.payload.userID,
    state.userToken = action.payload.userToken
    },
    remove: (state, action: PayloadAction<stateType>) => {
    //   state.value = state.value.filter(
    //     item => item.itemId !== action.payload.itemId
    //   );
    },
  },
});
export const { add, remove } = userSlice.actions;
export default userSlice.reducer;

const reducer = {
  add: (state: stateType, action: PayloadAction<stateType>) => {
    return {
      ...state,
      userID: action.payload.userID,
      userToken: action.payload.userToken,
    };
  },
};