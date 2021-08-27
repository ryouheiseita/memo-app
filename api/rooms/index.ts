import { mockMethods } from 'aspida-mock'
import type { Room } from '../@types'
import { rooms } from '../@seeds'

export type Methods = {
  get: {
    resBody: Room[]
  }
}

export default mockMethods<Methods>({
  get: () => ({ status: 200, resBody: rooms }),
})
