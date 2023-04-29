import { ReviewModel } from 'interface'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface IReviewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: ReviewModel
}
