const BASE_URL = 'http://localhost:3000/books'

async function addBook(book){

    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
        }
        
      const responce = await fetch(BASE_URL,options)
      const newBook = await responce.json()

      return newBook
}

async function addUpdaitBook(){
    try{
        const book = await addBook({})
     console.log(book)
    } catch(error){
        console.log('error')
    }
}