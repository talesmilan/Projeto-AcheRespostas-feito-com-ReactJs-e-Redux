
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

function Example(args) {
  const [isOpen, setIsOpen] = useState(false);

  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen);

  const modalLogin = () => {
    setIsModalLoginOpen(!isModalLoginOpen)  
  }

  const handleLogin = (e) => {
    e.preventDefault()
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
              <DropdownMenu right>
                <DropdownItem>Informática</DropdownItem>
                <DropdownItem>Culinária</DropdownItem>
                <DropdownItem>Carreiras</DropdownItem>
                <DropdownItem>Relacionamentos</DropdownItem>
                <DropdownItem>Carros e Motos</DropdownItem>
                <DropdownItem>Animais de Estimação</DropdownItem>
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
            <NavItem>
              <NavLink className="nav-link active" to="/register">Cadastrar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" onClick={modalLogin}>Login</NavLink>
            </NavItem>
          </Nav>

        </Collapse>
      </Navbar>

      <Modal isOpen={isModalLoginOpen} toggle={modalLogin} >
        <ModalHeader toggle={modalLogin}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Nome do usuário</Label>
                <Input type="text" id="username" name="username" required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Senha</Label>
                <Input type="password" id="password" name="password" required/>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input className='mx-2' type="checkbox" />
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

export default Example;