import { RatingProps } from './Rating.props'
import cn from 'classnames'
import StarIcon from '@/public/svg/star.svg'
import styles from './Rating.module.css'
import { useEffect, useState, KeyboardEvent } from 'react'

export const Rating = ({
  isEditable = false,
  rating,
  setRating,
  className,
  ...props
}: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  )

  useEffect(() => {
    constructRating(rating)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating])

  const changeDisplay = (i: number) => {
    if (!isEditable || !setRating) {
      return
    }
    setRating(i)
  }
  const onClick = (i: number) => {
    if (!isEditable) {
      return
    }
    constructRating(i)
  }
  const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
    if (e.code !== 'Space' || !setRating) {
      return
    }
    setRating(i)
  }

  const constructRating = (currentRating: number) => {
    const updateArray = ratingArray.map((item: JSX.Element, i: number) => {
      return (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}
          key={i}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          tabIndex={isEditable ? 0 : 1}
        >
          <StarIcon
            onClick={() => onClick(i + 1)}
            onKeyDown={(e: KeyboardEvent<SVGAElement>) =>
              isEditable && handleSpace(i + 1, e)
            }
          />
        </span>
      )
    })
    setRatingArray(updateArray)
  }

  return (
    <div {...props}>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  )
}
