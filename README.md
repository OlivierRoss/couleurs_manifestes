# couleurs_manifestes
Pour se connecter à l'api sheets :
* Créer identifiants sur cloudconsole pour sheets à partir d'un serveur web
* Partager le fichier visé à la nouvelle adresse
* Connexion avec "googleapis"
* Api sheets

## Étapes de déploiement
1. docker build -t cm_0 . :: Créer l'application
2. docker run -d -p 12345:3000 cm_0 :: Tester l'application
3. docker container stop PID :: Arrêter l'application
4. heroku login
5. heroku container:login
6. heroku container:push web --app couleurs-manifestes
7. heroku container:release web --app couleurs-manifestes
8. curl https://couleurs-manifestes.herokuapp.com/

## Dev
1. docker-compose up
2. npm run build

## Docs
* Setup mongo
  * https://www.w3schools.com/nodejs/nodejs_mongodb.asp
* Docker compose
  * https://devcenter.heroku.com/articles/local-development-with-docker-compose
  * https://docs.docker.com/compose/gettingstarted/

