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
      :items="emplacements"
      :search="search"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="teal lighten-4">
          <v-toolbar-title>Emplacement</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="teal"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Ajouter un emplacement
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
                      <v-text-field v-model="editedItem.nom" label="Nom" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="purple darken-1" text @click="close">
                  Abandon
                </v-btn>
                <v-btn color="purple darken-1" text @click="save">
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
        <v-btn color="teal" dark @click="getEmplacement()">
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
      emplacements: [],
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
      return this.editedIndex === -1 ? 'Ajouter un emplacement' : 'Modifier un emplacement'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  mounted () {
    this.getEmplacement()
  },

  methods: {

    async getEmplacement () {
      await this.$axios.get('api/emplacements').then((res) => {
        this.emplacements = res.data.data
      })
    },

    async deleteItem (item) {
      const index = this.emplacements.indexOf(item)
      if (confirm('Voulez-vous vraiment supprimer cet emplacement ?')) {
        await this.$axios.delete('/api/emplacements/' + item.id).then((res) => {
          this.emplacements.splice(index, 1)
        })
      }
    },

    editItem (item) {
      this.editedIndex = this.emplacements.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
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
        await this.$axios.put('/api/emplacements/' + this.editedItem.id, {
          nom: this.editedItem.nom
        }).then((res) => {
          this.getEmplacement()
        })
        Object.assign(this.emplacements[this.editedIndex], this.editedItem)
      } else {
        this.emplacements.push(this.editedItem)
        await this.$axios.post('api/emplacements', {
          nom: this.editedItem.nom
        }).then((res) => {
          this.getEmplacement()
        })
      }
      this.close()
    }
  }
}
</script>
