"use strict";
{
  process.on('unhandledRejection', error => {
    console.log("Received unhandled promise rejection");
    console.error( error );
  });
  process.on('uncaughtException', error => {
    console.log("Received uncaught exception");
    console.error( error );
  });
  const exp = require('express');
  const app = exp();
  const port = process.env.PORT || 8080;
  app.use("/",exp.static("./"));
  const server = app.listen(port, () => console.log(`Server up at @${new Date()} on port ${port}`));
}
