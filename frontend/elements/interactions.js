/*
 * TODO Voir les methodes ici : https://vuejs.org/v2/guide/transitions.html#Staggering-List-Transitions
 * pour de l'inspiration concernant le peaufinage des transitions
 */


require("../../sass/interactions.scss");

export default {
  props: ['infos'],
  //https://jqueryui.com/autocomplete/#combobox
  template: `
    <footer class="footer-oeuvre">
      <div class="menu-principal">
        <div v-on:click="mode_selection = !mode_selection" :class="['icone', 'diese', {gauche: mode_selection}]">
          <img src="/images/diese.svg" />
        </div>
        <transition :duration="{enter: 2500, leave: 500 }" name="fade">
          <div v-show="!mode_selection" v-on:click="oeuvre_aleatoire" class="icone question">
            <img src="/images/question.svg" />
          </div>
        </transition>
        <transition :duration="{enter: 2500, leave: 500 }" name="fade">
          <div v-show="!mode_selection" v-on:click="partager" class="icone partager">
            <img src="/images/partager.svg" />
          </div>
        </transition>
        <transition :duration="{enter: 2500, leave: 500 }" name="fade">
          <div v-show="mode_selection" :class="['input-container', {droite: mode_selection}]">
            <input v-on:change="selectionner" type="number" />
          </div>
        </transition>
      </div>
    </footer>
  `,

  data: function () {
    return {
      mode_selection: false
    }
  },

  methods: {
    oeuvre_aleatoire: function () {
      let liens = this.infos.dimension_active.liens;
      this.$emit('set-actif', { 
        id_oeuvre: liens[Math.floor(Math.random() * liens.length)].id,
        id_dimension: this.infos.dimension_active.id 
      });
    },
    selectionner: function (event) {
      this.$emit('set-actif', { 
        id_oeuvre: parseInt(event.target.value)
      });
    },
    partager: function () {
      this.$emit('partager');
    }
  }
};
