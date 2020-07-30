/* eslint-disable eol-last */
<template>
  <div>
    <div>
      <template>
        <v-card
          class="mx-auto"
          max-width="500"
          tile
        >
          <v-img
            height="100%"
            src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
          >
            <v-row
              align="end"
              class="fill-height"
            >
              <v-col
                align-self="start"
                class="pa-0"
                cols="12"
              >
                <v-avatar
                  class="profile"
                  color="grey"
                  size="164"
                  tile
                >
                  <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg" />
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item
                  color="rgba(0, 0, 0, .4)"
                  dark
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="title"
                    >
                      {{ utilisateur.nom }} {{ utilisateur.prenom }}
                    </v-list-item-title>

                    <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </template>
    </div>
    <div>
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
          :items="utilisateurs_materiaux"
          :search="search"
          :item-value="'id'"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="teal lighten-4">
              <v-toolbar-title>Matériaux</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              />
              <v-spacer />
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="teal" dark class="mx-2" v-bind="attrs" v-on="on">
                    Ajouter du matériel
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <template>
                    <div>
                      <v-data-table
                        :headers="headers_mat"
                        :items="materiauxes"
                        :item-value="'id'"
                        class="elevation-1"
                      >
                        <template v-slot:item.id_materiaux="{ item }">
                          <v-simple-checkbox
                            v-model="id_materiaux[item.id]"
                            active
                            multiple-active
                            item.key:id_materiaux
                            :value="id_materiaux"
                            return-object
                          />
                        </template>
                      </v-data-table>
                    </div>
                  </template>
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
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:item.nom="{ item }">
            <a
              :href="'/materiauxes/'"
              v-text="item.nom"
            />
          </template>
          <template v-slot:no-data>
            <v-btn color="teal" dark @click="getOneUser()">
              Actualiser
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'main',
  data () {
    return {
      post: null,
      search: '',
      id_materiaux: {},
      materiauxes: [],
      headers_mat: [
        {
          text: 'Matériaux',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Nom', value: 'nom' },
        { text: 'Actions', value: 'id_materiaux', sortable: false }
      ],
      utilisateur: {},
      utilisateurs_materiaux: [],
      headers: [
        {
          text: 'Matériaux',
          align: 'start',
          sortable: false,
          value: 'utilisateursnom'
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
      dialog: false,
      selectable: false
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Ajouter du matériel' : ''
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  mounted () {
    this.getOneUser()
    this.getMat()
    this.getUserMat()
    console.log(this.id_materiaux)
  },

  methods: {

    async getOneUser () {
      await this.$axios.get('/api/utilisateurs/' + this.$route.params.id).then((res) => {
        this.utilisateur = res.data.data
        console.log(this.utilisateur)
      })
    },

    async getUserMat () {
      await this.$axios.get('/api/utilisateurs/' + this.$route.params.id + '/materiaux').then((res) => {
        this.utilisateurs_materiaux = res.data.data
      })
    },

    async getMat () {
      await this.$axios.get('/api/materiauxes/' + this.$route.params.id).then((res) => {
        this.materiauxes = res.data.data
      })
    },

    async deleteItem (item) {
      const index = this.utilisateurs_materiaux.indexOf(item)
      if (confirm('Voulez-vous vraiment enlever ce matériel de votre liste ?')) {
        await this.$axios.put('/api/materiauxes/' + this.$route.params.id + '/' + item.id).then((res) => {
          this.utilisateurs_materiaux.splice(index, 1)
          console.log(item)
          this.getMat()
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

    async save (item) {
      console.log(this.id_materiaux)
      console.log(this.materiauxes)
      await this.$axios.put('/api/utilisateurs/' + this.$route.params.id + '/materiaux', {
        id_utilisateur: this.$route.params.id,
        id_materiaux: this.id_materiaux
      }).then((res) => {
        this.getUserMat()
        this.getMat()
      })
      this.close()
    }
  }
}
</script>
