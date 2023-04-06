<template>
  <div class="order">
    <h1 @click="fetch()">This is an Order page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getData$ } from '../srv.service';

export default defineComponent({
  methods: {
    fetch() {
      return getData$('categories')
        .subscribe(value => console.warn(value));
    },
  }
})
</script>


<style>
/* @media (min-width: 1024px) {
  .order {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
