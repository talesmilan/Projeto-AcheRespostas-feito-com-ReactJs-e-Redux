import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'
import { baseUrl } from "../../shared/baseUrl"
import {Card, CardBody, CardHeader, Button, Input, Form} from 'reactstrap'
import ErrorMessages from "../layouts/ErrorMessages"
import { useSelector } from "react-redux"

const Question = () => {

    const params = useParams()
    const [question, setQuestion] = useState(undefined)
    const [answers, setAnswers] = useState([])
    const [errors, setErrors] = useState([])
    const {token} = useSelector(rootReducer => rootReducer.loginReducer)
    const [body, setBody] = useState("")

    const handleOnChange = (e) => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        setBody(value)
    }

    const answerSubmit = (e) => {
        e.preventDefault()
        const err = []
        if(body === "") {
            err.push("Todos os campos devem ser preenchidos.")
        }
        setErrors(err)
        if(err.length === 0) {
            const newAnswer = {
                body: body,
                questionId: params.id
            }
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            axios.post(baseUrl + "answer", newAnswer, config).then(response => {
                setAnswers([...answers, response.data])
            }).catch(err => {
                if(err.response.data.err != undefined) {
                    const error = []
                    error.push(err.response.data.err)
                    setErrors(error)
                }
            })
        }
    }

    useEffect(() => {
        axios.get(baseUrl + `question/${params.id}`).then(response => {
            setQuestion(response.data)
        }).catch(err => {
            console.log(err)
        })
        axios.get(baseUrl + `answers/${params.id}`).then(response => {
            setAnswers(response.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    if(question != undefined) {
        return (
            <div className="container">
                {console.log(params)}
                <Card className="m-sm-5 m-0 my-5">
                    <CardHeader><h3>{question.title}</h3></CardHeader>
                    <CardBody>
                        <p>Tópico: {question.topics} -- Enviado por: {question.username}</p>
                        <hr/>
                        <p>{question.body}</p>
                    </CardBody>
                </Card>
                {answers.length > 0 ? answers.map(answer => {
                    return (
                        <Card className="m-sm-5 m-0 my-5">
                            <CardHeader><h5>Resposta enviada por {answer.username}</h5></CardHeader>
                            <CardBody>
                                <p>{answer.body}</p>
                            </CardBody>
                        </Card>
                    )
                }) : (<div></div>)}
                <div className="m-sm-5 m-0"><ErrorMessages  errors={errors} /></div>
                <Card className="m-sm-5 m-0">
                    <CardHeader><h3>Dê a sua resposta:</h3></CardHeader>
                    <Form onSubmit={answerSubmit}>
                        <div className="mx-5 mt-4">
                            <Input type="textarea" rows={5} value={body} onChange={handleOnChange} placeholder="Escreva sua resposta aqui..." required></Input>
                        </div>
                        <Button type="submit" className="bg-primary btn-lg my-3 mx-5 col-sm-3 col-5">Responder</Button>                        
                    </Form>
                </Card>
            </div>
        )
    } else {
        return (<div className="m-5 p-5"></div>)
    }
}

export default Question