const express = require('express');
const mongoose = require('mongoose').default;
const bodyParser = require('body-parser');

const app = express();

// Practically it should be in .env file, but for simplicity I put it here
mongoose.connect('mongodb://localhost/crud', { useNewUrlParser: true }).then(() => {});

const schema = new mongoose.Schema({
    name: String,
    age: Number,
});

const Person = mongoose.model('Person', schema);

app.use(bodyParser.urlencoded({ extended: true }));

// Create a new person
app.post('/person', (req, res) => {
    const { name, age } = req.body;

    const person = new Person({
        name,
        age,
    });

    person.save({})
        .then(r => res.status(200).send('Person created successfully!'))
        .catch(err => res.status(500).send(err))
})

// Get one person if id is given , otherwise get all persons
app.get('/person', async (req, res) => {
    const { id } = req.query;
    if(id){
        Person.findById(id)
            .then(r => res.status(200).send(r))
            .catch(err => res.status(500).send(err));
    }else{
        Person.find({})
            .then(r => res.status(200).send(r))
            .catch(err => res.status(500).send(err));
    }

});

// Update a person
app.put('/person/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    Person.findByIdAndUpdate(id, { name, age }, { new: true })
        .then(r => {res.status(200).send('Person updated successfully!');})
        .catch(err => {res.status(500).send(err);})
});

// Delete a person
app.delete('/person/:id', (req, res) => {
    const { id } = req.params;
    Person.findByIdAndDelete(id)
        .then(r =>{res.status(200).send('Person deleted successfully!');})
        .catch(err => {res.status(500).send(err);});
});

//search a person by name or part of name
app.get('/person/search', async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).send('Name parameter is required');
    }

    try {
        const persons = await Promise.all([Person.find({
            name: {$regex: name, $options: 'i'},
        })]);
        return res.json(persons);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});

module.exports = app

