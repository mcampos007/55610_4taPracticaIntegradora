import CustomRouter from './custom/custom.router.js';
import { validateUser } from '../utils/validateUser.js';
import {
  getAll,
  current,
  premiumUserChange,
  adminUser,
  login,
  register,
  logout,
  save,
  findById,
  updateDocument,
  //sendLinkToPasswordReset,
} from '../controllers/users.controller.js';
import { uploadFiles } from '../helpers/multer.js';
export default class UsersExtendRouter extends CustomRouter {
  init() {
    /*====================================================
                    EJEMPLO de como se conecta con el CustomRouter
                    --> this.verboHTTP(path, policies, ...callbacks);                   
        =====================================================*/

    this.get('/', ['ADMIN'], getAll);

    this.post('/register', ['PUBLIC'], validateUser, register);

    this.post('/login', ['PUBLIC'], login);

    //Logout
    this.get('/logout', ['USER', 'ADMIN', 'PREMIUM'], logout);

    this.get('/current', ['USER', 'PREMIUM', 'ADMIN'], current);

    this.post('/premium/:uid', ['USER', 'PREMIUM'], premiumUserChange);

    this.get('/adminUser', ['ADMIN'], adminUser);

    this.post(
      '/:pid/documents',
      ['USER', 'PREMIUM', 'ADMIN'],
      uploadFiles.single('profile'),
      async (req, res) => {
        try {
          if (!req.file) {
            return res
              .status(400)
              .send({ status: 'error', mensaje: 'No se adjunto archivo.' });
          }

          const { pid } = req.params;

          const user = await findById(req, res);
          if (user) {
            const { filename: name, path: reference } = req.file;
            const newDocument = {
              name: name,
              reference: reference,
            };

            if (!user.documents) {
              user.documents = [];
            }
            console.log(user);
            console.log(req.user);

            user.documents.push(newDocument);
            const data = { pid: pid, newDocument: newDocument };
            const result = await updateDocument(data, res);
            //console.log(result);
            res.send(result);
          }

          //
          //
          //   // Crear un nuevo documento con la información obtenida
          //
          //   // Agregar el nuevo documento al arreglo 'documents' del usuario
          //

          //   console.log(user);

          //   // Guardar los cambios en la base de datos utilizando el controlador de usuario
          //
          //   console.log('volvi');
          // console.log(result);
          //res.send({ status: 'OK' });
          //}
          //// quiero agregar informacion a la coleccionde usuarios
          // res
          //   .status(200)
          //   .send({ status: 'ok', mensaje: 'Avatar subido satisfactoriamente' });
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      }
    );
  }
}
