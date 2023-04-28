<template>
  <v-text-field
    :label="schema[field]?.['name']"
    v-model="form[field]"
    clearable variant="outlined"
    :error-messages="vuelidate.form[field].$errors.map(e => e.$message)"
    @input="vuelidate.form[field].$touch()"
    @blur="vuelidate.form[field].$touch()"
    @change="vuelidate.form[field]"
  ></v-text-field>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { TSchema } from '../../types';

  export default defineComponent({
    name: 'InputString',
    props: {
      schema: {
        type: Object as PropType<TSchema>,
        required: true
      },
      form: {
        type: Object,
        required: true
      },
      field: {
        type: String,
        required: true
      },
      vuelidate: {
        type: Object,
        required: true
      }
    },
  })
</script>