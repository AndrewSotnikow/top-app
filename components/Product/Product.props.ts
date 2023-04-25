import { ProductModel } from 'interface'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface IProductProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel
}
