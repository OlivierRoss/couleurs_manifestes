export default function isLoggedIn(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  response.redirect('/login');
}
