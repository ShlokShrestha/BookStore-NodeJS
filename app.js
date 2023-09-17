const express = require("express");
const app = express();
const { books } = require("./model/index");
const { where } = require("sequelize");
//Database Connection
require("./model/index");

//RENDER VIEW PAGE
app.set("view engine", "ejs");

//HELP TO ADD DATA FROM FORM WE SHOULD PASS PARSE IT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CREATE VIEW HOMEPAGE
app.get("/", async (req, res) => {
  const allbook = await books.findAll();
  res.render("book.ejs", { book: allbook });
});

app.get("/createBook", (req, res) => {
  res.render("createBook.ejs");
});

app.post("/createBook", async (req, res) => {
  const bookName = req.body.bookName;
  const authorName = req.body.authorName;
  const price = req.body.price;
  const description = req.body.description;

  await books.create({
    bookName: bookName,
    authorName: authorName,
    price: price,
    description: description,
  });

  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await books.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/");
});

app.get("/editBook/:id", async (req, res) => {
  const id = req.params.id;

  const book = await books.findAll({
    where: {
      id: id,
    },
  });
  res.render("editBook.ejs", { book: book });
});

app.post("/editBook/:id", async (req, res) => {
  const id = req.params.id;
  const bookName = req.body.bookName;
  const authorName = req.body.authorName;
  const price = req.body.price;
  const description = req.body.description;
  await books.update(
    {
      bookName: bookName,
      authorName: authorName,
      price: price,
      description: description,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("NodeJS is running on 3000 ports");
});
