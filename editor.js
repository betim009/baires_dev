import React, { useState } from 'react';

const App = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [editingId, setEditingId] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    const handleAddBook = () => {
        if (title && author) {
            const newBook = {
                id: Math.random().toString(36).substr(2, 9), // Gera um ID único
                title,
                author,
            };
            setBooks([...books, newBook]);
            setTitle(""); // Limpa o campo de título
            setAuthor(""); // Limpa o campo de autor
        }
    };

    const handleEditBook = (id) => {
        const bookToEdit = books.find((book) => book.id === id);
        if (bookToEdit) {
            setEditingId(id);
            setTitle(bookToEdit.title);
            setAuthor(bookToEdit.author);
        }
    };

    const handleUpdateBook = () => {
        if (editingId && title && author) {
            const updatedBooks = books.map((book) =>
                book.id === editingId ? { ...book, title, author } : book
            );
            setBooks(updatedBooks);
            setEditingId(null); // Reseta o editingId
            setTitle(""); // Limpa o campo de título
            setAuthor(""); // Limpa o campo de autor
        }
    };

    const handleDeleteBook = (id) => {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
    };

    return (
        <div>
            <h1>Book Stall</h1>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleChange}
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={handleAuthorChange}
                />
                {editingId ? (
                    <button onClick={handleUpdateBook}>Update Book</button>
                ) : (
                    <button onClick={handleAddBook}>Add Book</button>
                )}
            </div>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title} - {book.author}
                        <button onClick={() => handleEditBook(book.id)} data-testid="edit-button">
                            Edit
                        </button>
                        <button onClick={() => handleDeleteBook(book.id)} data-testid="delete-button">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;