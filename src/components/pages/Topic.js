import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../shared/baseUrl'
import { Card, CardBody, CardHeader } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import PageButtons from '../layouts/PageButtons'

const Topic = () => {

    const [questions, setQuestions] = useState({rows: []})

    const params = useParams()
    useEffect(() => {
        axios.get(baseUrl + `questions/${params.topic}?page=${params.page}`).then(response => {
            setQuestions(response.data)
        }).catch(err => {
            console.log(err)
        })
    }, [params.topic, params.page])

    return (
        <div>
            <h1 className="mx-5">{questions.rows.length > 0 && questions.rows[0].topics}</h1>
            <div className='container'>
                {questions.rows.map(question => {
                    return (
                    <Card key={question.id} className="m-sm-5 my-5">
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
                }) }
                <PageButtons page={params.page} topic={params.topic} totalPage={Math.ceil(questions.count / 5)} />
            </div>
        </div>
    )
}

export default Topic