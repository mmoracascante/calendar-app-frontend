import { CalendarEventBoxTypes } from "../../types"

interface Props {
    event: CalendarEventBoxTypes
}


export const CalendarEventBox = ({ event }: Props) => {
    const { title, user } = event
    return (
        <>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </>
    )
}
