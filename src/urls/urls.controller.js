const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

//Middleware Functions:

function urlExists(req, res, next) {
    const { urlId } = req.params;
    const foundUrl = urls.find((url) => url.id === Number(urlId));
    if (foundUrl) {
        res.locals.url = foundUrl;
        return next();
    }
    return next({
        status: 404,
        message: `URL ID not found: ${urlId}`,
    });
} 

function hrefIsValid(req, res, next) {
    const { data: { href } = {} } = req.body;
    if (!href) {
        return next({
            status: 400,
            message: "An 'href' key is required for a valid POST request."
        })
    } else {
        return next();
    }
}

function generateUseRecord(req, res, next) {
    const newUseId = uses.length + 1;
    const time = Date.now();
    uses.push({
       id: newUseId,
       urlId: res.locals.url.id,
       time: time 
    });
    return next();
}

//Route Functions:

function list(req, res) {
  return res.status(200).json({ data: urls });
}

function create(req, res) {
    const newUrlId = urls.length + 1;
    const { data: { href } = {} } = req.body;
    const newUrl = {
        id: newUrlId,
        href,
    };
    urls.push(newUrl);
    return res.status(201).json({ data: newUrl });
}

function read(req, res) {
    return res.status(200).json({ data: res.locals.url });
}

function update(req, res){
    const foundUrl = res.locals.url;
    const { data: { href } = {} } = req.body;

    foundUrl.href = href;

    return res.status(200).json({ data: foundUrl });
}

module.exports = {
    create: [hrefIsValid, create],
    list,
    read: [urlExists, generateUseRecord, read],
    update: [urlExists, update],
    urlExists,
}