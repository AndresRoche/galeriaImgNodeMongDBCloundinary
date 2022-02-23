
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();//ensto sirve para acceder a las varibles de entorno o .env
  //aqui se aplica el modulo solo en desarrollo y no en produccion  
}


const app = require('./app');

// Servirdor
app.listen(app.get('port'), () => console.log('server coriendo en ' + app.get('port')))
