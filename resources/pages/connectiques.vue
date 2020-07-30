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
      :items="connectiques"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="teal lighten-4">
          <v-toolbar-title>Connectiques</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="teal" dark class="mb-2" v-on="on">
                Ajouter une connectique
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
                      <v-text-field v-model="editedItem.type" label="Type" />
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
        <v-btn color="teal" dark @click="getConnectiques()">
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
      connectiques: [],
      headers: [
        {
          text: 'Connectiques',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Type', value: 'type' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        id: '',
        type: ''
      },
      defaultItem: {
        name: '',
        id: '',
        type: ''
      },
      dialog: false
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Ajouter une connectique' : 'Modifier la connectique'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  mounted () {
    this.getConnectiques()
  },

  methods: {
    async getConnectiques () {
      await this.$axios.get('/api/connectiques').then((res) => {
        this.connectiques = res.data.data
      })
    },

    async insertConnectiques (type) {
      await this.$axios.post('api/connectiques', {
        type: this.type
      }).then((res) => {
        this.getConnectiques()
      })
    },

    editItem (item) {
      this.editedIndex = this.connectiques.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem)
      this.dialog = true
    },

    async deleteItem (item) {
      const index = this.connectiques.indexOf(item)
      if (confirm('Voulez-vous vraiment supprimer cette connectique ?')) {
        await this.$axios.delete('/api/connectiques/' + item.id).then((res) => {
          this.connectiques.splice(index, 1)
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

    async save (type) {
      if (this.editedIndex > -1) {
        await this.$axios.put('/api/connectiques/' + this.editedItem.id, {
          type: this.editedItem.type
        }).then((res) => {
          this.getConnectiques()
        })
        Object.assign(this.connectiques[this.editedIndex], this.editedItem)
      } else {
        this.connectiques.push(this.editedItem)
        await this.$axios.post('api/connectiques', {
          type: this.editedItem.type
        }).then((res) => {
          this.getConnectiques()
        })
      }
      this.close()
    }
  }
}
</script>
