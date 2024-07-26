import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvent, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../../src/store/calendar/calendarSlice';
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from '../../../fixtures/calendarState';
describe('Testing calendarSlice', () => {
    test('should return the default values', () => {
        const state = calendarSlice.getInitialState()
        expect(state).toEqual(initialState)
    })

    test('onSetActive should active the event', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]))
        expect(state.activeEvent).toEqual(events[0])

    })

    test('onAddNewEvent should add the event', () => {
        const newEvent = {
            id: '3',
            start: new Date('2024-03-30 21:00:00'),
            end: new Date('2024-03-30 23:00:00'),
            title: 'Testing',
            notes: 'Alguna nota de testing',

        }

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))
        expect(state.events).toEqual([...events, newEvent])
        // console.log(state)

    })

    test('onUpdateEvent should update the event', () => {
        const newEvent = {
            id: '1',
            start: new Date('2024-03-27 21:00:00'),
            end: new Date('2024-03-27 23:00:00'),
            title: 'Cumpleaños de Marco',
            notes: 'Alguna nota actualizada',

        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(newEvent))
        expect(state.events).toContain(newEvent)
        // console.log(state)

    })

    test('onDeleteEvent should delete the active event', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent())
        expect(state.activeEvent).toBe(null)
        expect(state.events).not.toContain(events[0])

    })

    test('onLoadEvents should set the events', () => {
        const state = calendarSlice.reducer(initialState, onLoadEvent(events))

        expect(state.isLoadingEvents).toBeFalsy()
        expect(state.events).toEqual(events)
        const newState = calendarSlice.reducer(state, onLoadEvent(events))
        expect(newState.events.length).toBe(events.length)

    })

    test('onLogoutCalendar should clean the state', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar())
        expect(state).toEqual(initialState)

    })

})