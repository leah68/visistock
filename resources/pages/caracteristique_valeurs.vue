/* eslint-disable eol-last */
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
      :items="caracteristique_valeurs"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="teal lighten-4">
          <v-toolbar-title>Valeurs</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="teal" dark class="mb-2" v-on="on">
                Ajouter une valeur
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.texte" label=" Texte" />
                    </v-col>
                    <template>
                      <v-container fluid>
                        <v-row align="center">
                          <v-col cols="12" sm="6">
                            <v-subheader v-text="'Matériel :'" />
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="id_materiaux"
                              :items="materiauxes"
                              :item-text="'nom'"
                              :item-value="'id'"
                              :clearable="true"
                              label="Select"
                              chips
                              hint="Choissisez un matériel"
                              persistent-hint
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </template>
                    <!-- <template>
                      <v-container fluid>
                        <v-row align="center">
                          <v-col cols="12" sm="6">
                            <v-subheader v-text="'Types :'" />
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="id_type"
                              :items="types"
                              :item-text="'nom'"
                              :item-value="'id'"
                              label="Select"
                              hint="Choissisez un type"
                              persistent-hint
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </template> -->
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="purple darken-1" text @click="close()">
                  Abandon
                </v-btn>
                <v-btn color="purple darken-1" text @click="save()">
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
        <v-btn color="teal" dark @click="getCaraVal()">
          Actualiser
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  layout: 'main',
  data () {
    return {
      search: '',
      caracteristique_valeurs: [],
      id_materiaux: [],
      materiauxes: [],
      id_type: [],
      types: [],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: true,
          value: 'id'
        },
        { text: 'Texte', value: 'texte' },
        { text: 'Matériel', value: 'nom' },
        { text: 'Type', value: 'type' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        id: '',
        texte: ''
      },
      defaultItem: {
        name: '',
        id: '',
        texte: ''
      },
      dialog: false
    }
  },

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
    this.getCaraVal()
    this.getMat()
    this.getType()
  },

  methods: {
    async getCaraVal () {
      await this.$axios.get('/api/caracteristique_valeurs').then((res) => {
        this.caracteristique_valeurs = res.data.data
      })
    },

    async getMat () {
      await this.$axios.get('/api/materiauxes').then((res) => {
        this.materiauxes = res.data.data
      })
    },

    async getType () {
      await this.$axios.get('/api/types').then((res) => {
        this.types = res.data.data
        // console.log(this.types)
      })
    },

    // async insertCaraVal (texte) {
    //   await this.$axios.post('api/caracteristique_valeurs', {
    //     texte: this.texte
    //   }).then((res) => {
    //     this.getCaraVal()
    //   })
    // },

    async editItem (item) {
      this.editedIndex = this.caracteristique_valeurs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      await this.$axios.get('/api/caracteristique_valeurs/' + item.id + '/edit').then((res) => {
        this.carvalEdit = res.data.data
        console.log(this.carvalEdit)
        if (this.carvalEdit !== null) {
          this.id_materiaux = this.carvalEdit.matnom
          // this.id_type = this.carvalEdit.type
        }
      })
    },

    async deleteItem (item) {
      const index = this.caracteristique_valeurs.indexOf(item)
      if (confirm('Voulez-vous vraiment supprimer cette valeur ?')) {
        await this.$axios.delete('/api/caracteristique_valeurs/' + item.id).then((res) => {
          this.caracteristique_valeurs.splice(index, 1)
        })
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.id_type = ''
        this.id_materiaux = ''
        this.editedIndex = -1
      })
    },

    async save (texte) {
      if (this.editedIndex > -1) {
        await this.$axios.put('/api/caracteristique_valeurs/' + this.editedItem.id, {
          texte: this.editedItem.texte
        }).then((res) => {
          this.getCaraVal()
        })
        Object.assign(this.caracteristique_valeurs[this.editedIndex], this.editedItem)
      } else {
        this.caracteristique_valeurs.push(this.editedItem)
        await this.$axios.post('api/caracteristique_valeurs', {
          texte: this.editedItem.texte,
          id_materiaux: this.id_materiaux
          // id_caracteristique: this.id_caracteristique
        }).then((res) => {
          this.getCaraVal()
        })
      }
      this.close()
    }
  }
}
</script>
