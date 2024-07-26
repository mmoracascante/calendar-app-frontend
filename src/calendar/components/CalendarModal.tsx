import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { addHours, differenceInSeconds } from 'date-fns';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { useCalendarStore, useUiStore } from '../../hooks';
import { getEnvVariables } from '../../helpers';
registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

if (getEnvVariables().VITE_MODE !== 'test') {

    Modal.setAppElement('#root');

}

export const CalendarModal = () => {

    const [formSubimitted, setFormSubmitted] = useState(false)

    const { isDateModalOpen, closeDateModal } = useUiStore()
    const { activeEvent, startSavingEvent, setActiveEvent } = useCalendarStore()


    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    })



    const { end, notes, start, title } = formValues

    const titledClass = useMemo(() => {
        if (!formSubimitted) return ''
        return (title.length > 0)
            ? ''
            : 'is-invalid'

    }, [title, formSubimitted])


    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent })
        }


    }, [activeEvent])


    const onInputChange = ({ target }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        })

    }




    const onDateChange = (event: Date, changing: string) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }


    const onCloseModal = () => {
        setActiveEvent(null)
        closeDateModal()

    }


    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setFormSubmitted(true)
        const diferences = differenceInSeconds(end, start)
        if (isNaN(diferences) || diferences <= 0) {
            Swal.fire('Fechas  incorrectas', 'Revisar las fechas ingresadas', 'error')
            return
        }
        if (title.length <= 0) return
        await startSavingEvent(formValues)
        closeDateModal()
        setFormSubmitted(false)

    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1>Nuevo evento</h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2 d-flex flex-column">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        locale='es'
                        selected={start}
                        onChange={(event: Date) => onDateChange(event, 'start')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        timeCaption='Hora'

                    />
                </div>

                <div className="form-group mb-2 d-flex flex-column">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        locale='es'
                        minDate={start}
                        selected={end}
                        onChange={(event: Date) => onDateChange(event, 'end')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titledClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        className="form-control"
                        placeholder="Notas"
                        rows={5}
                        name="notes"
                        value={notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal >
    )
}
