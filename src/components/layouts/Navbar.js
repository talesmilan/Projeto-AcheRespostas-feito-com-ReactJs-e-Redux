import React, { useState } from 'react';
import {
  Collapse,
  NavbarToggler,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  FormGroup,
  Label,
  Button,
  Form
} from 'reactstrap';
import {NavLink} from 'react-router-dom'
import ErrorMessages from './ErrorMessages';
import axios from 'axios'
import { baseUrl } from '../../shared/baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../../redux/login';
import { useNavigate } from "react-router-dom"
import { addMessage } from "../../redux/messageSuccess"

function NavBar(args) {

  const [data, setData] = useState({
    username: "",
    password: "",
    remember: false
  })

  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {token} = useSelector(rootReducer => rootReducer.loginReducer)

  const handleOnChange = (e) => {
    const name = e.target.name
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    setData({...data, [name]: value})
}

  const [isOpen, setIsOpen] = useState(false);

  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen);

  const modalLogin = () => {
    setIsModalLoginOpen(!isModalLoginOpen)  
  }

  const logoutClicked = () => {
    dispatch(removeUser())
    localStorage.setItem('user', "")
  }

  const handleLogin = (e) => {
    e.preventDefault()

    const err = []

    if(data.username === "" || data.password === "") {
        err.push("Você deve preencher todos os campos.")
    }
    setErrors(err)
    if (err.length === 0) {
      const login = {
        username: data.username,
        password: data.password,
        remember: data.remember
      }
      axios.post(baseUrl + "login", login).then(response => {
        navigate("/")
        dispatch(addMessage("O seu login foi realizado com sucesso!"))
        if(response.data.token != undefined) {
          dispatch(addUser(response.data.token))
          localStorage.setItem('user', response.data.token)
          modalLogin()
        }
      }).catch(err => {
        if(err.response.data.err != undefined) {
          const error = []
          error.push(err.response.data.err)
          setErrors(error)
      }
      })
    }
  }

  return (
    <div>
      <Navbar {...args} expand="md" color="primary" dark={true}>
        <NavbarBrand href="/">AcheRespostas</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/">Página Inicial</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Tópicos
              </DropdownToggle>
              <DropdownMenu>
                <NavLink className="nav-link m-0 p-0" to="/topics/informatica/1">
                  <DropdownItem>Informática</DropdownItem>
                </NavLink>
                <NavLink className="nav-link m-0 p-0" to="/topics/culinaria/1">
                  <DropdownItem>Culinária</DropdownItem>
                </NavLink>
                <NavLink className="nav-link m-0 p-0" to="/topics/carreiras/1">
                  <DropdownItem>Carreiras</DropdownItem>
                </NavLink>
                <NavLink className="nav-link m-0 p-0" to="/topics/relacionamentos/1">
                  <DropdownItem>Relacionamentos</DropdownItem>
                </NavLink>
                <NavLink className="nav-link m-0 p-0" to="/topics/carros%20e%20motos/1">
                  <DropdownItem>Carros e Motos</DropdownItem>
                </NavLink>
                <NavLink className="nav-link m-0 p-0" to="/topics/animais%20de%20estimacao/1">
                  <DropdownItem>Animais de Estimação</DropdownItem>
                </NavLink>
                <NavLink className="nav-link m-0 p-0" to="/topics/bem%20estar/1">
                  <DropdownItem>Bem Estar</DropdownItem>
                </NavLink>
                <NavLink className="nav-link m-0 p-0" to="/topics/ciencia/1">
                  <DropdownItem>Ciência</DropdownItem>
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink className="nav-link" to="/toask">Perguntar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/contact">Contato</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/about">Sobre</NavLink>
            </NavItem>
          </Nav>

          <Nav className="my-auto" navbar>
            {token === "" && (
              <NavItem>
                <NavLink className="nav-link" to="/register">Cadastrar</NavLink>
              </NavItem>
            )}
            {token === "" ? (
              <NavItem>
                <a className="nav-link loginButton" onClick={modalLogin}>Login</a>
              </NavItem>
            ) : (
              <NavItem>
              <a className="nav-link loginButton" onClick={logoutClicked}>Sair</a>
              </NavItem>
            )}
          </Nav>

        </Collapse>
      </Navbar>

      <Modal isOpen={isModalLoginOpen} toggle={modalLogin} >
        <ModalHeader toggle={modalLogin}>Login</ModalHeader>
          <ModalBody>
            <ErrorMessages errors={errors} />
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Nome do usuário</Label>
                <Input type="text" id="username" name="username" onChange={handleOnChange} value={data.username} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Senha</Label>
                <Input type="password" id="password" name="password" onChange={handleOnChange} value={data.password} required/>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input className='mx-2' type="checkbox" onChange={handleOnChange} name="remember" checked={data.remember} />
                    Se lembrar de mim?
                </Label>
              </FormGroup>
              <Button className='mt-2' type="submit" value="submit" color='primary'>Login</Button>
            </Form>
          </ModalBody>
        </Modal>

    </div>
  );
}

export default NavBar;