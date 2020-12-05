const jwt = require('jsonwebtoken');
const response = require('../controllers/responses');

require('dotenv').config();

const verify = async (ctx, next) => {
	const { authorization = null } = ctx.headers;
	if(authorization){

		const [ token] = authorization.split(' ');
		if (token !== undefined) {

		try{
			const verification = jwt.verify(token, process.env.JWT_SECRET);

			ctx.state.userId = verification.id;
			ctx.state.email = verification.email;

			return next ();
		}
		catch (err) {
			console.log(err);
			return response(ctx, 403, 'Ação proibida');
		}
	}
		
	}

	return response(ctx, 403, 'Ação proibida');
	
};
module.exports = { verify };