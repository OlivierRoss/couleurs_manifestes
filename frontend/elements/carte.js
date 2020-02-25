require('../../sass/carte.scss');

export default {
  props: ['image_carte'],
  template: `
    <section class="carte" v-on:click="fermer_carte">
      <div class="bouton-fermer">
        <img class="image-fermer" src="/images/coma_fermer.svg">
      </div>
      <div class="container-carte">
        <img :src="image_carte" />
      </div>
    </section>`,
  methods: {
    fermer_carte: function () {
      this.$emit('fermer-carte');
    }
  }
};

