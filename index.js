const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const password ="SaKiBuDdIn27"


const uri = "mongodb+srv://organicUser:SaKiBuDdIn27@cluster0.abcuj.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req, res) => {
// res.send('hello I am working')
res.sendFile(__dirname + '/index.html');
})

client.connect(err => {
  const productCollection = client.db("organicdb").collection("products");
 
  app.post("/addProduct",(req, res) => {
    const product = req.body;
    // console.log(product);
    productCollection.insertOne(product)
    .then (result => {
      console.log('Data added successfully');
      res.send('success');

  })
 
  })
});

app.listen(3000);