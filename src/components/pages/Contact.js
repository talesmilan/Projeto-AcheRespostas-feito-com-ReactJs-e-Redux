import { FormGroup, Form, Label, Input, Button, Card, CardBody, CardHeader } from "reactstrap"
import { useState } from "react"
import validator from 'validator'
import ErrorMessages from "../layouts/ErrorMessages"
import { baseUrl } from '../../shared/baseUrl'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addMessage } from "../../redux/messageSuccess"

const Contact = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        reason: "",
        message: ""
      })

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [errors, setErrors] = useState([])

    const handleContact = (e) => {
        e.preventDefault()
        const err = []

        if(data.name === "" || data.email === "" || data.reason === "" || data.message === "") {
            err.push("Você deve preencher todos os campos.")
        }
        if(data.name !== "" && (data.name.length < 3 || data.name.length > 50)) {
            err.push("O nome deve ter entre 3 a 50 caracteres.")
        }
        const emailIsValid = validator.isEmail(data.email)
        if (data.email !== "" && (!emailIsValid)) {
            err.push("O email não é válido.")
        }

        setErrors(err)
        if (err.length === 0) {

            const newMessage = {
                name: data.name,
                email: data.email,
                reason: data.reason,
                message: data.message
            }

            axios.post(baseUrl + "message", newMessage).then(response => {
                navigate("/")
                dispatch(addMessage("A sua mensagem foi enviada com sucesso!"))
                window.scrollTo(0, 140)
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
        <div className="container offset-sm-2 col-sm-8 col-12">
            <ErrorMessages errors={errors} />
            <Card className="mt-5">
                <CardHeader><h3>Entre em contato com a gente</h3></CardHeader>
                <CardBody>
                    <Form onSubmit={handleContact}>
                        <FormGroup>
                            <Label for="name">Nome Completo</Label>
                            <Input type="text" name="name" id="name" placeholder="Digite seu nome completo" onChange={handleOnChange} value={data.name} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Digite seu email"
                                    onChange={handleOnChange} value={data.email} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="reason">Motivo da Mensagem</Label>
                            <Input type="select" name="reason" id="reason" onChange={handleOnChange} value={data.reason} required>
                                <option value="" selected disabled>Selecione uma opção</option>
                                <option>Sugestão</option>
                                <option>Reclamação</option>
                                <option>Dúvida</option>
                                <option>Elogio</option>
                                <option>Outros</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="menssage">Mensagem</Label>
                            <Input type="textarea" name="message" id="message" placeholder="Digite sua mensagem" rows="10" onChange={handleOnChange} value={data.message} required />
                        </FormGroup>
                        <Button className="bg-primary" type="submit">Enviar Mensagem</Button>
                    </Form>
                </CardBody>
            </Card>  
        </div>
    )
}

export default Contact