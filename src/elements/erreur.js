Vue.component('erreur', {
  props: ['message'],
  template: `
    <section class="erreur">
      <div class="message-erreur">{{ message }}</div>
    </section>`
});

