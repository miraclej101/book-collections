export const registerValidation = (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).send("Username and password are required");
    }

    // A password with at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const {password} = req.body;
    if(!passwordPattern.test(password)) {
        return res.status(400).send("Password must have at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character");
    }

    if(!req.body.firstname) {
        return res.status(400).send("First name is required");
    }

    if(!req.body.lastname) {
        return res.status(400).send("Last name is required");
    }

    next();

}