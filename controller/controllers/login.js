// GET login 
const getLogin = (req, res, next) => {
    res.json({message: "GET log in"})
}

// POST login
const postLogin = (req, res, next) => {
    res.json({message: "POST log in"})
}

module.exports = {
    getLogin,
    postLogin
}; 