module.exports = (req, res, next) => {
  if (req.user === undefined) {
    console.log('there is no user');
    res.json({ redirectURI: true });
  } else {
    next();
  }
};
