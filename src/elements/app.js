class Application extends React.Component {
  constructor(props) {
    // Initialisation
    super(props);
    this.state = {
      oeuvres: [],
      state: "init"
    }

    // Chargement des oeuvres
    this.state.oeuvres = this.charger_oeuvres();
  }

  charger_oeuvres () {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "/oeuvres",
        success: (result) => { resolve(result); },
        error: (err) => {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  render_accueil () {
    return (
      <Accueil 
        onClick={() => this.showApplication()}
      />
    );
  }

  showApplication () {
    // Cacher l'accueil
    test = document.getElementsByClassName("acceuil")[0];
    document.getElementsByClassName("acceuil")[0].style.opacity = 0;
  }

  renderOeuvre(index) {
    return (
      <Oeuvre />
    );
  }

  renderFooter() {
    return (
      <footer>
        <div className="goto">#</div>
        <div className="hasard">?</div>
        <div className="partager">partager</div>
      </footer>
    );
  }

  render() {
    return (
      <section className="application">
        { this.render_accueil() }
      </section>
    );
  }
}
