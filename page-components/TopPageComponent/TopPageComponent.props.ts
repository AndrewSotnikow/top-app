import {  ProductModel, TopLevelCategory, TopPageModel } from 'interface'

export interface TopPageComponentProps {
  firstCategory: TopLevelCategory
  page: TopPageModel
  products: ProductModel[]
}
