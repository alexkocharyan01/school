import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const inputSlice = createSlice({
    name: 'inputValue',
    initialState,
    reducers: {
        formData: (state, action) => {
            const oldData = state.value;
            if (action.payload.name == 'register_password' || action.payload.id == "passwordConfirm") {
                state.value = ({
                    ...oldData,
                    passwords: {...oldData.passwords, [action.payload.id]: action.payload.text}
                });
            }
            else if(action.payload.name == 'login_password'){
                state.value = ({
                    ...oldData,
                    remember: false,
                    [action.payload.id]: action.payload.text,
                });
            }
            else {
                state.value = ({
                    ...oldData,
                    [action.payload.id]: action.payload.text,
                });
            }
        }
    }
})

export const {formData} = inputSlice.actions;

export const selectInput = (state) => state.inputValue.value;

export default inputSlice.reducer
