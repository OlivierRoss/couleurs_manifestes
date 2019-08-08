export default {
  props: ["passer_valeur_initiale"],
  template: `
    <section class="accueil" v-on:click="selection_initiale">
    <h1>Couleurs manifestes</h1>
    <p>Cliquez pour entrer</p>
    <div class="tile--css_animations__demo6">
      <div></div>
    </div>
    </section>
  `,

  methods: {
    selection_initiale: function (event) {
      this.passer_valeur_initiale(10); // TODO retourner la valeur qui lancera l'application
    }
  }

};
