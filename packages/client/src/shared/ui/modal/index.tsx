import { createPortal } from 'react-dom'
import {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import styles from './modal.module.scss'
import cn from 'classnames'

export type ModalProps = {
  onClose?: (e: MouseEvent<HTMLDivElement> | KeyboardEvent) => void
  children: ReactNode
  open: boolean
  closeDelay?: number
  slotProps?: {
    root?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  }
}
const ANIMATION_DURATION_MS = 193

const closeStyle = {
  opacity: '0',
  transition: `opacity ${ANIMATION_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
  visibility: 'hidden' as const,
}

export const Modal = (props: ModalProps) => {
  const { onClose, closeDelay = 0, open, children, slotProps } = props
  const rootProps = slotProps?.root
  const [isOpen, setIsOpen] = useState(open)
  const ref = useRef<null | HTMLDivElement>(null)
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (ref.current !== e.target) return
    rootProps?.onClick?.(e)
    onClose?.(e)
  }

  const openModal = () => {
    setIsOpen(true)
    setTimeout(() => {
      const el = ref.current
      if (!el) return
      el.style.visibility = 'visible'
      el.style.opacity = '1'
    }, 100)
  }

  const closeModal = () => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    setTimeout(() => {
      el.style.visibility = 'visible'
      setIsOpen(false)
    }, ANIMATION_DURATION_MS)
  }

  useEffect(() => {
    let timoutId: NodeJS.Timeout
    if (open) {
      openModal()
    } else {
      timoutId = setTimeout(() => {
        closeModal()
      }, closeDelay)
    }
    return () => clearTimeout(timoutId)
  }, [open])

  return (
    <>
      {isOpen &&
        createPortal(
          <div
            {...rootProps}
            onClick={handleClick}
            ref={ref}
            className={cn(styles.backdrop_root, rootProps?.className)}
            style={closeStyle}>
            {children}
          </div>,
          document.body
        )}
    </>
  )
}
