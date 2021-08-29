import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import type { Card, Room } from '~/api/@types'
import { Board } from '~/components/Board'
import { Sideber } from '~/components/Sideber'
import styles from './styles.module.css'

export type OptionalQuery = {
  roomId: number
}

export default defineComponent({
  setup() {
    const ctx = useContext()
    const route = useRoute()
    const rooms = ref<Room[]>()
    const roomId = computed(() => {
      const { roomId } = route.value.query
      // 三項演算子⇨非数の場合undefinedを返し、非数でない場合+roomIdの値を返す
      // +でroomIdがnumber型になる。
      return isNaN(+roomId) ? undefined : +roomId
    })
    // const update = async (cardId: Card: Card[''])
    const cardId = computed(() => {
      const { cardId } = route.value.query
      return isNaN(+cardId) ? undefined : +cardId
    })

    onMounted(async () => {
      rooms.value = await ctx.$api.rooms.$get()
      console.log(rooms.value, 'rooms')
      console.log(roomId, 'roomId')
    })

    const updateCard = async (cardId: Card['cardId'], text: string) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return

      await ctx.$api.rooms
        ._roomId(validateRoomId)
        .cards._cardId(cardId)
        .$patch({ body: { text } })

      rooms.value = await ctx.$api.rooms.$get()
    }

    const deleteCard = async (cardId: Card['cardId']) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return

      await ctx.$api.rooms
        ._roomId(validateRoomId)
        .cards._cardId(cardId)
        .$delete()

      rooms.value = await ctx.$api.rooms.$get()
    }

    const addCard = async () => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return
      await ctx.$api.rooms._roomId(validateRoomId).cards.$post()

      rooms.value = await ctx.$api.rooms.$get()
    }

    return () =>
      rooms.value ? (
        <div class={styles.container}>
          <div class={styles.sidewrapper}>
            {/* 二項演算子⇨room.valueに値が入っている時Sideberのroomsに値を入れる。||の場合逆の処理になる */}
            {rooms.value && <Sideber rooms={rooms.value} />}
          </div>
          <div class={styles.boardwrapper}>
            {roomId.value !== undefined && (
              <Board
                cards={rooms.value[roomId.value].cards}
                input={updateCard}
                delete={deleteCard}
                add={addCard}
              />
            )}
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )
  },
})
