import CourseIcon from './svg/courses.svg'
import ServiceIcon from './svg/services.svg'
import BooksIcon from './svg/books.svg'
import ProductsIcon from './svg/products.svg'
import { FirstLevelMenuItem, TopLevelCategory } from 'interface'

export const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: <CourseIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: 'courses',
    name: 'Сервисы',
    icon: <ServiceIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: 'courses',
    name: 'Книги',
    icon: <BooksIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: 'courses',
    name: 'Продукты',
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products,
  },
]
