<template>
  <v-app>
    <nav>
      <v-app-bar color="secondary" :elevation="0" rounded>
        <v-app-bar-nav-icon variant="text" @click.stop="isOpenMenu = !isOpenMenu"></v-app-bar-nav-icon>
        <v-app-bar-title>AdminPanel</v-app-bar-title>
        <!-- <template v-slot:append>
          <v-btn icon="mdi-heart"></v-btn>
          <v-btn icon="mdi-magnify"></v-btn>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template> -->
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
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',

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
  .menuPanel {
    background: salmon;
    // box-shadow: 2px 0 #03DAC6;
    // border-right: #03DAC6 solid 3px;
  }
</style>
