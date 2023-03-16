const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))


const db = mongoose.connection
mongoose.connect('mongodb+srv://ramanparmarphillips:password123PASS@b00541.bfdxeht.mongodb.net/todo', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {console.log('connected to todo database')})

const Schema2 = {
    userName: String,
    password: String
}
const User = mongoose.model("User", Schema2);


const Schema = {
    name: String
}


const Item = mongoose.model("Item", Schema);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/getall', (req, res) => {
 Item.find()
 .then(item => {
 res.send(item)
 })
.catch(err => {
  console.log(err)
  res.status(500).send('Error retrieving items from database')
})})

app.delete('/delete/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id)
    .then(() => {
        res.send('item deleted successfully')
        })
        .catch(err => {
        console.log(err)
        res.status(500).send('Error deleting item from database')
        })
})

app.patch('/update/:id', (req, res) => {

    Item.findByIdAndUpdate(req.params.id, {name: req.body.name})
    .then(() => {
        res.send('item updated successfully')
        })
        .catch(err => {
        console.log(err)
        res.status(500).send('Error updating item from database')
        })
})


//FOR ADDING A NEW TASK LATER
app.post('/add', (req, res) => {
    const { name } = req.body;
    if (name.length > 140) {
      return res.status(403).send('Can not add item with more than 140 characters!');
    }
    const newItem = new Item({ name });
    newItem.save()
    .then(() => {
        res.send('item added successfully')
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('Error adding car to database')
      })
})

app.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    try {
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(401).send('User not found');
      }
      if (user.password !== password) {
        return res.status(401).send('Incorrect password');
      }
      return res.send('Logged in successfully');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server error');
    }
  });
  
  app.post('/register', (req, res) => {
    const { userName, password } = req.body;
  
    if (!userName.endsWith('@gmail.com')) {
      return res.status(403).send('Username must end with "@gmail.com"');
    }
    const newUser = new User({ userName, password });
    newUser.save()
      .then(() => {
        res.send('User added successfully')
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('Error adding User to database')
      });
  });
  

//ADD NEW USER
// app.post('/register', (req, res) => {
//     const newUser = new User({
//         userName: req.body.userName,
//         password: req.body.password
//     })
//     newUser.save()
//     .then(() => {
//         res.send('User added successfully')
//       })
//       .catch(err => {
//         console.log(err)
//         res.status(500).send('Error adding User to database')
//       })
// })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})