import './App.css';

function App() {
  return (
    <div className="App">
     <h1>Gab Library</h1>
     
     <div className='add_new_book'>
     <label>Book Title</label> 
     <input type="text" name="book_title" />

     <label>Author</label>
     <input type="text" name="book_author" />

     <button>New</button>
     </div>

    </div>
  );
}

export default App;
