const express = require('express')
var morgan = require('morgan')

const app = express()
app.use(express.json())


morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



let persons = [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(p => p.id === request.params.id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(p => p.id !== request.params.id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people<br/><br/>${Date().toString()}`)
})

app.post('/api/persons', (request, response) => {
    const newId = (Math.max(...persons.map(p => Number(p.id))) + 1).toString()
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.some(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: newId,
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})