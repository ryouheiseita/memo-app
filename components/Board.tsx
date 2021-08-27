
import { useContext } from '@nuxtjs/composition-api'
import { defineComponent, PropType } from '@vue/composition-api'
import type { Card } from '~/api/@types'
import styles from './styles.module.css'
import { StickyCard } from './StickyCard'

export const Board = defineComponent({
    props: {
        cards: {
            type: Array as PropType<Card[]>,
            required: true,
        },
        input: {
            type: Function as PropType<(cardId: Card['cardId'], text: string) => void>,
            required: true
        }
    },
    setup(props) {

        return () => (
            <div class={styles.boardContainer}>
                {props.cards.map((card) => (
                    <StickyCard 
                        key={card.cardId} 
                        card={card} 
                        input={(text) => props.input(card.cardId, text)}/>
                ))}
            </div>
        )
    },
})