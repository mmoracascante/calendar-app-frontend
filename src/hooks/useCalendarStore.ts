import { useDispatch, useSelector } from "react-redux"
import { RootState, onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvent } from "../store"
import { caledarApi } from "../api"
import { convertEventsToDate } from "../helpers"
import Swal from "sweetalert2"


export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector((state: RootState) => state.calendar)
    const { user } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    const setActiveEvent = (calendarEvent: any) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent: any) => {

        try {
            if (calendarEvent.id) {

                await caledarApi.put(`/events/${calendarEvent.id}`, calendarEvent)

                dispatch(onUpdateEvent({ ...calendarEvent, user }))
                return
            }


            const { data } = await caledarApi.post('/events', calendarEvent)

            dispatch(onAddNewEvent({
                ...calendarEvent,
                id: data.event.id,
                user
            }))


        } catch (error: any) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg, 'error')

        }

    }

    const startDeletingEvent = async () => {
        try {
            if (!!activeEvent) {
                await caledarApi.delete(`/events/${activeEvent.id}`)
                dispatch(onDeleteEvent())
            }


        } catch (error: any) {
            console.log(error)

            Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        }

    }


    const startLoadingEvents = async () => {
        try {

            const { data } = await caledarApi.get('/events')
            const events = convertEventsToDate(data.eventos)
            dispatch(onLoadEvent(events))

        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)

        }
    }


    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}
