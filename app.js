const express = require("express");
require("dotenv").config();
var cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, CURSOR_FLAGS } = require("mongodb");
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.amdokuk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const crudCollection = client
      .db(`${process.env.DBNAME}`)
      .collection(`${process.env.COLLECTION}`);

    // todo Add post

    app.post("/addproduct", async (req, res) => {
      const newProduct = req.body;
      const product = await crudCollection.insertOne(newProduct);
      res.send(product);
    });

    // todo get todos

    app.get("/", async (req, res) => {
      const query = {};
      const showData = await crudCollection.find(query); // find all the products based on query
      const allProducts = await showData.toArray(); // to make it array
      res.send(allProducts);
    });
  } finally {
  }
}

run().catch(console.dir);

app.listen(4000, () => {
  console.log("Server is Running");
});
