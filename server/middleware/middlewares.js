export const logReq = (req, res, next) => {
    console.log(
        `${req.method} -- ${req.url} -- ${new Date().toLocaleTimeString()}`,
    );

    if(req.body){
        console.table(req.body);
    }

    next();
}

export const globalErr = (err, _req, res, _next) => {
    res.status(err.status || 500).json({error: `Nuh-uh: ${err.message}` });
}