export default function About() {
    return (
        <div className="px-4 mt-3">
            <div className="row gx-4 justify-content-center">
                <div className="col-lg-8">
                    <h2>About this page</h2>
                    <p className="lead">This is a personal book collection management application. There are features:</p>
                    <ul>
                        <li>Sign up for a new member</li>
                        <li>Sign in for an existing member</li>
                        <li>List all books in a member's collection</li>
                        <li>Add a new book to the collection</li>
                        <li>Modify details of a book in the collection</li>
                        <li>Remove a book in the collection</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}