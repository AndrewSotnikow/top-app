import cn from 'classnames'

import styles from './TopPageComponent.module.css'
import { TopPageComponentProps } from './TopPageComponent.props'
import { HhData, Htag, Sort, Tag } from '@/components/index'
import { TopLevelCategory } from 'interface'

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
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
      </div>

      <div className={styles.hhTitle}>
        <Htag tag='h2'>Вакансии - {page.category}</Htag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages?.length > 0 && (
        <>
          <Htag tag='h2'>Преимущества</Htag>
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag='h2'>Получаемые навыки</Htag>
    </div>
  )
}
