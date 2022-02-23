const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const { create } = require("express-handlebars");


// Initializatios
const app = express();
require('./database.js');
const hbs = create({ //configuramos el nuevo motor de html es como un ejs pero hbs
  extname: 'hbs',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  defaultLayout: false
});

// Settings
app.set('port', process.env.POST || 3000);  //puerto
app.set('views', path.join(__dirname, 'views')); //le indicamos donde esta index.htmls
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


// middlemares
app.use(morgan('dev'));//con dev envia mensajes corto en el servidor
app.use(express.json());//para que pueda entender los formatos json
app.use(express.urlencoded({extended: false}));//para que solo procese string
const storage = multer.diskStorage({//configuracion de multer
  destination: path.join(__dirname, 'public/upload'), //donde queramos que se guarden la imagenes
  filename: (req, file, cb)=> {
    //usamo el callbacks (primer parametro error)
    //el new Date().getTime() nos lanza unos numero determinado por los milisegundos
    //el path.extname(file.originalname))=> first file.originalname aggara el nombre originalname
    // y path extname agarra solo la extencion
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
})
//el storage en la configuracion de arriba que se lo pasamos a multer
app.use(multer({storage: storage}).single('image'));//multer ve si estamos enviar una image



//ROUTER
app.use(require('./router/router.js'));




// files static
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
