<template>
  <v-card>
    <v-card-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Rechercher"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="caracteristiques"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="teal lighten-4">
          <v-toolbar-title> {{ materiaux.nom }} </v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <!-- <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="teal"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Ajouter une valeur
              </v-btn>
            </template> -->
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="24" sm="12" md="8">
                      <v-textarea
                        v-model="editedItem.texte"
                        outlined
                        :clearable="true"
                        label="Valeur"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="close">
                  Abandon
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Sauvegarder
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="teal" dark @click="getCaraValOne()">
          Actualiser
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    search: '',
    materiaux: {},
    id_caracteristique: [],
    caracteristiques: [],
    id_carval: [],
    caracteristique_valeurs: {},
    valeur: [],
    dialog: false,
    headers: [
      {
        /* text: '#', */
        align: 'start',
        sortable: false /* ,
         value: 'id_carval' */
      },
      { text: 'Id_caractéristique', value: 'id_caracteristique' },
      { text: 'Caractéristique', value: 'nom' },
      { text: 'id_caractéristique_valeurs', value: 'id_carval' },
      { text: 'Valeur', value: 'texte' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      texte: ''
    },
    defaultItem: {
      name: '',
      texte: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Ajouter une valeur' : 'Modifier la valeur'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  mounted () {
    this.getCaraValOne()
    this.getCara()
    this.getOneMat()
    console.log(this.$route.params.id)
  },

  methods: {

    async getCaraValOne () {
      await this.$axios.get('api/materiauxes/' + this.$route.params.id + '/caracteristique_valeurs').then((res) => {
        this.caracteristique_valeurs = res.data.data
        console.log(this.caracteristique_valeurs)
      })
    },

    async getCara () {
      await this.$axios.get('api/caracteristiques/' + this.$route.params.id).then((res) => {
        this.caracteristiques = res.data.data
        console.log(this.caracteristiques)
      })
    },

    async getOneMat () {
      await this.$axios.get('api/materiauxes/' + this.$route.params.id + '/affichage').then((res) => {
        this.materiaux = res.data.data
        console.log(this.materiaux)
      })
    },

    editItem (item) {
      this.editedIndex = this.caracteristique_valeurs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem (item) {
      const index = this.caracteristique_valeurs.indexOf(item)
      if (confirm('Voulez-vous vraiment supprimer cette valeur ?')) {
        await this.$axios.delete('/api/caracteristique_valeurs/' + item.id_carval + '/delete').then((res) => {
          this.caracteristique_valeurs.splice(index, 1)
        })
        this.getCara()
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save (texte, id) {
      console.log(this.editedItem.id)
      await this.$axios.put('/api/caracteristique_valeurs/' + this.$route.params.id, {
        texte: this.editedItem.texte,
        id_materiaux: this.$route.params.id,
        id_caracteristique: this.editedItem.id_caracteristique,
        id_carval: this.editedItem.id_carval
      }).then((res) => {
        this.getCara()
      })
      this.close()
    }
  }
}
</script>
