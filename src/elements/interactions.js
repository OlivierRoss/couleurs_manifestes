require("../../sass/interactions.scss");

export default {
  //https://jqueryui.com/autocomplete/#combobox
  template: `
    <footer class="footer-oeuvre">
      <div v-if="mode == 'general'" class="flex menu-principal">
        <div v-on:click="mode_selection"><img src="/images/diese.svg" /></div>
        <div v-on:click="oeuvre_aleatoire"><img src="/images/question.svg" /></div>
        <div v-on:click="partager"><img src="/images/partager.svg" /></div>
      </div>
      <div v-if="mode == 'selection'" class="flex selection">
        <div v-on:click="mode_general"><img src="/images/diese.svg" /></div>
        <div class="input-container"><input v-on:change="selectionner" type="number" /></div>
      </div>

    </footer>
  `,
  data: function () {
    return {
      mode: "general"
    }
  },

  methods: {
    oeuvre_aleatoire: function () {
      this.$emit('update-oeuvre', null);
    },
    mode_general: function () {
      this.mode = 'general';
    },
    mode_selection: function () {
      this.mode = 'selection';
    },
    selectionner: function (event) {
      this.$emit('update-oeuvre', event.target.value);
    },
    partager: function () {
      this.$emit('partager');
    }
  }
};
