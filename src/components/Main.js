import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from './layouts/Navbar'
import Jumbotron from "./layouts/Jumbotron"
import ToAsk from "./pages/ToAsk"
import Footer from "./layouts/Footer"
import Register from "./pages/Register"
import Contact from "./pages/Contact"
import About from "./pages/About"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../redux/login"
import axios from 'axios'
import { baseUrl } from "../shared/baseUrl"
import Question from "./pages/Question"

const Main = () => {
    document.body.style = 'background: #ECEFF1;'

    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem("user")
        if(token != undefined) {
            if(token !== "") {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                axios.get(baseUrl + "authorization", config).then(response => {
                    console.log("Você está logado!")
                    dispatch(addUser(token))
                }).catch(err => console.log(err))
            }
        }


    }, [])


    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Jumbotron />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/toask" element={<ToAsk />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/question/:id" element={<Question />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default Main