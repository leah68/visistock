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
      :items="caracteristiques"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="teal lighten-4">
          <v-toolbar-title>Caractéristiques</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="teal" dark class="mb-2" v-on="on">
                Ajouter une caractéristique
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
        <v-btn color="teal" dark @click="getUsers()">
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
      caracteristiques: [],
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
      return this.editedIndex === -1 ? 'Ajouter une caractéristique' : 'Modifier une caractéristique'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  mounted () {
    this.getCara()
  },

  methods: {
    async getCara () {
      await this.$axios.get('/api/caracteristiques').then((res) => {
        this.caracteristiques = res.data.data
      })
    },

    async insertUsers (nom) {
      await this.$axios.post('api/caracteristiques', {
        nom: this.nom
      }).then((res) => {
        this.getCara()
      })
    },

    editItem (item) {
      this.editedIndex = this.caracteristiques.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem)
      this.dialog = true
    },

    async deleteItem (item) {
      const index = this.caracteristiques.indexOf(item)
      if (confirm('Voulez-vous vraiment supprimer cette caractéristique ?')) {
        await this.$axios.delete('/api/caracteristiques/' + item.id).then((res) => {
          this.caracteristiques.splice(index, 1)
        })
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save (nom) {
      if (this.editedIndex > -1) {
        await this.$axios.put('/api/caracteristiques/' + this.editedItem.id, {
          nom: this.editedItem.nom
        }).then((res) => {
          this.getCara()
        })
        Object.assign(this.caracteristiques[this.editedIndex], this.editedItem)
      } else {
        this.caracteristiques.push(this.editedItem)
        await this.$axios.post('api/caracteristiques', {
          nom: this.editedItem.nom
        }).then((res) => {
          this.getCara()
        })
      }
      this.close()
    }
  }
}
</script>
