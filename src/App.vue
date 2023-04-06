<template>
  <v-app>
    <nav>
      <v-app-bar color="secondary" :elevation="0" rounded>
        <v-app-bar-nav-icon variant="text" @click.stop="isOpenMenu = !isOpenMenu"></v-app-bar-nav-icon>
        <v-app-bar-title>AdminPanel</v-app-bar-title>
        <template v-slot:append>
          <v-btn @click="toggleTheme" icon="mdi-theme-light-dark"></v-btn>
        </template>
      </v-app-bar>
      <v-navigation-drawer
        class="menuPanel"
        v-model="isOpenMenu"
        location="left"
        floating permanent
      >
        <v-list>
          <v-list-item 
            v-for="item in menuItems" 
            :key="item.path"
            :title="item.title"
            :value="item.path"
            @click="$router.push(item.path)"
          />
        </v-list>
      </v-navigation-drawer>
    </nav>
    <v-main>
      <router-view class="content"/>
    </v-main>
  <v-footer style="flex: initial; z-index: 10000" border color="secondary">
    <a class="px-4 py-2 text-white text-center w-100" href="https://github.com/AnnaNovi" target="_blank">
      GitHub: AnIvNovikova
    </a>
  </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTheme } from 'vuetify';

export default defineComponent({
  name: 'App',
  setup() {
    const theme = useTheme();
    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  },
  data () {
    return {
      isOpenMenu: true,
      menuItems: [
        {
          title: 'Аналитика',
          path: '/analytics'
        },
        {
          title: 'Заказы',
          path: '/orders'
        },
        {
          title: 'Отчеты',
          path: '/reports'
        },
        {
          title: 'Настройки',
          path: '/settings'
        },
      ]
    }
  },
})
</script>

<style lang="scss">
  .content {
    padding: 20px 30px;
  }
</style>
