import { Router, json } from "itty-router";
import exampleMiddleware from "./middleware/example.js";

const router = Router();

/**
 * Simple route that returns a text
 *
 * @param {import ("itty-router").IRequest} request - The request object.
 * @returns {Response} - A Response object
 *
 */
router.get("/", (request) => {
  console.dir(request, { depth: null });
  return new Response("This is a working Cloudflare worker");
});

/**
 * Simple route that returns JSON
 *
 * @param {import ("itty-router").IRequest} request - The request object.
 * @returns {Response} - A Response object
 *
 */
router.get("/json", (request) => {
  console.dir(request, { depth: null });
  return json({ message: "This is a JSON response" });
});

/**
 * Handles the GET request for the "/middleware" route.
 * This route uses the 'exampleMiddleware' to add a 'middleware' property to the request object.
 *
 * @param {import ("itty-router").IRequest} request - The request object modified by the exampleMiddleware.
 * @returns {Response} - A Response object with the text value from the middleware.
 */
router.get("/middleware", exampleMiddleware, (request) => {
  const { value } = request.middleware;
  return new Response(value);
});

/**
 * Simple route that returns temporarily redirects to a new page
 *
 * @param {import ("itty-router").IRequest} request - The request object.
 * @returns {Response} - A Response object
 *
 */
router.get("/redirect-route", (request) => {
  const base = "https://x.com/kinngh";
  const statusCode = 307;

  return Response.redirect(base, statusCode);
});

// Catch unknown routes and throw a 404 and limit exceptions on workers.
router.all("*", () => new Response("404, not found!", { status: 404 }));

//Bind worker with the router
addEventListener("fetch", (e) => {
  e.respondWith(router.handle(e.request));
});
