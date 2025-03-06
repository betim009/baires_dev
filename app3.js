import React, { useState } from 'react';

const App = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleTitleChange = (e) => {
    // set title
  };

  const handleAuthorChange = (e) => {
    // set author
  };

  const handleAddBook = () => {
    // add a book must have a title and author, and id must be unique random number
  };

  const handleEditBook = (id) => {
    // edit a book
  };

  const handleUpdateBook = () => {
    // update a book must have option to update title and author
  };

  const handleDeleteBook = (id) => {
    // delete a book
  };

  return (
    <div>
      <h1>Book Stall</h1>
      <div>
        <input type="text" placeholder="Title" value={title} />
        <input type="text" placeholder="Author" value={author} />
        {editingId ? (
          <button >Update Book</button>
        ) : (
          <button >Add Book</button>
        )}
      </div>
      <ul>
       {books.map(book => (
          <li key={book.id}>
            {book.title} - {book.author}
            <button data-testid="edit-button">Edit</button>
            <button data-testid="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
