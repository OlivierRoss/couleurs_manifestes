class Application extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.getOeuvres());
  }

  getOeuvres () {
    if(typeof(this.oeuvres) !== 'undefined') {
      return this.oeuvres;
    }

    else {
      $.ajax({
        url: "/oeuvres",
        success: function(result){
          console.log(result);

          this.oeuvres = result;
          document.getElementsByClassName("nom-oeuvre")[0].innerHTML = result[1][0];
          document.getElementsByClassName("contenu-dimension")[0].innerHTML = result[1][9];
        }
      });
    }
  }

  renderOeuvre() {
    return (
      <Oeuvre 
        nom="Nom oeuvre"
      />
    )
  }
  render() {
    return (
      <section className="application">
        { this.renderOeuvre() }
        <footer>
          <div className="goto">#</div>
          <div className="hasard">?</div>
          <div className="partager">partager</div>
        </footer>
      </section>
    )
  }
}
