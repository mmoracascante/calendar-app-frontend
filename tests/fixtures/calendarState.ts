
export const events = [
    {
        id: '1',
        start: new Date('2024-03-27 21:00:00'),
        end: new Date('2024-03-27 23:00:00'),
        title: 'Cumpleaños de Marco',
        notes: 'Alguna nota',
    },
    {
        id: '2',
        start: new Date('2024-03-30 21:00:00'),
        end: new Date('2024-03-30 23:00:00'),
        title: 'Cumpleaños de Melissa',
        notes: 'Alguna nota de Melissa',
    }
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] }
}
