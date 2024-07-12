import { useState, useEffect } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import { useAuth } from "../contexts/authentication";
import axios from "axios";

export default function CollectionPage() {
  
   const [books, setBooks] = useState([]);
    const { state } = useAuth();
   useEffect(() => {
    console.log("state", state);
    const user_id = state.user.id;
    console.log("user id = ", user_id);
    axios.get(`http://localhost:4000/books/${user_id}`).then(response => {
        setBooks(response.data.data);
        console("Book :", books);
    })
    .catch(error => {
        console.log(error.message);
    });
   },[])

    return (
        <>
        <Header image={null} color={'black'} height={'20vh'} title={'My Collection'} />
        <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">                
                {
                    books.map(book => (
                        <div key={book.book_id} className="col mb-5">
                            <Card  book = {book} />
                        </div>
                    ))
                }
                </div>
        </div>
        </>
    )
}