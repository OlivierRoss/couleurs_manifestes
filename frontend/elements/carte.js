require('../../sass/carte.scss');

export default {
  props: ['image_carte'],
  template: `
    <section class="carte">
      <div class="bouton-fermer" v-on:click="fermer_carte">
        X
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

