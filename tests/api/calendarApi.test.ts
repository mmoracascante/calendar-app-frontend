import caledarApi from '../../src/api/calendarApi';

describe('Testing caledarApi', () => {

    test('Should the initial config', () => {

        // console.log(caledarApi)
        // console.log(process.env)
        expect(caledarApi.defaults.baseURL).toBe(process.env.VITE_URL)

    })

    test('Should contain the x-token in the header of all request', async () => {
        const token = 'jdjasvdjc'

        localStorage.setItem('token', token)

        const response = await caledarApi.get('/auth')
        expect(response.config.headers['x-token']).toBe(token)

    })

})