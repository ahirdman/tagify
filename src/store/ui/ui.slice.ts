import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signUpModal: false,
  signInModal: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSignUpModal: state => {
      state.signUpModal = !state.signUpModal;
    },
    toggleSignInModal: state => {
      state.signInModal = !state.signInModal;
    },
    closeAllSignModals: () => initialState,
  },
});

export const { toggleSignInModal, toggleSignUpModal, closeAllSignModals } =
  uiSlice.actions;

export default uiSlice.reducer;
