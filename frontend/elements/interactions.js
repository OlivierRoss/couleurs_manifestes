import NumeroOeuvre from "./numero_oeuvre.js";
import OeuvreAleatoire from "./oeuvre_aleatoire.js";

require("../../sass/interactions.scss");

export default {
  props: ['infos', 'parcours', 'temps_debut', 'oeuvres'],
  components: {
    numero_oeuvre: NumeroOeuvre,
    oeuvre_aleatoire: OeuvreAleatoire
  },
  template: `
    <footer id="footer">
      <div class="menu-principal">
        <div v-on:click="toggle('loupe')" class="icone" ref="container_icone_loupe">
          <img src="/images/Visuels/Autre/coma_loupe-footer.svg" />
        </div>
        <div v-on:click="toggle('aleatoire')" class="icone" ref="container_icone_aleatoire">
          <img src="/images/Visuels/Autre/coma_des-footer.svg" />
        </div>
        <div v-on:click="toggle('partage')"class="icone" style="display:none;" ref="container_icone_partage">
          <img src="/images/Visuels/Autre/coma_partage-footer.svg" />
        </div>
        <div v-on:click="toggle('info')" class="icone" ref="container_icone_info">
          <img src="/images/Visuels/Autre/coma_info-footer.svg" />
        </div>
      </div>
      <div id="flou"></div>
      <div id="panneau-loupe" ref="panneau_loupe" class="panneau-interaction">
        <div id="info-loupe">
          <img src="/images/Visuels/Autre/coma_icone-NB.svg" />
          <span class="texte-info-loupe">Entrer le # de l'oeuvre</span>
        </div>
        <div class="numero">
          <numero_oeuvre ref="loupe" @nouvelle-oeuvre="selectionner" :oeuvres="oeuvres" />
        </div>
      </div>
      <div id="panneau-aleatoire" ref="panneau_aleatoire" class="panneau-interaction">
        <div class="container-selecteur-oeuvre">
          <oeuvre_aleatoire @nouvelle-oeuvre-aleatoire="oeuvre_aleatoire" text="Selection d'une oeuvre aleatoire ..." />
        </div>
      </div>
      <div id="panneau-partage" ref="panneau_partage" class="panneau-interaction">
        <img class="background-partage" src="/images/Visuels/Accueil/coma_logo-accueil.svg">
        <p>
          Lors de ma visite<br>
          j'ai vu {{ this.nombre_oeuvres }} oeuvres
          par 8 artistes.<br>
          j'ai étudié 5 courants<br>
          artistiques se déclinant<br> 
          en 4 couleurs.<br>
          Le tout en {{ this.temps_parcours }} minutes
        </p>
        <div class="partager">
          <img src="/images/fb.jpg" @click="partager">
        </div>
      </div>
      <div id="panneau-info" ref="panneau_info" class="panneau-interaction">
        <div id="logos-expo">
          <img src="/images/Visuels/Autre/coma_logo-info.svg">
          <img src="/images/Visuels/Autre/coma_logo-mbas.svg">
        </div>
          <p id="texte-sommaire">
            L’intensité de Couleurs Manifestes se révèle dans le pouvoir d’interpellation, de transmission de sens et de symboliques de la couleur, vu à travers une cinquantaine d’oeuvres de la collection du Musée des beaux-arts de Sherbrooke.
          </p>
          <p id="texte-descriptif">
            Que ce soient les «partisans» bleus, blancs et rouges de Serge Lemoyne, le poignant rouge carmin d’André Fournelle, les chauds ciels orangés de Peter Krausz ou la personnalité colorée d’Armand Vaillancourt, des oeuvres aux couleurs, techniques, matériaux et époques variés s’y trouvent en relation, sans contrainte chronologique. 
            <br><br>
            Jeu de correspondance de sens entre le contexte de production des oeuvres et leur contexte actuel de réception, Couleurs Manifestes vous convie dans un rapport dynamisé entre vous et le Musée.
          </p>
      </div>
    </footer>
  `,

  data: function () {
    return {
      loupe: {
        actif: false
      },
      aleatoire: {
        actif: false
      },
      partage: {
        actif: false
      },
      info: {
        actif: false
      }
    }
  },

  methods: {
    cacher_panneaux: function () {
      for(var icone in this._data) {
        this.$refs['panneau_' + icone].style.display = "none";
        this.$refs["container_icone_" + icone].style.opacity = 0.35;
        this[icone].actif = false;
      }
    },
    toggle: function(nom) {

      if(!this[nom].actif) {

        // Reset
        this.cacher_panneaux();

        // Rendre actif
        this.$refs['panneau_' + nom].style.display = "block";
        this.$refs["container_icone_" + nom].style.opacity = 1;
        this[nom].actif = true;

        if(nom == 'loupe') {
          document.getElementById("container-application").style.display = "block";
          document.getElementById("erreur-orientation").style.display = "none";
          this.$children[0].focus_couleur(); // TODO ne fonctionne pas
        }
      }
      // Rendre inactif
      else {
        if(nom == 'loupe') {
          document.getElementById("container-application").style.display = "";
          document.getElementById("erreur-orientation").style.display = "";
        }
        return this.cacher_panneaux();
      }
    },
    oeuvre_aleatoire: function () {
      this.$emit('set-actif', { oeuvre: -1 });
      this.toggle('aleatoire');
    },
    selectionner: function (oeuvre) {
      this.$emit('set-actif', { oeuvre: oeuvre });
      this.toggle('loupe');
    },
    partager: function () {
      this.$emit('partager');
    }
  },

  computed: {
    nombre_oeuvres: function () {
      return this.parcours.length;
    },
    temps_parcours: function () {
      return Date.now() - this.temps_debut; 
    }
  }
};
