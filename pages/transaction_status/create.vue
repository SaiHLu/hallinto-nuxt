<template>
  <v-row align="center" justify="center" class="mt-10 flex-column">
    <h1>Create Transaction Status</h1>
    <v-col cols="10">
      <v-card class="pa-10">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="createTransaction"
        >
          <v-text-field
            v-model="name.value"
            type="text"
            label="Transaction Name"
            :rules="name.rules"
            required
          ></v-text-field>

          <v-textarea
            v-model="description.value"
            label="Description"
            :rules="description.rules"
            required
          ></v-textarea>

          <v-btn type="submit" elevation="0" color="primary">Create</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TransactionStatus from '@/vuex-orm/models/TransactionStatus'
@Component({ layout: 'dashboard' })
export default class PagesCreateTransactionStatus extends Vue {
  valid = true
  $refs!: {
    form: HTMLFormElement
  }

  name = {
    value: null,
    rules: [(v: string) => !!v || 'Transaction Name is required'],
  }

  description = {
    value: null,
    rules: [(v: string) => !!v || 'Please provide a short description'],
  }

  createTransaction() {
    if (this.$refs.form.validate()) {
      TransactionStatus.insert({
        data: {
          name: this.name.value,
          description: this.description.value,
        },
      })

      this.$router.push('/transaction_status')
    }
  }
}
</script>
