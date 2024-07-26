import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../../src/store/ui/uiSlice';
describe('Testing uiSlice', () => {

    test('Should return the default values', () => {
        // console.log(uiSlice.getInitialState())

        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy()

    })

    test('Should change isDateModalOpen correctly', () => {
        let state = uiSlice.getInitialState()
        state = uiSlice.reducer(state, onOpenDateModal())
        expect(state.isDateModalOpen).toBeTruthy()

        state = uiSlice.reducer(state, onCloseDateModal())
        expect(state.isDateModalOpen).toBeFalsy()
    })

})