import {Input, Form, Label, FormGroup, Card, CardHeader, CardBody, Button} from 'reactstrap'
import { useState } from 'react'
import ErrorMessages from '../layouts/ErrorMessages'
import axios from 'axios'
import { baseUrl } from '../../shared/baseUrl'
import { useSelector } from 'react-redux'

const ToAsk = () => {

    const [data, setData] = useState({
        title: "",
        body: "",
        topics: ""
      })

    const [errors, setErrors] = useState([])

    const {token} = useSelector(rootReducer => rootReducer.loginReducer)

    const handleToAsk = (e) => {
        e.preventDefault()

        const err = []

        if(data.title === "" || data.body === "" || data.topics === "") {
            err.push("Você deve preencher todos os campos.")
        }
        setErrors(err)
        if (err.length === 0) {
            const newQuestion = {
                title: data.title,
                topics: data.topics,
                body: data.body
            }
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            axios.post(baseUrl + "questions", newQuestion, config).then(response => {
                alert("Sua pergunta foi postada com sucesso.")
            }).catch(err => {
                if(err.response.data.err != undefined) {
                    const error = []
                    error.push(err.response.data.err)
                    setErrors(error)
                    window.scrollTo(0, 140)
                }
            })
        } else {
            window.scrollTo(0, 140)
        }
    }

    const handleOnChange = (e) => {
        const name = e.target.name
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        setData({...data, [name]: value})
    }
    return (
        <div className='container'>
            <ErrorMessages errors={errors} />
            <Card className='mt-5'>
                <CardHeader><h3>Faça sua pergunta</h3></CardHeader>
                <CardBody>
                    <Form onSubmit={handleToAsk}>
                        <FormGroup className='row m-lg-5 m-0'>
                            <div className='col-lg-1 col-12'>
                                <Label className='lead' for="title">Título:</Label>
                            </div>
                            <div className='col-10'>
                                <Input type="text" id="title" name="title" onChange={handleOnChange} value={data.title} required></Input>
                            </div>
                        </FormGroup>
                        <FormGroup className='row m-lg-5 m-0'>
                            <div className='col-lg-1 col-12'><Label className='lead' for="topics">Tópicos:</Label></div>
                            <div className='col-10'>
                                <Input type="select" id="topics" name="topics" onChange={handleOnChange} value={data.topics} required>
                                    <option value="" selected disabled>Selecione um tópico para sua pergunta</option>
                                    <option>Informática</option>
                                    <option>Culinária</option>
                                    <option>Carreiras</option>
                                    <option>Relacionamentos</option>
                                    <option>Carros e Motos</option>
                                    <option>Animais de Estimação</option>
                                    <option>Bem Estar</option>
                                    <option>Ciência</option>
                                </Input>
                            </div>
                        </FormGroup>
                        <FormGroup className='row m-lg-5 m-0'>
                            <div className='col-lg-1 col-12'>
                                <Label className='lead' for="body">Detalhes:</Label>
                            </div>
                            <div className='col-10'>
                                <Input type="textarea" rows="10" id="body" name="body" onChange={handleOnChange} value={data.body} required></Input>
                            </div>
                        </FormGroup>
                        <Button className='buttonToAsk bg-primary col-3 my-1 mx-0' type="submit">Enviar</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default ToAsk