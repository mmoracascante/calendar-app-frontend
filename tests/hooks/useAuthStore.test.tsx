import { configureStore } from '@reduxjs/toolkit';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { authSlice } from '../../src/store';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState, notAuthenticatedState } from '../fixtures/authState';
import { testUserCredentials } from '../fixtures/testUser';
import { caledarApi } from '../../src/api';


const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState }
        }

    })
}


describe('Testing useAuthStore', () => {


    test('should return the default values', () => {
        localStorage.clear()


        const mockStore = getMockStore({
            ...initialState
        })

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>

        })
        expect(result.current).toEqual(
            {
                status: 'checking',
                user: {},
                errorMessage: undefined,
                startLogin: expect.any(Function),
                startRegister: expect.any(Function),
                checkAuthToken: expect.any(Function),
                startLogout: expect.any(Function)
            }
        )

    })

    test('startLogin should perform the login correctly', async () => {
        localStorage.clear()

        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>

        })

        await act(async () => {
            await result.current.startLogin(testUserCredentials)
        })

        const { errorMessage, status, user } = result.current

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {
                name: 'Marco',
                uid: '65ea9138efda8c4888fdfd02'
            }
        })

        expect(localStorage.getItem('token')).toEqual(expect.any(String))
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))



    })


    test('startLogin should fail the authentication', async () => {

        localStorage.clear()
        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>

        })

        await act(async () => {
            await result.current.startLogin({ email: 'algo@google.com', password: '123456789' })
        })

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales incorrectas',
            status: 'not-authenticated',
            user: {}
        })

        expect(localStorage.getItem('token')).toBe(null)


        // Esto prueba que el errorMessage se haya limpiado
        await waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        )

    })


    test('startRegister should create an user', async () => {
        localStorage.clear()
        const newUser = { email: 'algo@google.com', password: '123456', name: 'Test user 2' }

        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>

        })

        // Esto evita que se haga la petición y se guarde el usuario innecesariamente
        // ya que solo es una prueba
        const spy = jest.spyOn(caledarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: "123455ndsjhsdc",
                name: "Test user",
                token: "ALGUN-TOKEN"
            }
        })

        await act(async () => {
            await result.current.startRegister(newUser)
        })

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual(
            {
                errorMessage: undefined,
                status: 'authenticated',
                user: { name: 'Test user', uid: '123455ndsjhsdc' }
            }
        )
        // Esto ayuda a que despues de esta prueba, este espía no exista
        // para futuras pruebas
        spy.mockRestore()

    })


    test('startRegister should fail the creation', async () => {

        localStorage.clear()


        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>

        })


        await act(async () => {
            await result.current.startRegister(testUserCredentials)
        })

        const { errorMessage, status, user } = result.current

        // console.log({ errorMessage, status, user })
        expect({ errorMessage, status, user }).toEqual(
            {
                errorMessage: 'Un usuario existe con ese correo',
                status: 'not-authenticated',
                user: {}
            }
        )


    })


    test('checkAuthToken should fail', async () => {
        localStorage.clear()


        const mockStore = getMockStore({ ...initialState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>

        })

        await act(async () => {
            await result.current.checkAuthToken()
        })

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        })

    })

    test('checkAuthToken success', async () => {

        const { data } = await caledarApi.post('/auth', testUserCredentials)
        localStorage.setItem('token', data.token)

        const mockStore = getMockStore({ ...initialState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>

        })

        await act(async () => {
            await result.current.checkAuthToken()
        })


        const { errorMessage, status, user } = result.current

        // console.log({ errorMessage, status, user })
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Marco', uid: '65ea9138efda8c4888fdfd02' }
        })



    })
})