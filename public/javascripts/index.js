Vue.config.productionTip = false;

window.onload = function () {
    var cm = new Vue({
        el: '#container-application',
        template: '<accueil />',
        data: {
            etat: 'accueil'
        }
    });
};