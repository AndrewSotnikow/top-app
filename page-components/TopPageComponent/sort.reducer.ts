import { SortEnum } from 'components/Sort/Sort.props'
import { ProductModel } from 'interface'

export type TSortActions =
  | { type: SortEnum }
  | { type: SortEnum.Rating }
  | { type: 'reset'; initialState: ProductModel[] }

export interface ISortReducerState {
  sort: SortEnum
  products: ProductModel[]
}

export const sortReducer = (
  state: ISortReducerState,
  action: TSortActions
): ISortReducerState => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: state.products.sort((a, b) =>
          a.initialRating > b.initialRating ? -1 : 1
        ),
      }
    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products.sort((a, b) => (a.price > b.price ? 1 : -1)),
      }

    // @ts-ignore
    case 'reset':
      return {
        sort: SortEnum.Rating,
        // @ts-ignore
        products: action.initialState,
      }
    default:
      throw new Error('[App] Неверный тип сортировки')
  }
}
