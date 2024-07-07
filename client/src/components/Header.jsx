import booksImage from '../assets/books-3446451_1280.jpg';

export default function Header() {
    return (
        <header style={{
            backgroundImage: `url(${booksImage})`,
            width:'100vw',
            height:'50vh',
            backgroundRepeat: 'repeat-x',
            backgroundPositionX: 'left'           
        }}>
            <div className="p-5 text-center m-5">
                <h1 className="fw-bolder text-white">Welcome to personal book collection management</h1>
            </div>
        </header>
    )
}