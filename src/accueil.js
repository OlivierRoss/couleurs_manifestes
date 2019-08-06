class Accueil extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="accueil flex">
        <img 
          src="/images/logo_cm.jpg" 
          onClick={this.props.onClick}
        />
      </article>
    );
  }
}
