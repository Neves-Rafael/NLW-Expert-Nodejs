import fastify from "fastify";

const app = fastify();

app.get("/", (res, req) => {
  return req.send({ message: "Hello World!" });
});

app.listen({ port: 3333 }).then(() => {
  console.log("Http server running!");
});
