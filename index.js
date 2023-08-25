const express=require('express')
const cors=require('cors')
const app = express()
const mysql=require('mysql')
app.use(cors())
app.use(express.json())

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "books"
  });
  db.connect((err)=> {
    if (err) throw err;
    console.log("Connected!");
  });
  app.get('/books',(req, res)=>{
    db.query('SELECT * FROM book',(err,result)=>{
        if(err) console.log(err);
        if(result.length>0)
        {
            res.send(result)
        }
        else
        {
            res.send({Message:"There are no books"})
        }
    })
  })
  app.post('/add_book',(req, res)=>{
      const title = req.body.title;
      const author = req.body.author;
      db.query('INSERT INTO book(title,author) VALUES(?,?)',[title,author],(err,result)=>{
          if(err) {console.log(err)}
        if(result)
        {
            res.send({Message:"Created Successfully"})
        }
        else
        {
            res.send({Message:"SOME THING WENT WRONG"})
        }
      })
  })
  app.put('/books/:bookId',(req, res)=>{
      const bookId = req.params.bookId
      const title = req.body.title
      const author = req.body.author
        console.log("dd",bookId,title,author)
      db.query('UPDATE book SET title = ?, author = ? WHERE id = ?',[title,author,bookId],(err,result)=>{
          if(err){console.log(err)
            res.status(500).send({Message:"SOME THING WENT WRONG"})
        }
           if(result)
          {
            res.status(200).send({Message:"Updated Successfully"})
          }
          else
        {
            res.send({Message:"SOME THING WENT WRONG"})
        }
      })
  })
  app.delete('/books/:bookId',(req, res)=>{
    const bookId = req.params.bookId
      console.log("dd",bookId)
    db.query('DELETE FROM book WHERE id = ?',[bookId],(err,result)=>{
        if(err){console.log(err)
          res.status(500).send({Message:"SOME THING WENT WRONG"})
      }
         if(result)
        {
          res.status(200).send({Message:"Updated Successfully"})
        }
        else
      {
          res.send({Message:"SOME THING WENT WRONG"})
      }
    })
})
app.listen(3000,()=>{
    console.log('listening on port 3000')
})