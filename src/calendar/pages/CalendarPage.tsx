import { Calendar, EventPropGetter } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEventBox, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { localizer, getMessagesEs } from '../../helpers'
import { useEffect, useState } from 'react'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'




export const CalendarPage = () => {
    const { user } = useAuthStore()

    const { openDateModal } = useUiStore()
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()


    const [lastView, setLastView] = useState<any>(localStorage.getItem('lastView') || 'week')




    const eventStyleGetter: EventPropGetter<any> = (event) => {
        const isMyEvent = ('uid' in user) && (user.uid === event.user.id) || ('uid' in user) && (user.uid === event.user.uid)


        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }

    }


    const onDoubleClick = () => {
        openDateModal()
    }

    const onSelect = (event: any) => {
        setActiveEvent(event)

    }

    const onChangeView = (event: any) => {
        localStorage.setItem('lastView', event)
        setLastView(event)
    }


    useEffect(() => {
        startLoadingEvents()
    }, [])




    return (
        <>
            <Navbar />

            <Calendar
                defaultView={lastView}
                culture='es'
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
                components={{
                    // @ts-ignore
                    event: CalendarEventBox
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onChangeView}
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>


    )
}
