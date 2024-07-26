import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface InitialStateAuth {
    status: string
    user: {
        uid: string
        name: string
    } | {}
    errorMessage: string | undefined
}

const initialState: InitialStateAuth = {
    status: 'checking',
    user: {},
    errorMessage: undefined,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state) => {
            state.status = 'checking'
            state.user = {}
            state.errorMessage = undefined
        },
        onLogin: (state, { payload }: PayloadAction<any>) => {
            state.status = 'authenticated'
            state.user = payload
            state.errorMessage = undefined
        },
        onLogout: (state, { payload }: PayloadAction<any>) => {
            state.status = 'not-authenticated'
            state.user = {}
            state.errorMessage = payload
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
        }
    }
});
// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;