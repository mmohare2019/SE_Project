// GET '/account'
const getAccount = (req, res, next) => {
    res.json({message: "GET account"});

}

// POST '/account'
// used to create a new account
const postAccount = (req, res, next) => {
    res.json({message: "POST account"}); 

    let account_type = req.body.account_type; 

    // filter by account_type to enter into DB 

}

module.exports = {
    getAccount,
    postAccount
};