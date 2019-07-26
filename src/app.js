class Application extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.getOeuvres());
  }

  getOeuvres () {
    if(typeof(this.oeuvres) !== 'undefined') {
      return this.oeuvres;
    }
    // Integrer async await ici
    else {
      $.ajax({
        url: "/oeuvres",
        success: function(result){
          this.oeuvres = result;
          console.log(result);
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
