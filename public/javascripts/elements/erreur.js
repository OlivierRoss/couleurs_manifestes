"use strict";

Vue.component('erreur', {
  props: ['message'],
  template: "\n    <section class=\"erreur\">\n      <div class=\"message-erreur\">{{ message }}</div>\n    </section>"
});