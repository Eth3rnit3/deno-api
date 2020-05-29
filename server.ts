import App from "./app.ts";
const env = Deno.env.toObject().DENO_ENV || 'development';
const isProd = env !== 'development';
const port = Deno.env.toObject().PORT || '8080';

App.start({ port: parseInt(port), hostname:  isProd ? '0.0.0.0' : '127.0.0.1'});

console.log('Server started !', env);