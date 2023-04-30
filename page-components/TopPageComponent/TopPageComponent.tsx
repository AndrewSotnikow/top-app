import styles from './TopPageComponent.module.css'
import { TopPageComponentProps } from './TopPageComponent.props'
import { HhData, Htag, Sort, Tag } from '@/components/index'
import { TopLevelCategory } from 'interface'
import { Advantages } from '@/components/Advantages/Advantages'
import { SortEnum } from '@/components/Sort/Sort.props'
import { useEffect, useReducer } from 'react'
import { sortReducer } from './sort.reducer'
import { Product } from '@/components/Product/Product'
import { useReducedMotion } from 'framer-motion'

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnum.Rating,
    }
  )

  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // @ts-ignore
    dispatchSort({ type: 'reset', initialState: products })
  }, [products])

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && (
          <Tag
            color='grey'
            size='medium'
            aria-label={products.length + 'элементов'}
          >
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role='list'>
        {sortedProducts &&
          sortedProducts.map((p) => (
            <Product
              role='listitem'
              layout={shouldReduceMotion ? true : false}
              key={p._id}
              product={p}
            >
              {p.title}
            </Product>
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag='h2'>Вакансии - {page.category}</Htag>
        <Tag color='red' size='medium'>
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages?.length > 0 && (
        <>
          <Htag tag='h2'>Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag='h2'>Получаемые навыки</Htag>
      {page.tags.map((t) => (
        <Tag key={t} color='primary' size='small'>
          {t}
        </Tag>
      ))}
    </div>
  )
}
