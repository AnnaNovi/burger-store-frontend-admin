<template>
  <div>
    <v-breadcrumbs :items="titles" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSettingsStore } from '../stores/settings'
const store = useSettingsStore();

export default defineComponent({
  name: 'SettingView',
  computed: {
    titles() {
      const titlesArray = ['Настройки'];
      if(store.activeItem?.name) {
        titlesArray.push(store.activeItem?.name);
      };
      return titlesArray;
    }
  }
})
</script>

<style>
  .title {
    margin-bottom: 30px;
  }
</style>
