import { Provider } from 'react-redux';
import { useUiStore } from '../../src/hooks/useUiStore';
import { act, renderHook } from '@testing-library/react'
import { store, uiSlice } from '../../src/store';
import { configureStore, current } from '@reduxjs/toolkit';



const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}


describe('Testing useUiStore', () => {

    test('Should return default values', () => {

        const mockStore = getMockStore({ isDateModalOpen: false })


        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
        })

    })

    test('Should return isDateModalOpen: true', () => {

        const mockStore = getMockStore({ isDateModalOpen: false })


        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { openDateModal } = result.current

        act(() => openDateModal())

        expect(result.current.isDateModalOpen).toBeTruthy()

    })

    test('Should return isDateModalOpen: false', () => {

        const mockStore = getMockStore({ isDateModalOpen: true })


        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { closeDateModal } = result.current

        act(() => closeDateModal())

        expect(result.current.isDateModalOpen).toBeFalsy()

    })
})