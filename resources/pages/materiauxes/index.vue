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
      :items="materiauxes"
      :search="search"
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
            <template v-slot:activator="{ on }">
              <v-btn color="teal" dark class="mb-2" v-on="on">
                Ajouter un matériel
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
                    <template>
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
                              @change="getCaraTypes()"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </template>
                    <v-list>
                    <!-- <v-list-item v-for="(caracteristique, i) in caracteristiques" :key="i" @click="getCaraTypes()">
                        <v-text-field :model="caracteristique_value[caracteristique.id_caracteristique]" :label="caracteristique.nom" />
                      </v-list-item> -->
                    </v-list>
                    <template>
                      <v-container fluid>
                        <v-row align="center">
                          <v-col cols="12" sm="6">
                            <v-subheader v-text="'Connectiques :'" />
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="id_connectique"
                              :items="connectiques"
                              :item-text="'type'"
                              :item-value="'id'"
                              :clearable="true"
                              label="Select"
                              chips
                              multiple
                              hint="Choissisez une ou plusieurs connectiques"
                              persistent-hint
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </template>
                    <template>
                      <v-container fluid>
                        <v-row align="center">
                          <v-col cols="12" sm="6">
                            <v-subheader v-text="'Utilisateurs :'" />
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="id_utilisateur"
                              :items="utilisateurs"
                              :item-text="'nom'"
                              :item-value="'id'"
                              :clearable="true"
                              label="Select"
                              chips
                              hint="Choissisez un utilisateur"
                              persistent-hint
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </template>
                    <template>
                      <v-container fluid>
                        <v-row align="center">
                          <v-col cols="12" sm="6">
                            <v-subheader v-text="'Matériel parent :'" />
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="id_materiel_liaison"
                              :items="materiauxes"
                              :item-text="'nom'"
                              :item-value="'id'"
                              :clearable="true"
                              label="Select"
                              chips
                              hint="Choissisez un matériel parent"
                              persistent-hint
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </template>
                    <template>
                      <v-container fluid>
                        <v-row align="center">
                          <v-col cols="12" sm="6">
                            <v-subheader v-text="'Emplacement :'" />
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="id_emplacement"
                              :items="emplacements"
                              :item-text="'nom'"
                              :item-value="'id'"
                              :clearable="true"
                              label="Select"
                              chips
                              hint="Choissisez un emplacement"
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
          <!-- <v-dialog v-model="dialogv2" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Modifier la valeur</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.texte" label="Valeur" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="purple darken-1" text @click="close()">
                  Abandon
                </v-btn>
                <v-btn color="purple darken-1" text @click="save_caracteristique_valeur()">
                  Sauvegarder
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
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
        <!-- <v-icon
          small
          @click="editCaraItem(item)"
        >
          mdi-plus-box
        </v-icon> -->
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.prenom="{ item }">
        <a
          :href="'/utilisateurs/' +item.id_utilisateur"
          v-text="item.prenom"
        />
      </template>
      <template v-slot:item.nom="{ item }">
        <a
          :href="'/materiauxes/' +item.id"
          v-text="item.nom"
        />
      </template>
      <template v-slot:no-data>
        <v-btn color="teal" dark @click="getMat()">
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
      connectiquesEdit: [],
      id_emplacement: [],
      emplacements: [],
      id_materiel_liaison: [],
      utilisateurs: {},
      id_utilisateur: [],
      id_type: [],
      types: [
        { value: 'nom' }
      ],
      caracteristique_value: {},
      caracteristique: [],
      caracteristiques: [],
      id_connectique: [],
      connectiques: [],
      materiauxes: [],
      caracteristique_types: [],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: true,
          value: 'id'
        },
        { text: 'Nom', value: 'nom' },
        { text: 'Utilisateur', value: 'prenom' },
        { text: 'Type', value: 'type' },
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
      // dialogv2: false
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Ajouter un matériel' : 'Modifier le matériel'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  mounted () {
    this.getMat()
    this.getTypes()
    this.getCon()
    this.getValeurs()
    this.getUsers()
    this.getEmplacement()
  },

  methods: {
    async getUsers () {
      await this.$axios.get('/api/utilisateurs').then((res) => {
        this.utilisateurs = res.data.data
      })
    },

    async getMat () {
      await this.$axios.get('/api/materiauxes').then((res) => {
        this.materiauxes = res.data.data
      })
    },

    async getTypes () {
      await this.$axios.get('/api/types').then((res) => {
        this.types = res.data.data
      })
    },

    async getCon () {
      await this.$axios.get('api/connectiques').then((res) => {
        this.connectiques = res.data.data
      })
    },

    async getEmplacement () {
      await this.$axios.get('api/emplacements').then((res) => {
        this.emplacements = res.data.data
      })
    },

    async insertMat (nom) {
      await this.$axios.post('/api/materiauxes', {
        nom: this.nom
      }).then((res) => {
        this.getMat()
      })
    },

    async getCaraTypes () {
      await this.$axios.get('api/types/' + this.id_type).then((res) => {
        this.caracteristiques = res.data.data
        console.log(this.id_type)
        console.log(this.caracteristiques)
      })
    },

    async getValeurs () {
      await this.$axios.get('api/caracteristique_valeurs/').then((res) => {
        this.caracteristique_valeurs = res.data.data
      })
    },

    async editItem (item) {
      this.editedIndex = this.materiauxes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      await this.$axios.get('api/materiauxes/' + item.id + '/edit').then((res) => {
        this.materiauxesEdit = res.data.data
        console.log(this.materiauxesEdit)
        this.id_materiel_liaison = this.materiauxesEdit.materiauxes.id_materiel_liaison
        this.id_utilisateur = this.materiauxesEdit.materiauxes.id_utilisateur
        this.id_type = this.materiauxesEdit.materiauxes.id_type
        this.id_emplacement = this.materiauxesEdit.materiauxes.id_emplacement
        this.id_connectique = []
        for (const i in this.materiauxesEdit.con) {
          this.id_connectique.push(this.materiauxesEdit.con[i].id_connectique)
        }
        console.log(this.materiauxesEdit.con)
        console.log(this.id_connectique)
        // if (this.editedIndex !== -1) {
        // this.getCaraTypes()
        /*
          this.$store.commit('caracteristique_value/update', {
            id_caracteristique: this.materiauxesEdit.mat.id,
            text: this.materiauxesEdit.mat.texte
          })
          */
        // console.log(this.caracteristique_value)
        // this.caracteristique_value[this.materiauxesEdit.mat.id] = this.materiauxesEdit.mat.texte
        // console.log(this.materiauxesEdit.mat.texte, this.caracteristique_value)
        // this.$forceUpdate()
        // }
      })
    },

    async deleteItem (item) {
      const index = this.materiauxes.indexOf(item)
      if (confirm('Voulez-vous vraiment supprimer ce matériel ?')) {
        await this.$axios.delete('api/materiauxes/' + item.id).then((res) => {
          this.materiauxes.splice(index, 1)
        })
      }
    },

    /* async editCaraItem (item) {
      this.editedIndex = this.materiauxes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogv2 = true
      await this.$axios.get('api/caracteristique_valeurs/' + item.id + '/edit').then((res) => {
        this.caracteristique_valeursEdit = res.data.data
      })
    }, */

    updateCarVal (id, obj) {
      console.log(id, this.caracteristique_value)
      this.$store.commit('caracteristique_value/update', {
        id_caracteristique: id,
        text: this.caracteristique_value[id]
      })
    },

    close () {
      // this.dialogv2 = false
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.id_type = ''
        this.id_connectique = ''
        this.id_utilisateur = ''
        this.id_materiel_liaison = ''
        this.id_emplacement = ''
        // this.id_type = Object.assign({}, this.defaultItem)
        // this.id_connectique = Object.assign({}, this.defaultItem)
        // this.id_utilisateur = Object.assign({}, this.defaultItem)
        // this.id_materiel_liaison = Object.assign({}, this.defaultItem)
        // this.id_emplacement = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    /* async save_caracteristique_valeur (texte) {
      if (this.editedIndex > -1) {
        console.log(this.editedItem.id)
        await this.$axios.put('/api/caracteristique_valeurs/' + this.editedItem.id, {
          texte: this.editedItem.texte
        }).then((res) => {
          this.getMat()
        })
        Object.assign(this.materiauxes[this.editedIndex], this.editedItem)
      }
      this.close()
    }, */

    async save (nom) {
      console.log(this.id_utilisateur)
      // console.log(this.$store.state.caracteristique_value.value)
      if (this.editedIndex > -1) {
        await this.$axios.put('/api/materiauxes/' + this.editedItem.id, {
          nom: this.editedItem.nom,
          caracteristique_value: this.caracteristique_value,
          id_type: this.id_type,
          id_connectique: this.id_connectique,
          id_utilisateur: this.id_utilisateur,
          id_materiel_liaison: this.id_materiel_liaison,
          id_emplacement: this.id_emplacement
        }).then((res) => {
          this.getMat()
        })
        Object.assign(this.materiauxes[this.editedIndex], this.editedItem)
      } else {
        this.materiauxes.push(this.editedItem)
        console.log(this.caracteristique_value)
        await this.$axios.post('api/materiauxes', {
          nom: this.editedItem.nom,
          caracteristique_value: this.caracteristique_value,
          id_type: this.id_type,
          id_connectique: this.id_connectique,
          id_utilisateur: this.id_utilisateur,
          id_materiel_liaison: this.id_materiel_liaison,
          id_emplacement: this.id_emplacement
        }).then((res) => {
          this.getMat()
        })
      }
      this.close()
    }
  }
}
</script>
