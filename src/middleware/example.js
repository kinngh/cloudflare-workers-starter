/**
 * An example Middleware function
 *
 * @param {import ("itty-router").IRequest} request - The request object.
 * @param {...any} args - Additional arguments that you passed to the router.handle(request, ...args) function.
 * @returns {any} - The return of each handler (middleware) is "awaited", allowing both synchronous and asynchronous syntax.
 *
 */
const exampleMiddleware = (request) => {
  request.middleware = {
    value: "This comes from the middleware",
  };
};

export default exampleMiddleware;
