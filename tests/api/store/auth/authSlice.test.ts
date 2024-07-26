import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../../src/store/auth/authSlice';
import { authenticatedState, initialState, notAuthenticatedState } from '../../../fixtures/authState';
import { testUserCredentials } from '../../../fixtures/testUser';

describe('Testing authSlice', () => {

    test('Should return the default values', () => {
        expect(authSlice.getInitialState()).toEqual(initialState)

    })

    test('Should login successfully', () => {
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials))
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
    })

    test('Should logout successfully', () => {
        const state = authSlice.reducer(authenticatedState, onLogout(undefined))

        expect(state).toEqual(
            { status: 'not-authenticated', user: {}, errorMessage: undefined }
        )
    })

    test('Should logout successfully with message', () => {
        const state = authSlice.reducer(authenticatedState, onLogout('Logout succesfully'))

        expect(state).toEqual(
            { status: 'not-authenticated', user: {}, errorMessage: 'Logout succesfully' }
        )
    })

    test('Should clean the errorMessage', () => {
        const stateLogout = authSlice.reducer(authenticatedState, onLogout('Logout succesfully'))
        const state = authSlice.reducer(stateLogout, clearErrorMessage())


        expect(state.errorMessage).toBe(undefined)
    })

})