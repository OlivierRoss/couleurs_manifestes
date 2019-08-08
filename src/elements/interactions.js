require("../../sass/interactions.scss");

export default {
  template: `
    <footer class="flex footer-oeuvre">
      <div><img src="/images/diese.svg" /></div>
      <div v-on:click="oeuvre_aleatoire"><img src="/images/question.svg" /></div>
      <div><img src="/images/partager.svg" /></div>
    </footer>
  `,

  methods: {
    oeuvre_aleatoire: function () {
      this.$emit('update-oeuvre', null);
    }
  }
};
