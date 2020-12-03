const Router = require ('koa-router');
const router = new Router();

const Auth = require('./controllers/auth');

const Password = require('./middlewares/encrypt');
const Clientes = require ('./controllers/clientes');
const Usuarios = require ('./controllers/usuarios');
const Cobrancas = require('./controllers/cobrancas');
const Relatorios = require('./controllers/relatorios');


router.post('/auth', Auth.autenticar);
router.post('/usuarios', Usuarios.cadastrarUsuario);

router.get ('')
/* router.post('/auth',logarUsuario);
router.post('/usuarios'.criarUsuario);
 */



module.exports = router;