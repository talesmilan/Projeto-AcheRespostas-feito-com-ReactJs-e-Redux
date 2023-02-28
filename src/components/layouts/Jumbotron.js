import {NavLink} from 'react-router-dom'

const Jumbotron = () => {
    return (
    <div className="jumbotron text-center text-white">
        <h1 class="display-4 mx-5 py-3">AcheRespostas</h1>
        <p style={{fontSize:"20px"}} class="lead mx-5">Conheça a plataforma que permite que os usuários façam perguntas sobre qualquer assunto e obtenham respostas de outros usuários da comunidade. Procure respostas sobre as suas dúvidas nas várias perguntas do site, se não encontrar, então faça sua própria pergunta.</p>
        <p class="lead">
        <NavLink to="/toask" role="button"><span className="mx-5 m-4 btn btn-primary btn-lg">Perguntar</span></NavLink>
        </p>
    </div>
    )
}

export default Jumbotron