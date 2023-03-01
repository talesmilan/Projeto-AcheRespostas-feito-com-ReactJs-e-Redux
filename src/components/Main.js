import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from './layouts/Navbar'
import Jumbotron from "./layouts/Jumbotron"
import ToAsk from "./pages/ToAsk"
import Footer from "./layouts/Footer"
import Register from "./pages/Register"
import Contact from "./pages/Contact"
import About from "./pages/About"

const Main = () => {
    document.body.style = 'background: #ECEFF1;';
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
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default Main