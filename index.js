const express = require('express');
const res = require('express/lib/response');
var fs = require("fs")
const mongoose = require('mongoose');
const app = express()
const port = 3000;
const schema = require("./schema")


app.use(express())
app.use(express.json())

// GET DATA

app.get("/get", async (req, res) => {
  const data = await schema.find({});

  try {
    res.json( {message: "Data found", data: data , status : true} );
  } catch (error) {
    res.json( {message: "Data not found", status : false} );
  }
});

// POST DATA

app.post('/post', async (req, res) => {
  let { name, Price } = req.body
  try {
    if(!name || !Price){
      res.json( {message: "Enter all data",  status : false} );
    }else{

    }
    const data = await schema.create({
      name,
      Price
    })

    res.json({ data })
  } catch (error) {
    res.send("Data is not post")
    res.status(400).send(error.message)

  }
});

// PATCH DATA (UPDATE)

app.patch('/patch/:id', async (req, res) => {

  const { name, Price } = req.body

  try {

    const data = await schema.findOneAndUpdate({
      _id: req.params.id
    },
      {
        name,
        Price
      },
      { new: true })

    res.json(data);
  } catch (error) {
    res.status(400).send(error);
  }
})

// DELETE DATA

app.delete('/delete/:id', async (req, res) => {
  const { name, Price } = req.body
  try {
    const data = await schema.findOneAndDelete({
      _id: req.params.id
    },
      {
        name,
        Price
      },
      { new: true })
    res.sendDate("data has deleted", data)
  } catch (error) {
    res.status(400).send(error)
    console.log("data is deleted")
  }
})

// DATABASE ConnectioN

mongoose
  .connect(
    'mongodb://localhost:27017/dbNewproject',
    {
      UseNewUrlParser: true,
      useunifiedtopology: true
    }
  )
  .then(() => {
    console.log("Database is connected ")
  })

app.listen(port, () => {
  console.log(` listening on port ${port}`)
})



module.exports = app;