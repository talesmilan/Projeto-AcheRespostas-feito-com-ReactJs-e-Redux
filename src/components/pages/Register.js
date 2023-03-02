import {Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { useState } from 'react'
import ErrorMessages from '../layouts/ErrorMessages'
import validator from 'validator'
import { baseUrl } from '../../shared/baseUrl'
import axios from 'axios'

const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        checkPassword: ""
      })

    const [errors, setErrors] = useState([])
    
    const handleRegister = (e) => {
        e.preventDefault()
        const err = []

        if(data.name === "" || data.email === "" || data.username === "" || data.password === "") {
            err.push("Você deve preencher todos os campos.")
        }
        if(data.name !== "" && (data.name.length < 3 || data.name.length > 50)) {
            err.push("O nome deve ter entre 3 a 50 caracteres.")
        }
        if(data.username !== "" && (data.username.length < 3 || data.username.length > 30)) {
            err.push("O nome de usuário deve ter entre 3 a 30 caracteres.")
        }
        if(data.password !== "" && (data.password.length < 6 || data.password.length > 50)) {
            err.push("A senha deve ter entre 6 a 50 digítos.")
        }
        if(data.password !== "" && data.password !== data.checkPassword) {
            err.push("Você digitou uma senha diferente no campo de confirmar senha.")
        }
        const emailIsValid = validator.isEmail(data.email)
        if (data.email !== "" && (!emailIsValid)) {
            err.push("O email não é válido.")
        }

        setErrors(err)
        if (err.length === 0) {
            const newRegister = {
                name: data.name,
                email: data.email,
                password: data.password,
                username: data.username,
                checkPassword: data.checkPassword
            }
            axios.post(baseUrl + 'register', newRegister).then((response) => {
                alert("Seu cadastro foi realizado!")
            }).catch(err => {
                alert("O seu cadastro não pode ser realizado.")
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
        <div className="container">
            <ErrorMessages errors={errors} />
            <Card className='offset-1 col-10 mt-5'>
                <CardHeader><h3>Cadastrar</h3></CardHeader>
                <CardBody>
                    <Form onSubmit={handleRegister}>
                        <FormGroup className='row mx-sm-5 mx-0'>
                            <div className='col-12'><Label for="name">Nome Completo</Label></div>
                            <div className='col-12'><Input type="text" id="name" name="name" placeholder="Digite seu nome completo" onChange={handleOnChange} value={data.name} required /></div>
                        </FormGroup>
                        <FormGroup className='row mx-sm-5 mx-0'>
                            <div className='col-12'><Label for="email">Email</Label></div>
                            <div className='col-12'><Input type="email" id="email" name="email" placeholder="exemplo@gmail.com" onChange={handleOnChange} value={data.email} required/></div>
                        </FormGroup>
                        <FormGroup className='row mx-sm-5 mx-0'>
                            <div className='col-12'><Label for="username">Nome de Usuário</Label></div>
                            <div className='col-12'><Input type="text" name="username" id="username" placeholder="Crie um nome de usuário" onChange={handleOnChange} value={data.username} required/></div>
                        </FormGroup>
                        <FormGroup className='row mx-sm-5 mx-0'>
                            <div className='col-12'><Label for="password">Senha</Label></div>
                            <div className='col-12'><Input type="password" id="password" name="password" placeholder="Crie uma senha de no minímo 6 digítos" onChange={handleOnChange} value={data.password} required/></div>
                        </FormGroup>
                        <FormGroup className='row mx-sm-5 mx-0'>
                            <div className='col-12'><Label for="checkPassword">Confirmar Senha</Label></div>
                            <div className='col-12'><Input type="password" id="checkPassword" name="checkPassword" placeholder="Digite novamente sua senha" onChange={handleOnChange} value={data.checkPassword} required/></div>
                        </FormGroup>
                        <Button className='bg-primary registerButton col-lg-2 col-sm-3 col-5 my-2' type="submit">Cadastrar</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Register