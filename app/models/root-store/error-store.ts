import { action, observable } from 'mobx'

export default class ErrorStore {
  @observable requesting!: boolean
  @observable error!: string
  @observable success: boolean

  @action
  setError(error?) {
    this.error = error
  }


}
