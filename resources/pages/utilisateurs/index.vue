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
      v-model="id_utilisateurs"
      :headers="headers"
      :items="utilisateurs"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="teal lighten-4">
          <v-toolbar-title>Utilisateurs</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="teal" dark class="mb-2" v-on="on">
                Ajouter un utilisateur
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
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.prenom" label="Prénom" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="purple darken-1" text @click="close">
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
      <template v-slot:item.nom="{ item }">
        <a
          :href="'/utilisateurs/' +item.id"
          v-text="item.nom"
        />
      </template>
      <template v-slot:item.prenom="{ item }">
        <a
          :href="'/utilisateurs/' +item.id"
          v-text="item.prenom"
        />
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
      id_utilisateurs: [],
      utilisateurs: [],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: true,
          value: 'id'
        },
        { text: 'Nom', value: 'nom' },
        { text: 'Nb matériaux rattachés', value: 'materiaux' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        id: '',
        nom: '',
        prenom: ''
      },
      defaultItem: {
        name: '',
        id: '',
        nom: '',
        prenom: ''
      },
      dialog: false
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Ajouter un utilisateur' : 'Modifier un utilisateur'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  mounted () {
    this.getUsers()
  },

  methods: {
    async getUsers () {
      await this.$axios.get('/api/utilisateurs').then((res) => {
        this.utilisateurs = res.data.data
      })
    },

    editItem (item) {
      this.editedIndex = this.utilisateurs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem)
      this.dialog = true
    },

    async deleteItem (item) {
      const index = this.utilisateurs.indexOf(item)
      if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
        await this.$axios.delete('/api/utilisateurs/' + item.id).then((res) => {
          this.utilisateurs.splice(index, 1)
          console.log(item)
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

    async save (nom, prenom) {
      if (this.editedIndex > -1) {
        await this.$axios.put('/api/utilisateurs/' + this.editedItem.id, {
          nom: this.editedItem.nom,
          prenom: this.editedItem.prenom
        }).then((res) => {
          this.getUsers()
        })
        Object.assign(this.utilisateurs[this.editedIndex], this.editedItem)
      } else {
        this.utilisateurs.push(this.editedItem)
        await this.$axios.post('api/utilisateurs', {
          nom: this.editedItem.nom,
          prenom: this.editedItem.prenom
        }).then((res) => {
          this.getUsers()
        })
      }
      this.close()
    }
  }
}
</script>
