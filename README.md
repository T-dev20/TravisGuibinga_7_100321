# GROUPOMANIA

Ce projet utilise pour son Backend : Node.js avec Express, MySql et l'ORM Sequelize.
Ce projet utilise pour son Frontend : Vue.js, HTML5, Sass et Bootstrap4.

## INSTALLATION

Veuillez cloner ce référentiel: il vous fournira les deux dossiers nécessaires: backend et frontend.
Vous devrez avoir NodeJs, MySQL et Vue CLI installés localement sur votre machine.

### Pour lancer le Backend qui utilise MySQL (prérequis) et s'exécute sur le localhost 3000:

1 / Allez dans le dossier "<nom_dossier> / backend" et créez un fichier '.env' dans lequel vous écrirez:
DB_HOST = (ex.localhost)
DB_USER = (votre nom d'utilisateur)
DB_PASSWORD = (votre mot de passe lié au nom d'utilisateur)
DB = (pas une base de données MySQL que vous avez déjà ex.groupomania)

2 / Allez dans le dossier "database", entrez dans le fichier db.sql et copiez le code(L1-L76) pour créer la base de données et ses différentes tables depuis un client Mysql.

P.S : Le reste du code(L77-L79) devra être exécuté après avoir créer le 1er utilisateur depuis le front de l'application.

3 / Exécutez "npm install", puis exécutez "nodemon server".


### Pour lancer le serveur frontal qui s'exécute sur le localhost 8080:

1/ Allez dans le dossier "<nom_dossier> / frontend" et exécutez "npm install", puis exécutez "npm run serve".

2/ Gardez les deux terminaux en marche, puis allez à l'adresse http://localhost:8080/
