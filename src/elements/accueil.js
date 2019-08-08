var VueTouch = require('vue-touch');
Vue.use(VueTouch, {name: 'v-touch'}); //https://github.com/vuejs/vue-touch/tree/next

export default {
  props: ["passer_valeur_initiale"],
  template: `
    <v-touch class="accueil flex" v-on:tap="selection_initiale">
      <img v-on:click="selection_initiale" v-on:tap="selection_initiale" src="/images/logo_cm.jpg">
    </v-touch>
  `,

  methods: {
    selection_initiale: function (event) {
      this.passer_valeur_initiale(event); // TODO retourner la valeur qui lancera l'application
    }
  }

};
