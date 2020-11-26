const Router = require ('koa-router');
const router = new Router();

const Auth = require(';/controllers/auth');
const Users = require ('./controllers/cobrancas');

router.post('/auth', Auth.autenticar);
router.get ('cobracas', Users.listarCobrancas)
/* router.post('/auth',logarUsuario);
router.post('/usuarios'.criarUsuario);
 */



module.exports = router;