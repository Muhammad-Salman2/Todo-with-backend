import express from "express";
import cors from "cors";
import "./database.js"
import { Todo } from "./Models/index.js";



const app = express();
const port = process.env.PORT || 5001;

// const todos = [];

app.use(express.json()); //to convert body into json
app.use(cors({origin:["http://localhost:5173"]}));

app.get("/api/v1/todos", (request, response) => {
  const message = !todos.length ? "todos empty" : "data fetched succesfully";
  response.send({ data: todos, message: message });
});
// ye api todo add krne k lea he
app.post("/api/v1/todo", async(request, response) => {

  const object = {
    todoContent: request.body.todo,
    // id: String(new Date().getTime()),
    // ip:request.ip
   
  };
  // todos.push(object);
  const result = await Todo.create(object)
  console,log("res",result)



  response.send({ messege: "todo added succesfully", data: object });
});

// ye api todo update ya edit krne k lea he
app.patch("/api/v1/todo/:id", (request, response) => {
  const id = request.params.id;

  // console.log("ye id he", id);

  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      //idher todo mill gaya he ab todo ko edit karna he

      todos[i].todoContent = request.body.todoContent;
      isFound = true;
      break;
    }
  }

  if (isFound) {
    response.status(201).send({
      data: { todoContent: request.body.todoContent, id: id },
      messege: "todo updated succesfully",
    });
  } else {
    response.status(200).send({ data: null, messege: "todo not found!" });
  }
});

app.delete("/api/v1/todo/:id", (request, response) => {
  const id = request.params.id;

  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      //idher todo mill gaya he ab todo ko delete karna he

      todos.splice(i, 1);
      isFound = true;
      break;
    }
  }

  if (isFound) {
    response.status(201).send({
      // data: {todoContent: request.body.todoContent,id: id,},
      message: "todo deleted succesfully",
    });
  } else {
    response.status(200).send({ data: null, message: "todo not found!" });
  }
});

// ager uper wale routes me se koi route nhi milta t ye route lazmi chale ga
app.use((request, response) => {
  response.status(404).send({message:"route not found!"});
});

// ye port k apna seen he
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
