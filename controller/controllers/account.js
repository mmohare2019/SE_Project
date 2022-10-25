// GET '/account'
const getAccount = (req, res, next) => {
    res.json({message: "GET account"});
}

// POST '/account'
const postAccount = (req, res, next) => {
    res.json({message: "POST account"}); 
}

module.exports = {
    getAccount,
    postAccount
};