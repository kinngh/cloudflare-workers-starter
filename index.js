//In your console, ensure to start `local mode` to test out requests from node/fetch or tools like Postman or Insomnia
import { Router } from "itty-router";
import { json } from "itty-router-extras";

const router = Router();

router.get("/", (request) => {
  console.log(request);
  return new Response("This is a working Cloudflare worker");
});

router.get("/json-return", (request) => {
  console.log(request);
  return json({ message: "This is a JSON response" });
});

function functionRoute(request) {
  console.log(typeof request);
  return new Response("This is coming from a function");
}

function noParamFunction() {
  return new Response("This is coming from no param function");
}

router.get("/fn", (request) => {
  return functionRoute(request);
});

router.get("/noparam", noParamFunction);

router.get("/go", thisIsMiddleware, (request) => {
  console.log(request);
  return new Response("This is my second route");
});

router.get("/new-route", newRouteFunction); //(request) is automatically passed to the function, just need to include it in params

function newRouteFunction(request) {
  console.log(request);
  return new Response("Yeet");
}

function thisIsMiddleware() {
  console.log("--> running middleware");
  //   return new Response("404, not found!", { status: 404 });
}

// HTTP 307 status code is for temporary redirect.
// DO NOT USE 301 BECAUSE IT'S FOR PERMANENT REDIRECT
router.get("/rere", (request) => {
  const base = "https://harshdeephura.com";
  const statusCode = 307; //307 = temporary redirect

  return Response.redirect(base, statusCode);
});

//MARK:- DON'T DELETE
// Catch unknown routes and throw a 404.
// Also helps limit exceptions on workers.
router.all("*", () => new Response("404, not found!", { status: 404 }));

//MARK:- DON'T DELETE
//Bind worker with the router
addEventListener("fetch", (e) => {
  e.respondWith(router.handle(e.request));
});
