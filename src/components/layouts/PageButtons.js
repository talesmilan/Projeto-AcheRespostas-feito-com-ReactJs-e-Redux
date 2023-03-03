import { Button } from "reactstrap"
import { useNavigate } from "react-router-dom"

const PageButtons = ({page, totalPage, topic}) => {

    const navigate = useNavigate()

    const next = () => {
        if(page < totalPage) {
            navigate(`/topics/${topic}/${Number(page) + 1}`)
        }
    }
    const previous = () => {
        if(page > 1) {
            navigate(`/topics/${topic}/${Number(page) - 1}`)
        }
    }

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-sm-2 col-4">
                    {page <= 1 ? (<Button className="bg-primary col-12" disabled>Voltar</Button>) : (<Button className="bg-primary col-12" onClick={previous}>Voltar</Button>)}
                </div>
                <div className="col-sm-8 col-3"></div>
                <div className="col-sm-2 col-4">
                    {page >= totalPage ? (<Button className="bg-primary col-12" disabled >Avançar</Button>) : (<Button className="bg-primary col-12" onClick={next}>Avançar</Button>)}
                </div>
            </div>
        </div>)
}

export default PageButtons