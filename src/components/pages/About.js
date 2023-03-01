
import { Card, CardBody, CardHeader } from "reactstrap"

const About = () => {
    return (
        <div>
            <h1 className="mx-5">Sobre Nós</h1>
            <div className="row">
                <div className="offset-1 col-10 col-md-5 mt-5 sobreTexto text-center">
                    <p>Se você já sentiu a necessidade de esclarecer uma dúvida, buscar orientação sobre um assunto ou simplesmente queria compartilhar uma opinião, então você está no lugar certo. Inspirado no saudoso Yahoo Respostas, o AcheRespostas foi criado com o objetivo de fornecer um espaço onde você possa encontrar respostas precisas e confiáveis para todas as suas perguntas. Nossa comunidade é formada por pessoas de todo o mundo, com diferentes experiências e conhecimentos, prontas para ajudar e aprender.</p>
                    <p>No AcheRespostas, você pode encontrar uma ampla variedade de tópicos e assuntos, desde perguntas sobre tecnologia e ciência até questões sobre saúde e bem-estar. Além disso, nossa plataforma é fácil de usar e oferece recursos úteis, como a opção de classificar e filtrar as respostas por relevância e popularidade. Com o AcheRespostas, você pode se conectar com uma comunidade diversa e obter respostas úteis e confiáveis para todas as suas perguntas. Então, se você tem uma pergunta, não hesite em compartilhá-la conosco. Estamos ansiosos para ajudá-lo(a) a encontrar as respostas que procura.</p>
                </div>
                <div className="col-12 col-md-5 mt-5 sobreCartao">
                    <Card>
                        <CardHeader className="bg-primary text-white">Quadro Geral da Empresa</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Começou</dt>
                                <dd className="col-6">21 Jun. 2018</dd>
                                <dt className="col-6">Principal Acionista</dt>
                                <dd className="col-6">Task. WD Inc.</dd>
                                <dt className="col-6">Faturamento anual</dt>
                                <dd className="col-6">R$ 10.152.000,00</dd>
                                <dt className="col-6">Funcionários</dt>
                                <dd className="col-6">10.023</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default About