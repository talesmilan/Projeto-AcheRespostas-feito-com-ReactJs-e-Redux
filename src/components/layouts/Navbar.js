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

function NavBar(args) {

  const [data, setData] = useState({
    username: "",
    password: "",
    remember: false
  })

  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()

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
        alert("Deu certo!")
        if(response.data.token != undefined) {
          dispatch(addUser(response.data.token))
          localStorage.setItem('user', response.data.token)
          modalLogin()
        }
      }).catch(err => {
        alert("Deu errado!")
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
                <DropdownItem>Informática</DropdownItem>
                <DropdownItem>Culinária</DropdownItem>
                <DropdownItem>Carreiras</DropdownItem>
                <DropdownItem>Relacionamentos</DropdownItem>
                <DropdownItem>Carros e Motos</DropdownItem>
                <DropdownItem>Animais de Estimação</DropdownItem>
                <DropdownItem>Bem Estar</DropdownItem>
                <DropdownItem>Ciência</DropdownItem>
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