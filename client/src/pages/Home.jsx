import About from "../components/About"
import Header from "../components/Header"
import booksImage from "../assets/books-3446451_1280.jpg";

export default function Home() {
    return (
        <div >
            <Header image={booksImage} color={null} height={"40vh"} title={"Welcome to personal book collection management"}  />
            <About />
        </div>
    )
}