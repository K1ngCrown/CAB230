function searchBooks(library, authorName) {
  var authorCount = 0;
  var authorBook = "";
  const empty = "";
  const err ="NOT FOUND";

  for (var i = 0; i < library.length; i++) {
    if(library[i].author == authorName){
      if(authorCount >= 1 ){
        authorBook= authorBook + ",";
      }
      authorBook+=library[i].title;
      authorCount = authorCount + 1;
    }
  }
    if(authorBook==empty){
      return err;
    }
    return authorBook;  
}


