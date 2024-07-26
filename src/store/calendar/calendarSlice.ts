import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { EventTypes } from '../../types/CalendarPageTypes/CaledarPageTypes';


interface InitialState {
    isLoadingEvents: boolean
    events: EventTypes[],
    activeEvent: EventTypes | null
}


const initialState: InitialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: (state, { payload }: PayloadAction<any>) => {
            state.activeEvent = payload


        },
        onAddNewEvent: (state, { payload }: PayloadAction<any>) => {
            state.events.push(payload)
            state.activeEvent = null
        },
        onUpdateEvent: (state, { payload }: PayloadAction<any>) => {
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload
                }
                return event
            })
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id !== state.activeEvent?.id)
                state.activeEvent = null

            }

        },
        onLoadEvent: (state, { payload = [] }: PayloadAction<any>) => {
            state.isLoadingEvents = false
            // state.events = payload
            payload.forEach((event: any) => {
                const exists = state.events.some((dbEvent: any) => dbEvent.id === event.id)
                if (!exists) {
                    state.events.push(event)
                }
            });

        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true
            state.events = []
            state.activeEvent = null
        }
    }
});
// Action creators are generated for each case reducer function
export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvent,
    onLogoutCalendar
} = calendarSlice.actions;