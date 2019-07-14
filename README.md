# couleurs_manifestes

## Étapes de déploiement
1. docker build -t cm_0 . :: Créer l'application
2. docker run -d -p 12345:3000 cm_0 :: Tester l'application
3. docker container stop PID :: Arrêter l'application
4. heroku login
5. heroku container:push web --app couleurs-manifestes
6. heroku container:release web --app couleurs-manifestes
7. curl https://couleurs-manifestes.herokuapp.com/
