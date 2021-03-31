const express = require("express");
var cors = require("cors");
const { Client } = require("@elastic/elasticsearch");

const app = express();
app.use(cors());
app.use(express.json());

const esClient = new Client({
  node: "http://127.0.0.1:9200",
});

app.post("/movies", (req, res) => {
  esClient
    .index({
      index: "movies",
      body: {
        character: req.body.character,
        quote: req.body.quote,
      },
    })
    .then((response) => {
      return res.json({ message: "Indexing successful", response: response });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error" });
    });
});

app.get("/movies", (req, res) => {
  const searchText = req.query.text;
  esClient
    .search({
      index: "movies",
      body: {
        query: {
          match: {
            quote: searchText,
          },
        },
      },
    })
    .then((response) => {
      return res.json(response.body);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error" });
    });
});

app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:5000`)
);
