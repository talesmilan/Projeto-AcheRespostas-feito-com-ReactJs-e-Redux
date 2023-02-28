import { FormGroup, Form, Label, Input, Button, Card, CardBody, CardHeader } from "reactstrap"
import { useState } from "react"

const Contact = () => {

    const [dados, setDados] = useState({
        name: "",
        email: "",
        reason: "",
        message: ""
      })
    
    const handleContact = (e) => {
        e.preventDefault()
    }

    const handleOnChange = (e) => {
    
        const name = e.target.name
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        setDados({...dados, [name]: value})
    }


    return (
        <div className="container offset-2 col-8 mt-5">
            <Card>
                <CardHeader><h3>Entre em contato com a gente</h3></CardHeader>
                <CardBody>
                    <Form onSubmit={handleContact}>
                        <FormGroup>
                            <Label for="name">Nome Completo</Label>
                            <Input type="text" name="name" id="name" placeholder="Digite seu nome completo"
                                    onChange={handleOnChange} value={dados.name} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Digite seu email"
                                    onChange={handleOnChange} value={dados.email} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="reason">Motivo da Mensagem</Label>
                            <Input type="select" name="reason" id="reason" onChange={handleOnChange} value={dados.reason} required>
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
                            <Input type="textarea" name="message" id="message" placeholder="Digite sua mensagem" rows="10" onChange={handleOnChange} value={dados.message} required />
                        </FormGroup>
                        <Button className="bg-primary" type="submit">Enviar Mensagem</Button>
                    </Form>
                </CardBody>
            </Card>  
        </div>
    )
}

export default Contact