function afficher_login () {
  new Vue({
    el: '#container-partager',
    template: `
      <div id="container-partager">
        <form action="/login" method="post">
            <div>
                <label>Username:</label>
                <input type="text" name="username"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <input type="submit" value="Log In"/>
            </div>
        </form>
      </div>`
  });
}

window.onload = afficher_login; 
