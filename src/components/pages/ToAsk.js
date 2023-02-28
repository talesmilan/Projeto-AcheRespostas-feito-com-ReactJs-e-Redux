import {Input, Form, Label, FormGroup, Card, CardHeader, CardBody} from 'reactstrap'

const ToAsk = () => {
    return (
        <div className='container mt-5'>
            <Card>
                <CardHeader><h3>Faça sua pergunta</h3></CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup className='row m-5'>
                            <div className='col-1'>
                                <Label className='lead' for="titleAsk">Título:</Label>
                            </div>
                            <div className='col-10'>
                                <Input type="text" id="titleAsk"></Input>
                            </div>
                        </FormGroup>
                        <FormGroup className='row m-5'>
                            <div className='col-1'><Label className='lead' for="topics">Tópicos:</Label></div>
                            <div className='col-10'>
                                <Input type="select" id="topics">
                                    <option value="" selected disabled>Selecione um tópico para sua pergunta</option>
                                    <option>Informática</option>
                                    <option>Culinária</option>
                                    <option>Carreiras</option>
                                    <option>Relacionamentos</option>
                                    <option>Carros e Motos</option>
                                    <option>Animais de Estimação</option>
                                </Input>
                            </div>
                        </FormGroup>
                        <FormGroup className='row m-5'>
                            <div className='col-1'>
                                <Label className='lead' for="bodyAsk">Detalhes:</Label>
                            </div>
                            <div className='col-10'>
                                <Input type="textarea" rows="10" id="bodyAsk"></Input>
                            </div>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default ToAsk