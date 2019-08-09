require('../sass/partager.scss');

import Crypto from 'crypto-js';
import Vue2TouchEvents from 'vue2-touch-events'; //https://www.npmjs.com/package/vue2-touch-events
Vue.use(Vue2TouchEvents);
Vue.config.productionTip = false;

// Creation de l'application
function affichier_page_partager () {
  new Vue({
    el: '#container-partager',
    components: {},
    template: `<div id="container-partager"> <h1>Partager</h1></div>`,
    data: {
      clef_encryption: 'couleurs_manifestes'
    },
    created: function () {
      let parcours_encrypte = window.location.href.match(/^http.*\/p\/(.*)/)[1];
      console.log(parcours_encrypte, parcours_encrypte.length);
      this.parcours = Crypto.AES.decrypt(parcours_encrypte, this.clef_encryption).toString(Crypto.enc.Utf8);
    },
    methods: {},
    computed: {} 
  });
}

window.onload = affichier_page_partager; 
