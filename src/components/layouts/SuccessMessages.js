import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addMessage } from "../../redux/messageSuccess"

const FlashMessage = ({time}) => {

    const dispatch = useDispatch()

    const {message} = useSelector(rootReducer => rootReducer.messageSuccessReducer)

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(addMessage(""))
          }, time);
          return () => clearTimeout(id);
    }, [message])

        return (
            <div>
                { message != "" && (<div className="alert alert-success mt-4">{message}</div>)}
            </div>
        )
}

export default FlashMessage