const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

const PORT = 3001;




app.get("/", (request, response) => {
  response.send("<h1>NodeJS FileSystem</h1>");
});

app.post("/api/createFile", (request, response) => {
  createFile(request, response);
});

app.get("/api/files", (request, response) => {
  retriveFiles(request, response);
});

app.get('*',(req,res)=>{
  res.status(404).json({ message: "there is no such url" })
})

function createFile(request, response) {
  const timestamp = Date.now();

  const date = new Date(timestamp).toDateString();
  const time = new Date(timestamp).toTimeString().slice(0, 17);

  let fileName = `${date} - ${time.split(":").join("_")}.txt`;

  fs.writeFile(
    path.join(__dirname, "files", fileName),
    `${timestamp}`,
    (error) => {
      if (error) throw error;
      response.status(201).json({ message: "File created successfully" });
      console.log("File Created Succesfully");
    }
  );
}

function retriveFiles(request, response) {
  try {
    const files = fs.readdirSync(path.resolve("./files"));
    if (files.length !== 0) {
      response.status(200).json({ all_Files: files });
    } else {
      response.status(200).json({ message: "there is no files " });
    }
  } catch (error) {
    response.status(404).json({ message: "there is no such directory" });
  }
}

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});