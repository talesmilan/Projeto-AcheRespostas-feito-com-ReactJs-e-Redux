
const ErrorMessages = ({errors}) => {
    if (errors.length === 0) {
        return (<div></div>)
    } else {
        return (
            <div className="alert alert-danger" role="alert">
                {errors.map(error => {return (<p key={error} className="m-0 p-0">{error}</p>)})}
            </div>)
    }
}

export default ErrorMessages