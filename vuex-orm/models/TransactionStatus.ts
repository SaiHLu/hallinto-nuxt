import { Model } from '@vuex-orm/core'
import dayjs, { Dayjs } from 'dayjs'

export default class TransactionStatus extends Model {
  // module name
  static entity = 'transaction_status'

  // module states
  static fields() {
    return {
      id: this.string(''),
      name: this.string(''),
      description: this.string('').nullable(),
      createdAt: this.attr(dayjs()),
      updatedAt: this.attr(dayjs()),
      deletedAt: this.attr(null).nullable(),
    }
  }

  // states type
  id!: string
  name!: string
  description!: string
  createdAt!: Dayjs | any
  updatedAt!: Dayjs | any
  deletedAt!: Dayjs | any | null
}
