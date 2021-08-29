import { defineComponent, PropType } from '@vue/composition-api'
import type { Card } from '~/api/@types'
import { StickyCard } from './StickyCard'
import styles from './styles.module.css'

export const Board = defineComponent({
  props: {
    cards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
    input: {
      type: Function as PropType<
        (cardId: Card['cardId'], text: string) => void
      >,
      required: true,
    },
    delete: {
      type: Function as PropType<(cardId: Card['cardId']) => void>,
      required: true,
    },
    add: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    const onClick = () => props.add()
    return () => (
      <div class={styles.boardContainer}>
        {props.cards.map((card) => (
          <StickyCard
            key={card.cardId}
            card={card}
            input={(text) => props.input(card.cardId, text)}
            delete={() => props.delete(card.cardId)}
          />
        ))}
        <button class={styles.addBtn} onClick={onClick} type="submit">
          +
        </button>
      </div>
    )
  },
})
