import React, { useState } from 'react';

const App = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleTitleChange = (e) => {
    // set title
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    // set author
    setAuthor(e.target.value);
  };

  const handleAddBook = () => {
    // add a book must have a title and author, and id must be unique random number
    const book = { title, author, id: books.length + 1 }
    console.log(book)
    setBooks([...books, book])
    setTitle('')
    setAuthor('')

  };

  const handleEditBook = (id) => {
    // edit a book
    setEditingId(id)

  };

  const handleUpdateBook = () => {
    // update a book must have option to update title and author
    const findUpdate = books.find(e => e.id === editingId)
    findUpdate.title = title
    findUpdate.author = author
    setBooks([...books])
    setEditingId(null)
    setTitle('')
    setAuthor('')
  };

  const handleDeleteBook = (id) => {
    // delete a book
    const filterRemove = books.filter(e => e.id !== id)
    setBooks(filterRemove)
  };

  return (
    <div>
      <h1>Book Stall</h1>
      <div>
        <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
        <input type="text" placeholder="Author" value={author} onChange={handleAuthorChange} />
        {editingId ? (
          <button onClick={handleUpdateBook}>Update Book</button>
        ) : (
          <button onClick={handleAddBook}>Add Book</button>
        )}
      </div>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} - {book.author}
            <button data-testid="edit-button" onClick={() => handleEditBook(book.id)}>Edit</button>
            <button data-testid="delete-button" onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
