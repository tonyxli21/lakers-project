// http comes with node.js
const http = require("http");
const fs = require("fs");
// const path = require("path");
// const exphbs = require("express-handlebars");
// const express = require("express");
const points = require("./data/points");
const rebounds = require("./data/rebounds");
const threePointers = require("./data/threepointers");
// const app = express();

const pointsArr = [];
const reboundsArr = [];
const threePointersArr = [];

for (let i = 0; i < points.pts.pl.length; i++) {
  pointsArr.push(
    `${points.pts.pl[i].fn}` +
      ` ` +
      `${points.pts.pl[i].ln} ` +
      " " +
      `(${points.pts.pl[i].pos}): ` +
      `${points.pts.pl[i].val}`
  );
}
// console.log(pointsArr);

for (let j = 0; j < rebounds.reb.pl.length; j++) {
  reboundsArr.push(
    `${rebounds.reb.pl[j].fn}` +
      ` ` +
      `${rebounds.reb.pl[j].ln} ` +
      " " +
      `(${rebounds.reb.pl[j].pos}): ` +
      `${rebounds.reb.pl[j].val}`
  );
}
// console.log(reboundsArr);

for (let k = 0; k < threePointers.tpp.pl.length; k++) {
  threePointersArr.push(
    `${threePointers.tpp.pl[k].fn}` +
      ` ` +
      `${threePointers.tpp.pl[k].ln} ` +
      ` ` +
      `(${threePointers.tpp.pl[k].pos}): ` +
      `${threePointers.tpp.pl[k].val}`
  );
}
// console.log(threePointersArr);

const topFourPoints = pointsArr.sort((a, b) => b - a).slice(0, 4);
for (let i = 0; i < points.pts.pl.length; i++) {}
// console.log(topFourPoints);
const topFourRebounds = reboundsArr.sort((a, b) => b - a).slice(0, 4);
// console.log(topFourRebounds);
const topFourThreePointers = threePointersArr.sort((a, b) => b - a).slice(0, 4);
// console.log(topFourThreePointers);

fs.readFile("./public/index.html", function(err, html) {
  if (err) {
    throw err;
  }
  // Method to initialize server without express
  const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
      // Send HTML page and browser will render it
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write(html);
      res.write(
        `<h1 style='color:purple'>Points</h1><ol><li>${topFourPoints[0]}</li><li>${topFourPoints[1]}</li><li>${topFourPoints[2]}</li><li>${topFourPoints[3]}</li></ol>`
      );
      res.write(
        `<h1 style='color:purple'>Rebounds</h1><ol><li>${topFourRebounds[0]}</li><li>${topFourRebounds[1]}</li><li>${topFourRebounds[2]}</li><li>${topFourRebounds[3]}</li></ol>`
      );
      res.write(
        `<h1 style='color:purple'>Three Pointers</h1><ol><li>${topFourThreePointers[0]}</li><li>${topFourThreePointers[1]}</li><li>${topFourThreePointers[2]}</li><li>${topFourThreePointers[3]}</li></ol>`
      );

      // res.write('<img src="../img/image-1.png">');
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json " });
      res.end();
    }
  });

  // app.get("/", (req, res) => {
  //   res.sendFile("/public/index.html");
  // });

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// app.use(express.json());

// app.get("/", (req, res) =>
//   res.render("index", {
//     title: "Team App",
//     points
//   })
// );

// // Set template engine (handlebars middleware)
// app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// // Set static folder to serve HTML files
// app.use(express.static(path.join(__dirname, "public")));
