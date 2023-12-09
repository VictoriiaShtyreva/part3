const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3001;

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

// Create a custom token to capture POST body data
const customToken = (request, response) => {
  return {
    method: request.method,
    url: request.url,
    body: request.body,
    headders: request.headers,
  };
};
// Configure morgan for logging
app.use(morgan("tiny", customToken));

// implemented persons address
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// implemented info address
app.get("/info", (request, response) => {
  const currentTime = new Date();
  const contacts = persons.length;
  const info = `
    <p>Phonebook has info for ${contacts} people</p>
    <p>Request received at: ${currentTime}</p>
  `;
  response.send(info);
});

// implemented id of persons
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end("Person not found");
  }
});

// implemented delete of persons
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

// implemented post of persons
app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Person not found",
    });
  }
  const existingPerson = persons.find(
    (person) => person.name === newPerson.name
  );
  if (existingPerson) {
    return res.status(400).json({ error: "Name must be unique" });
  }
  const newPerson = {
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(newPerson);
  response.json(newPerson);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
