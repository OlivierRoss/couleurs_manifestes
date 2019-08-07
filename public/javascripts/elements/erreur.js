Vue.component('oeuvre', {
  props: ['infos'],
  template: `
    <section class="oeuvre">
    <header>
    <div class="dimension-precedente">{{ dimension_prev }} </div>
    <div class="nom-oeuvre">{{ infos.dimensions[0].valeur }}</div>
    <div class="dimension-suivante">{{ dimension_suiv }}</div>
    </header>
    <div class="contenu-dimension"></div>
    </section>`,
  computed: {
    get_nom: function () {
      return this.infos.dimensions[0].valeur;
    },
    dimension_prev: function () {
      return this.infos.dimensions[1].nom;
    },
    dimension_suiv: function () {
      return this.infos.dimensions[2].nom;
    }
  }
});