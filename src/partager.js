require('../sass/partager.scss');

import Vue2TouchEvents from 'vue2-touch-events'; //https://www.npmjs.com/package/vue2-touch-events
Vue.use(Vue2TouchEvents);
Vue.config.productionTip = false;

// Creation de l'application
function afficher_page_partager () {
  new Vue({
    el: '#container-partager',
    components: {},
    template: `
      <div id="container-partager">
        <h1>Partager</h1>
        <ul>
          <li v-for="etape in parcours">{{ etape }}</li>
        </ul>
      </div>
    `,
    data: {
      clef_encryption: 'couleurs_manifestes'
    },
    created: function () {
      this.parcours = parcours.parcours; 
    },
    methods: {},
    computed: {} 
  });
}

window.onload = afficher_page_partager; 
