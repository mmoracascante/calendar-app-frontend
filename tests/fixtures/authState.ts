export const initialState = { status: 'checking', user: {}, errorMessage: undefined }

export const authenticatedState = {
    status: 'authenticated', user: {
        uid: 'basjdva',
        name: 'Marco Mora'
    },
    errorMessage: undefined
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    user: {},
    errorMessage: undefined
}