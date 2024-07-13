import { useState, useEffect } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import { useAuth } from "../contexts/authentication";
import axios from "axios";
import { PlusSquare} from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CollectionPage() {
  
    const [books, setBooks] = useState([]);
    const { state } = useAuth();
    const [isAlert, setIsAlert] = useState(false);
    const [alertType, setAlertType] = useState("alert-info");
    const [resultMessage, setResultMessage] = useState("");
    const user_id = state.user? state.user.id : null
      //console.log("user id = ", user_id);

   useEffect(() => {
    console.log("state", state);    
    axios.get(`http://localhost:4000/books/${user_id}`).then(response => {
        setBooks(response.data.data);
        console("Book :", books);
    })
    .catch(error => {
        console.log(error.message);
    });
   },[]);

   const handleRemove = async (book_id) => {
    axios.delete(`http://localhost:4000/books/delete/${user_id}/${book_id}`).then((response) => {
        setResultMessage(response.data.message);
        setAlertType("alert-info");
        setIsAlert(true);
        setBooks(books.filter(book => book.book_id !== book_id));
    })
    .catch(error => {
        console.log(error.response.data.message);
        setResultMessage(error.response.data.message?? error.message);
        setAlertType("alert-danger");
        setIsAlert(true);
    });
}


    return (
        <>
        <Navbar />
        <Header image={null} color={'black'} height={'20vh'} title={'My Collection'} />
        { isAlert && 
            <div className={`alert ${alertType} alert-dismissible fade show`} role="alert">
            {resultMessage}
                <button type="button" className="btn-close"  aria-label="Close" onClick={() => setIsAlert(false)}></button>
            </div>
        }
        <div className="container px-4 px-lg-5 mt-5 position-relative">
            <div className="position-absolute top-0 end-0 btn" >
                <Link to={"/collection/add"}>
                    <PlusSquare size={65} color="green" />  
                </Link>
            </div>
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">                
            {
                books.map(book => (
                    <div key={book.book_id} className="col mb-5">
                        <Card  book = {book} handleRemove = {handleRemove} />
                    </div>
                ))
            }
            </div>
        </div>
        </>
    )
}
