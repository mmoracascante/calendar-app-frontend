
import { AppRouter } from '../../src/router/AppRouter';
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { CalendarPage } from '../../src/calendar';


jest.mock('../../src/hooks/useAuthStore')
jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))




describe('Testing <AppRouter />', () => {

    const mockCheckAuthToken = jest.fn()
    beforeEach(() => jest.clearAllMocks())

    test('Should show the loading and call the fn checkAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken,
        })

        render(<AppRouter />)

        expect(screen.getByText('Cargando...')).toBeTruthy()
        expect(mockCheckAuthToken).toHaveBeenCalled()

        // screen.debug()
    })


    test('Should show the login in case is not authenticated', () => {
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken,
        })

        const { container } = render(
            <MemoryRouter>
                <AppRouter />

            </MemoryRouter>
        )

        expect(screen.getByText('Ingreso')).toBeTruthy()
        expect(container).toMatchSnapshot()
    })

    test('Should show the Calendar if is authenticated', () => {
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken,
        })

        render(
            <MemoryRouter>
                <AppRouter />

            </MemoryRouter>
        )
        expect(screen.getByText('CalendarPage')).toBeTruthy()
        // expect(screen.getByText('Ingreso')).toBeTruthy()
        // expect(container).toMatchSnapshot()
    })



})