import cn from 'classnames'
import { IRatingProps } from './Rating.props'
import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import styles from './Rating.module.css'
import StarIcon from '@/helpers/svg/star.svg'

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      error,
      rating,
      setRating,
      tabIndex,
      ...props
    }: IRatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    )
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

    const constructRating = useCallback(
      (currentRating: number) => {
        const computeFocus = (r: number, i: number): number => {
          if (!isEditable) {
            return -1
          }
          if (!rating && i == 0) {
            return tabIndex ?? 0
          }
          if (r == i + 1) {
            return tabIndex ?? 0
          }

          return -1
        }

        const changeDisplay = (i: number) => {
          if (!isEditable) {
            return
          }
          constructRating(i)
        }

        const onClick = (i: number) => {
          if (!isEditable || !setRating) {
            return
          }
          setRating(i)
        }

        const handleKey = (e: KeyboardEvent) => {
          if (!isEditable || !setRating) {
            return
          }

          if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
            if (!rating) {
              setRating(1)
            } else {
              e.preventDefault()
              setRating(rating < 5 ? rating + 1 : 5)
            }
            ratingArrayRef.current[rating]?.focus()
          }
          if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
            e.preventDefault()
            setRating(rating > 1 ? rating - 1 : 1)
            ratingArrayRef.current[rating - 2]?.focus()
          }
        }

        const updatedArray = ratingArray.map(
          (ratingL: JSX.Element, i: number) => {
            return (
              <span
                className={cn(styles.star, {
                  [styles.filled]: i < currentRating,
                  [styles.editable]: isEditable,
                })}
                key={i}
                onMouseEnter={() => changeDisplay(i + 1)}
                onMouseLeave={() => changeDisplay(rating)}
                onClick={() => onClick(i + 1)}
                tabIndex={computeFocus(rating, i)}
                onKeyDown={handleKey}
                ref={(r) => ratingArrayRef.current?.push(r)}
                role={isEditable ? 'slider' : ''}
                aria-invalid={error ? true : false}
                aria-valuenow={rating}
                aria-valuemax={5}
                aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
                aria-valuemin={1}
              >
                <StarIcon />
              </span>
            )
          }
        )
        setRatingArray(updatedArray)
      },
      [error, isEditable, rating, ratingArray, setRating, tabIndex]
    )

    useEffect(() => {
      constructRating(rating)
    }, [rating, tabIndex, constructRating])

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.ratingWrapper, { [styles.error]: error })}
      >
        {ratingArray.map((rating, index) => (
          <span key={index}>{rating}</span>
        ))}
        {error && (
          <span role='alert' className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    )
  }
)
