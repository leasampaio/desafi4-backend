const Router = require ('koa-router');
const router = new Router();

//const Auth = require('./controllers/auth');
const Password = require('./middlewares/encrypt');
const Clientes = require ('./controllers/clientes');
const Usuarios = require ('./controllers/usuarios');
const Cobrancas = require('./controllers/cobrancas');
//const Relatorios = require('./controllers/relatorios');


//router.post('/auth', Auth.autenticar);
router.post('/usuarios',Password.encrypt, Usuarios.cadastrarUsuario);
router.get('/clientes',Clientes.novo);
router.put('/clientes',Clientes.editarDados);
router.post('/clientes', Clientes.listarEBuscar);
router.get('/cobrancas', Cobrancas.criar);
router.put('/cobrancas', Cobrancas.pagar);
router.post('cobrancas', Cobrancas.criar);


module.exports = router;