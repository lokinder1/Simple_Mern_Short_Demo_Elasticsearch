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
        title: req.body.title,
        content: req.body.content,
      },
    })
    .then((response) => {
      return res.json({ message: "Indexing successful", response: response });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

app.get("/movies", (req, res) => {
  const searchText = req.query.searchText;
  esClient
    .search({
      index: "movies",
      body: {
        query: {
          match: {
            content: searchText,
          },
        },
      },
    })
    .then((response) => {
      return res.json(response.body.hits.hits);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:5000`)
);
