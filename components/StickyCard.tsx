import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import type { Card } from '~/api/@types'
import styles from './styles.module.css'

export const StickyCard = defineComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
    input: {
      type: Function as PropType<(text: string) => void>,
      required: true,
    },
    delete: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    const isForcusing = ref(false)
    const localtext = ref(props.card.text)
    const text = computed(() =>
      isForcusing.value ? localtext.value : props.card.text
    )
    const onInput = ({ target }: Event) => {
      if (!(target instanceof HTMLTextAreaElement)) return
      console.log(target.value, 'target')

      localtext.value = target.value
      props.input(target.value)
    }
    const onFocus = () => (isForcusing.value = true)
    const onBlur = () => (isForcusing.value = false)
    const onClick = () => {
      props.delete()
    }

    return () => (
      <div
        class={styles.cardContainer}
        style={{
          top: `${props.card.position.y}px`,
          left: `${props.card.position.x}px`,
          backgroundColor: props.card.color,
        }}
      >
        <div class={styles.stickyArea} />
        <button class={styles.deleteBtn} onClick={onClick} type="submit">
          ×
        </button>
        <textarea
          style="border:none;"
          class={styles.textArea}
          value={text.value}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
        ></textarea>
      </div>
    )
  },
})
