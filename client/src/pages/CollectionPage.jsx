import { useState, useEffect } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import { useAuth } from "../contexts/authentication";
import axios from "axios";

export default function CollectionPage() {
    /*
    const books = [
        {
            book_id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            description: "The Great Gatsby is a novel by the American author F. Scott Fitzgerald. First published in 1925, it is set on Long Island's North Shore and in New York City from spring to autumn of 1922.",
            category: "Novel",
            publisher: "Charles Scribner's Sons",
            release_year: 1925
        },
        {
            book_id: 2,
            title: "The Catcher in the Rye",
            author: "J. D. Salinger",
            description: "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.",   
            category: "Novel",
            publisher: "Little, Brown and Company",
            release_year: 1951
        }
    ] */
   const [books, setBooks] = useState([]);
    const { state } = useAuth();
   useEffect(() => {
    const user_id = state.user.id;
    a
   },[])

    return (
        <>
        <Header image={null} color={'black'} height={'20vh'} title={'My Collection'} />
        <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">                
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