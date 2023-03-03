import { useEffect, useState } from "react"
import axios from 'axios'
import { baseUrl } from "../../shared/baseUrl"
import {Card, CardBody, CardHeader} from 'reactstrap'
import { NavLink } from "react-router-dom"
import SuccessMessages from '../layouts/SuccessMessages'

const Home = () => {

    const [questions, setQuestions] = useState({rows: []})

    useEffect(() => {
        axios.get(baseUrl + 'questions').then(response => {
            setQuestions(response.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            <h1 className="mx-5">Destaques</h1>
            <div className="container">
                <SuccessMessages time={10000} />
                {questions.rows.map(question => {
                    return (
                        <Card className="m-5">
                            <NavLink to={`/question/${question.id}`}>
                                <CardHeader><h3>{question.title}</h3></CardHeader>
                            </NavLink>
                            <CardBody>
                                <p>Tópico: {question.topics} -- Enviado por: {question.username}</p>
                                <hr/>
                                <p>{question.body.length > 350 ? question.body.substring(0, 350).concat('...') : question.body}</p>
                                <NavLink to={`/question/${question.id}`}>Leia Mais</NavLink>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>

        </div>
    )
}

export default Home