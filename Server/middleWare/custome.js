const express = require('express');
const app = express();

const logger=(req, res, next) => {
    console.log(`this i sthe request method: ${req.method} and this is the request url:${req.url}`);
    next();
}
module.exports= logger;
