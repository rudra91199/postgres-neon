import type { NextFunction, Request, Response } from "express";
import app from "../app";
import fs from "fs"

const logger =((req :Request,res: Response,next: NextFunction) => {
    const log = `method - > Time - > URL \n ${req.method} - ${Date.now()} - ${req.url} \n`
    console.log(log);
    fs.appendFile("logger.txt", log, (err) => {
        if(err)
        console.log(err);
    })
    next();
})


export default logger;
