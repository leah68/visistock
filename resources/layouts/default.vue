<template>
  <v-app dark>
    <v-navigation-drawer
      flat
      color="teal lighten-4"
      :fixed="fixed"
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :fixed="fixed"
      app
    >
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-account',
          title: 'Utilisateurs',
          to: '/utilisateurs'
        },
        {
          icon: 'mdi-cable-data',
          title: 'Connectiques',
          to: '/connectiques'
        },
        {
          icon: 'mdi-screwdriver',
          title: 'Types',
          to: '/types'
        },
        {
          icon: 'mdi-desktop-tower-monitor',
          title: 'Matériaux',
          to: '/materiauxes'
        },
        {
          icon: 'mdi-contain',
          title: 'Caractéristiques',
          to: '/caracteristiques'
        },
        {
          icon: 'mdi-square-edit-outline',
          title: 'Valeurs',
          to: '/caracteristique_valeurs'
        },
        {
          icon: 'mdi-map-marker',
          title: 'Emplacement',
          to: '/emplacements'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
