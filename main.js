/* Main inports / require
----- */
const express = require('express');
const app = express();
const dir = __dirname + '/';
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');

// Allows the use of enviorment variables
require('dotenv').config();

/* Middlewares
----- */

// show (in console) all types of requests and statuses
const logger = require('morgan');
app.use(logger('dev'));

// Grants access to get and body variabels

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./static'));
app.use(cookieParser());

//

/* Conncet and initiate DataBase [MongoDB]
----- */

const uri = process.env.URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect();

//

/* Application initiation process 
----- */

const PORT = process.env.PORT || 5500;

//

/* Database connection function
----- */

async function connect() {
  const connection = await client.connect();
  const db = client.db('CoffeeBooks');
  const bookList = db.collection('BookList');
  const userList = db.collection('users');

  // middleWares();

  app.listen(PORT, console.log(`-- Server is running on PORT: ${PORT} --`));

  require(dir + 'routes.js')(bookList, userList, express, app);
}

/* Random particels of air and comments
----- */

/*

  TODO: Get gud


? status codes:
500 - server problem
404 - client problem
400 - Bad Request; The server cannot or will not process the request due to an apparent client error 
304 - all ok, not modified
201 - created
200 - all ok

https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_client_errors
*/

/* Resources
-----

-- Main resource --
• MongoDB, incl: API, JWT, ENV, ROUTES, LOGIN: https://replit.com/@RichardTE18IT/2021-03-24RegUser-with-MongoDB#index.js

• Handlebars: 'D:\Program\OneDrive - Halmstads kommun\Te18IT\Webbserverprogramering 1\Node-Js\2021-02-15-handlebars' index.js

-- Other --
• Node Startup, incl MW: https://replit.com/@RichardTE18IT/nodeonsdag21-02-10#index.js 
• Filesystem (fs) [probably not needed]: 'D:\Program\OneDrive - Halmstads kommun\Te18IT\Webbserverprogramering 1\Node-Js\2021-03-23_rep\main.js'
-- Startups --
• Node Startup: https://replit.com/@RichardTE18IT/21-02-16NodeTraining#index.js
• Node Startup: https://replit.com/@RichardTE18IT/nodetuesday21-02-10#index.js 
• Cookies: D:\Program\OneDrive - Halmstads kommun\Te18IT\Webbserverprogramering 1\Node-Js\2021-02-17_Cookies
 */
// Sync vs extension https://itnext.io/settings-sync-with-vs-code-c3d4f126989
/*
git config --global user.name "AUserName" // username set 
 git config --global user.name "E@mail.com" //email set 

git --version //checks version
init git // creatre master bash with ./.git, done once
git add . // adds all files to 'git-plan-to-comit-changes'
git add "index.js" // adds only index.js to git
git commit -m"Change Notes" //commits the git

git status // checks satus of files

// if you have a secure file, like password. create a '.gitignore' file in which you'll just add the name of document, more files-ignore is seperated by new lines. You can also add a whole dir of the mat. '.gitignore' must be in root

//--- upload to github --

git remote add origin https://github.com/CuteFoxPaw/testerVisual.git

git remote // gets origin

git push origin master // uploads code, master root-doc = brach, origin = github address

git clone origin master// get project, used firts time
git pull origin master// gets changes


// reset local branch
  https://stackoverflow.com/questions/1125968/how-do-i-force-git-pull-to-overwrite-local-files 
*/
/* Usage

#Replace console.log
console.log = require('./path-to-vendor/vendor/no_indent_logger')(console.log)

#as log
const log = require('./path-to-vendor/vendor/no_indent_logger')(console.log)

*/
