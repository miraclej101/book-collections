import About from "../components/About"
import Header from "../components/Header"
import booksImage from "../assets/books-3446451_1280.jpg";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <div >
            <Navbar />
            <Header image={booksImage} color={null} height={"40vh"} title={"Welcome to personal book collection management"}  />
            <About />
        </div>
    )
}