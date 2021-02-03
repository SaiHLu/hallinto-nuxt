<template>
  <v-row align="center" justify="center" class="mt-10 flex-column">
    <h1>Transaction Status List</h1>
    <v-col cols="10">
      <v-card>
        <v-card-title class="align-baseline">
          <v-btn to="/transaction_status/create" class="primary">Create</v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="transactions" :search="search">
          <template #item="{ item }">
            <tr>
              <td>{{ transactions.indexOf(item) + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>
                <v-btn
                  fab
                  dark
                  small
                  color="orange"
                  :to="`/transaction_status/${item.id}`"
                >
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  small
                  color="red"
                  @click.prevent="deleteTransaction(item.id)"
                >
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TransactionStatus from '@/vuex-orm/models/TransactionStatus'

const dummyData = [
  {
    id: 1,
    name: 'John',
    description: 'Hello guys',
  },
  {
    id: 2,
    name: 'Doe',
    description: 'Hello guys',
  },
]

@Component({
  layout: 'dashboard',
})
export default class PagesTransactionStatus extends Vue {
  search = ''

  headers = [
    { text: 'No', value: 'id' },
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
    { text: 'Actions', value: 'actions' },
  ]

  get transactions() {
    return TransactionStatus.all()
  }

  deleteTransaction(id: string) {
    TransactionStatus.delete(id)
  }

  mounted() {
    if (!this.transactions) {
      TransactionStatus.deleteAll()
      TransactionStatus.insert({
        data: dummyData,
      })
    }
  }
}
</script>
