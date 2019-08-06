Vue.component('accueil', {
  template: `<section class="accueil flex"> <img v-on:click="selection_initiale" src="/images/logo_cm.jpg"> </section>`,

  methods: {
    selection_initiale: function (event) {
      // TODO retourner la valeur qui lancera l'application
      this.$emit("element_depart_selectionne", "rouge");
    }
  }

});
