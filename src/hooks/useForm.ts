import { useState, ChangeEvent, useEffect, useMemo } from "react"


type ValidationRule = [(value: string) => boolean, string];
type FormValidationState = Record<string, ValidationRule>;


type UseFormCustomReturn<T> = T & {
    formState: T;
    handleOnChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
    isFormValid: boolean
    handleReset: () => void;
} & FormValidationState;


export const useForm = <T extends Record<string, any>>(initialForm: T, formValidations?: any): UseFormCustomReturn<T> => {

    const [formState, setFormState] = useState(initialForm)
    const [formValidation, setFormValidation] = useState<FormValidationState>({})

    useEffect(() => {
        if (formValidations === null || formValidations === undefined) return
        createValidators()
    }, [formState])

    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm])


    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false
        }
        return true
    }, [formValidation])


    const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target;

        setFormState({
            ...formState,
            [name]: value,
        })
    }

    const handleReset = () => {
        setFormState(initialForm)
    }



    const createValidators = () => {
        const formCheckValues: FormValidationState = {}
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField]
            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
        }
        setFormValidation(formCheckValues)
    }




    return {
        ...formState,
        formState,
        handleOnChange,
        handleReset,
        ...formValidation,
        isFormValid,
    }

}