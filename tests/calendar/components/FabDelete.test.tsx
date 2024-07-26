import { fireEvent, render, screen } from '@testing-library/react'
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';



jest.mock('../../../src/hooks/useCalendarStore')



describe('Testing the component <FabDelete />', () => {


    const mockStartDeletingEvent = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('should show the component properly', () => {

        useCalendarStore.mockReturnValue({
            // startDeletingEvent,
            hasEventSelected: false
        })

        render(<FabDelete />)

        const btn = screen.getByLabelText('btn-delete')
        expect(btn.classList).toContain('btn')
        expect(btn.classList).toContain('btn-danger')
        expect(btn.classList).toContain('fab-danger')
        expect(btn.style.display).toBe('none')

    })

    test('should show the button is event is active', () => {

        useCalendarStore.mockReturnValue({
            // startDeletingEvent,
            hasEventSelected: true
        })

        render(<FabDelete />)

        const btn = screen.getByLabelText('btn-delete')
        // expect(btn.classList).toContain('btn')
        // expect(btn.classList).toContain('btn-danger')
        // expect(btn.classList).toContain('fab-danger')
        expect(btn.style.display).toBe('')

    })

    test('should call the fn startDeletingEvent', () => {

        useCalendarStore.mockReturnValue({
            // startDeletingEvent,
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent,
        })

        render(<FabDelete />)

        const btn = screen.getByLabelText('btn-delete')
        fireEvent.click(btn)

        expect(mockStartDeletingEvent).toHaveBeenCalled()

    })
})