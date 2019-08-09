require('../sass/partager.scss');

import Vue2TouchEvents from 'vue2-touch-events'; //https://www.npmjs.com/package/vue2-touch-events
Vue.use(Vue2TouchEvents);
Vue.config.productionTip = false;

// Creation de l'application
function affichier_page_partager () {
  new Vue({
    el: '#container-partager',
    components: {},
    template: `<div id="container-partager"> <h1>Partager</h1></div>`,
    data: {},
    methods: {},
    computed: {} 
  });
}

window.onload = affichier_page_partager; 
