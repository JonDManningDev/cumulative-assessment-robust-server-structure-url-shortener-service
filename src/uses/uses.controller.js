const uses = require("../data/uses-data");

//Middleware Functions:

function useExists(req, res, next) {
  const { useId } = req.params;
  const foundUse = uses.find((use) => use.id === Number(useId));
  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  }
  return next({
    status: 404,
    message: `Use id not found: ${useId}`,
  });
}

//Route Functions:

function list(req, res) {
  const foundUrl = res.locals.url;

  if (foundUrl) {
    const urlUses = uses.filter((use) => use.urlId === foundUrl.id);
    return res.status(200).json({ data: urlUses });
  }

  return res.status(200).json({ data: uses });
}

function read(req, res, next) {
  const foundUrl = res.locals.url;
  const foundUse = res.locals.use;

  if (foundUrl) {
    if (foundUse.urlId === foundUrl.id) {
      return res.status(200).json({ data: foundUse });
    } else {
      return next({
        status: 404,
        message: `Use ID ${foundUse.id} does not correspond to the URL with ID ${foundUrl.id}`,
      });
    }
  } else {
    return res.status(200).json({ data: foundUse });
  }
}

function destroy(req, res) {
  const indexToDelete = uses.findIndex((use) => use.id === res.locals.use.id);
  uses.splice(indexToDelete, 1);

  return res.sendStatus(204);
}

module.exports = {
  delete: [useExists, destroy],
  list,
  read: [useExists, read],
};
