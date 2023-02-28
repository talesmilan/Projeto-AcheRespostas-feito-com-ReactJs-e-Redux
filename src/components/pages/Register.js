import {Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button} from 'reactstrap'

const Register = () => {
    return (
        <div className="container mt-5">
            <Card className='offset-1 col-10'>
                <CardHeader><h3>Cadastrar</h3></CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup className='row mx-5'>
                            <div className='col-12'><Label for="name">Nome Completo</Label></div>
                            <div className='col-12'><Input type="text" id="name" placeholder="Digite seu nome completo" /></div>
                        </FormGroup>
                        <FormGroup className='row mx-5'>
                            <div className='col-12'><Label for="email">Email</Label></div>
                            <div className='col-12'><Input type="email" id="email" placeholder="exemplo@gmail.com"/></div>
                        </FormGroup>
                        <FormGroup className='row mx-5'>
                            <div className='col-12'><Label for="username">Nome de Usuário</Label></div>
                            <div className='col-12'><Input type="text" id="username" placeholder="Crie um nome de usuário"/></div>
                        </FormGroup>
                        <FormGroup className='row mx-5'>
                            <div className='col-12'><Label for="password">Senha</Label></div>
                            <div className='col-12'><Input type="password" id="password" placeholder="Crie uma senha de no minímo 6 digítos"/></div>
                        </FormGroup>
                        <FormGroup className='row mx-5'>
                            <div className='col-12'><Label for="checkPassword">Confirmar Senha</Label></div>
                            <div className='col-12'><Input type="password" id="checkPassword" placeholder="Digite novamente sua senha"/></div>
                        </FormGroup>
                        <Button className='bg-primary registerButton col-2 my-2' type="submit">Cadastrar</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Register