<template>
  <v-row align="center" justify="center" class="mt-10 flex-column">
    <h1>Edit Transaction Status</h1>
    <v-col v-if="!processing" cols="10">
      <v-card class="pa-10">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="updateTransaction"
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

          <v-btn type="submit" elevation="0" color="primary">Update</v-btn>
        </v-form>
      </v-card>
    </v-col>
    <v-progress-circular v-else :size="50" indeterminate></v-progress-circular>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TransactionStatus from '@/vuex-orm/models/TransactionStatus'
@Component({ layout: 'dashboard' })
export default class PagesUpdateTransactionStatus extends Vue {
  valid = true
  $refs!: {
    form: HTMLFormElement
  }

  name = {
    value: '',
    rules: [(v: string) => !!v || 'Transaction Name is required'],
  }

  description = {
    value: '',
    rules: [(v: string) => !!v || 'Please provide a short description'],
  }

  processing = true

  mounted() {
    this.loadTransaction()
  }

  get transaction() {
    return TransactionStatus.find(this.$route.params.id)
  }

  loadTransaction() {
    if (this.transaction) {
      this.processing = false
      this.name.value = this.transaction.name
      this.description.value = this.transaction.description
    }
  }

  updateTransaction() {
    if (this.$refs.form.validate()) {
      TransactionStatus.update({
        where: ({ id }) => {
          return id === this.transaction?.id
        },
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
