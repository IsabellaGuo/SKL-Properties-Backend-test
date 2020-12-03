const express = require('express');
const path = require('path');
const server = express();
const fs = require('fs');
const cors = require('cors');

const port = process.env.PORT || 3001;
server.use(express.static('public'));
server.use(express.json());
server.use(cors());

server.get("/api/data", (req,res) => {
  res.sendFile(path.join(__dirname, './public', 'data.json'));
})


server.post('/contact/submit', (req, res) => {
  const contactFormData = req.body
  fs.readFile(
    path.join(__dirname, './public', 'contacts.json'),
    (err, fileData) => {
      if (err) throw err;
      const json = JSON.parse(fileData);
      json.push(contactFormData);
      res.send(json);
      console.log(json);
      fs.writeFile(
        path.join(__dirname, './public', 'contacts.json'),
        JSON.stringify(json),
        (err, data) => {
          if (err) throw err;
          console.log('appended');
        }
      );
    }
  );
});

if (process.env.NODE_ENV == "production") {
  server.use(express.static(path.join(__dirname, "build")));

  server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

server.listen(port, () => console.log(`server running on port ${port}`));