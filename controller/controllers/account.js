// GET '/account'
const getAccount = (req, res, next) => {
    // replace with front end page 
    res.sendFile(__dirname + '/static/login.html');
    
}

// POST '/account'
// used to create a new account
const postAccount = (req, res, next) => {
    res.json({message: "POST account"}); 

    let account_type = req.body.account_type; 
    res.send(`Account type: ${account_type}`);
    
    // filter by account_type to enter into DB and call correct function
    switch (account_type)
    {
        case 'player':
            console.log("soccer player");
            break;

        case 'parent': 
            console.log("parent");
            break;

        case 'administrator':
            console.log("administrator");
            break;

        case 'coach':
            console.log('coach');
            break;

        default: 
            console.log("unabl to create account");
    }
}

module.exports = {
    getAccount,
    postAccount
};