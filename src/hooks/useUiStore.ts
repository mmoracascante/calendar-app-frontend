import { useDispatch, useSelector } from "react-redux"
import { RootState, onOpenDateModal, onCloseDateModal } from "../store"


export const useUiStore = () => {

    const { isDateModalOpen } = useSelector((state: RootState) => state.ui)
    const dispatch = useDispatch()


    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }



    return {
        isDateModalOpen,
        openDateModal,
        closeDateModal,

    }
}
