import { TopLevelCategory } from './topPage.interface'

export type Root = MenuItem

export interface MenuItem {
  _id: {
    secondCategory: string
  }
  pages: PageItem[]
  isOpened?: boolean
}

export interface PageItem {
  alias: string
  title: string
  _id: {
    secondCategory: string
  }
  category: string
}

export interface FirstLevelMenuItem {
  route: string
  name: string
  icon: JSX.Element
  id: TopLevelCategory
}
