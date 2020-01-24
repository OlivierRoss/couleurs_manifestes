export default {
  props: ['image_carte'],
  template: `
    <section class="carte">
      <div class="container-carte">
        <img :src="image_carte" />
    </div>
    </section>`
};

