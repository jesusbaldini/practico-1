  import express from 'express';
  import fs from "fs";
  import bodyParser from "body-parser";


  const app = express(); 
  app.use(bodyParser.json());
  
  const readData = () => {
   try{
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
   } catch(error){
    console.log(error);
   }

  };
  
  const  writeData = (data) =>{
    try{
      fs.writeFileSync("./db.json", JSON.stringify(data));
    }catch(error){
      console.log(error);
    }
  };


  // crear ruta endpoint 
  app.get("/", (req, res) => {
    res.send("bienvenido");
  });
 //obtener los libros de la bd
  app.get("/books", (req, res) => {
    const data = readData();
    res.json(data.books);
  });
 
  app.get("/books/:id" , (req , res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const books = data.books.find ((books) => books.id === id);
    res.json(books);
  });

app.post("/books", (req, res) => {
  const data = readData();
  const body = req.body;
  const newBook = {
    id: data.books.length + 1,
    ...body,
  };
   data.books.push(newBook);
   writeData(data);
   res.json(newBook);

});

app.put("/books/:id", (req, res) => { 
  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);
  const bookIndex = data.books.findIndex((book) => book.id === id);
  data.books[bookIndex] = {
     ...data.books[bookIndex],
     ...body,

  };

  writeData(data);
  res.json({message: "libro modificado"});
});

app.delete("/books/:id", (req ,res) => {
  const data= readData();
  const id = parseInt(req.params.id);
  const bookIndex = data.books.findIndex((book) => book.id === id);
  data.books.splice(bookIndex, 1);
  writeData(data);
  res.json({message: "libro borrado"});
 
});


 app.listen(3003, () => {
    console.log('servidor escuchando');
 });