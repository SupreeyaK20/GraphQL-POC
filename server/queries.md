# getAllBooks
{
  books{
   name
   genre
    id
    author{
        name
    }
  }
}

# getAllAuthors
{
  authors{
    name
    age
    id
    books{
        name
        
    }
  }
}

# getBookByID
{
    book(id: 1){
    name
    genre
    }
}

# getAuthorByID
{ 
   author(id: 101){
    name
    id
    age
  
  }
}

# getBooksAuthorByID
{
  book(id: 1){
   name
   genre
   author{
    name
    id
    age
  }
  }
}

# getAuthosBooksByID
{
  author(id: 101){
    name
    age
    books{
      name
      genre
    }
  }
}

# addBook
mutation{
  addBook(name: "Spy Life", genre: "Real World", authorId: "62163728516c5e17d8501aab"){
    name
    genre
  }
}

# addAuthor

mutation{
  addAuthor(name: "Cherry", age: 67){
    name
    age
  }
}

# update book
mutation{
  updateBook(id: "621868311e5c58a2b0f378e6", name: "Lost in home"){
    name
   
  }
}

# delete book query
mutation{
  deleteBook(id: "6218a70ab0e84d240fdeed68") {
    id
  }
}