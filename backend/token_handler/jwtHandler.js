import jwt from 'jsonwebtoken';



function verify(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).json('<h1>no authorization token sent</h1>')
    } else {
        const tokenCheck = req.headers.authorization;
        if(!tokenCheck){
            return res.status(403).json('<h1>user not authorized</h1>')
        } else {
            try {
                const email = jwt.verify(tokenCheck,'secret_key');
                req.user = email
                next();
            } catch (error) {
                res.status(403).json('<h1>token expired</h1>')
            }
        }
    }
}

export default verify;
