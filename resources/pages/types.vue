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
      :items="types"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="teal lighten-4">
          <v-toolbar-title>Types</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="teal" dark class="mb-2" v-on="on">
                Ajouter un type
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
                      <v-text-field v-model="editedItem.nom" label=" Nom" />
                    </v-col>
                    <template>
                      <v-container fluid>
                        <v-row align="center">
                          <v-col cols="12" sm="6">
                            <v-subheader v-text="'Caracteristiques :'" />
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="id_caracteristique"
                              :items="caracteristiques"
                              :item-text="'nom'"
                              :item-value="'id'"
                              label="Select"
                              multiple
                              chips
                              hint="Choissisez une ou plusieurs caractéristiques"
                              persistent-hint
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </template>
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
        <v-btn color="teal" dark @click="getTypes()">
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
      id_caracteristique: [],
      caracteristiques: [
        { value: 'nom' }
      ],
      types: [],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: true,
          value: 'id'
        },
        { text: 'Nom', value: 'nom' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        id: '',
        nom: ''
      },
      defaultItem: {
        name: '',
        id: '',
        nom: ''
      },
      dialog: false
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Ajouter un type' : 'Modifier le type'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  mounted () {
    this.finishload = false
    this.getTypes()
    this.getCara()
    console.log(this.caracteristiques)
  },

  methods: {
    async getTypes () {
      await this.$axios.get('/api/types').then((res) => {
        this.types = res.data.data
      })
    },

    async getCara () {
      await this.$axios.get('/api/caracteristiques').then((res) => {
        this.caracteristiques = res.data.data
        console.log(res.data.data)
        this.finishload = true
      })
    },

    async editItem (item) {
      this.editedIndex = this.types.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem)
      this.dialog = true
      await this.$axios.get('/api/caracteristiques/' + item.id + '/edit').then((res) => {
        this.caracteristiquesEdit = res.data.data
        console.log(this.caracteristiquesEdit)
        if (this.caracteristiquesEdit !== null) {
          this.id_caracteristique = []
          for (const i in this.caracteristiquesEdit) {
            this.id_caracteristique.push(this.caracteristiquesEdit[i])
            console.log(this.caracteristiquesEdit[i])
          }
        }
      })
    },

    async deleteItem (item) {
      const index = this.types.indexOf(item)
      if (confirm('Voulez-vous vraiment supprimer ce type ?')) {
        await this.$axios.delete('/api/types/' + item.id).then((res) => {
          this.types.splice(index, 1)
        })
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.id_caracteristique = ''
        // this.id_caracteristique = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save (nom) {
      console.log(this.id_caracteristique)
      if (this.editedIndex > -1) {
        await this.$axios.put('/api/types/' + this.editedItem.id, {
          nom: this.editedItem.nom,
          id_caracteristique: this.id_caracteristique
        }).then((res) => {
          this.getTypes()
        })
        Object.assign(this.types[this.editedIndex], this.editedItem)
      } else {
        this.types.push(this.editedItem)
        if (this.finishload === true) {
          await this.$axios.post('api/types', {
            nom: this.editedItem.nom,
            id_caracteristique: this.id_caracteristique
          }).then((res) => {
            this.getTypes()
          })
        }
      }
      this.close()
    }
  }
}
</script>
