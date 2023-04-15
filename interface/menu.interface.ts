export type Root = MenuItem

export interface MenuItem {
  _id: {
    secondCategory: string
  }
  pages: PageItem[]
}

export interface PageItem {
  alias: string
  title: string
  _id: {
    secondCategory: string
  }
  category: string
}
