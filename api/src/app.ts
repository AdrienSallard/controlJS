import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interface/controller.interface';

class App {
  public app: express.Application;
 
  constructor(controllers: Controller[]) {
    this.app = express();
 
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json());
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
      next()
  })
  }
 
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  private connectToTheDatabase() {
    const { MONGO_URI } = process.env
        mongoose.connect(`${MONGO_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => {
            console.log('Connexion MongoDB réussie')
        })
        .catch(() => {
            console.log('Connexion MongoDB échoué')
        })
  }
}
 
export default App;