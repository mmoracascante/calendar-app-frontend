import { useDispatch, useSelector } from 'react-redux'
import { RootState, clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '../store'
import { caledarApi } from '../api'

interface StartLoginTypes {
    email: string
    password: string
}

interface StartRegisterTypes {
    email: string
    name: string
    password: string
}





export const useAuthStore = () => {
    const { user, errorMessage, status } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()


    const startLogin = async ({ email, password }: StartLoginTypes) => {
        dispatch(onChecking())
        try {
            const { data } = await caledarApi.post('/auth', {
                email,
                password,
            })


            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', JSON.stringify(new Date().getTime()))
            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)

        }

    }

    const startRegister = async ({ email, name, password }: StartRegisterTypes) => {
        dispatch(onChecking())
        try {
            const { data } = await caledarApi.post('/auth/new', {
                email, name, password
            })

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', JSON.stringify(new Date().getTime()))
            dispatch(onLogin({
                name: data.name,
                uid: data.uid
            }))


        } catch (error: any) {
            dispatch(onLogout(error.response.data?.msg || ''))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)


        }
    }

    const checkAuthToken = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return dispatch(onLogout(undefined))


            const { data } = await caledarApi.get('/auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', JSON.stringify(new Date().getTime()))
            dispatch(onLogin({
                name: data.name,
                uid: data.uid
            }))

        } catch (error) {
            localStorage.clear()
            dispatch(onLogout(undefined))

        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogout(undefined))
        dispatch(onLogoutCalendar())
    }



    return {
        //* Properties
        status,
        user,
        errorMessage,



        //* Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }

}
