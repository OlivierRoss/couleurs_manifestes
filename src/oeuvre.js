class Oeuvre extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="oeuvre">
        <header>
          <div className="dimension-precedente">Politique</div>
          <div className="nom-oeuvre">Nom</div>
          <div className="dimension-suivante">Biographie</div>
        </header>
        <div className="contenu-dimension"></div>
      </article>
    )
  }
}
