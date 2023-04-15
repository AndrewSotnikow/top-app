import { useState } from 'react'
import { Htag, Paragraph, Button, Rating } from 'components/index'
import { withLayout } from 'layout/Layout'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { MenuItem } from 'interface/menu.interface'

function Home({ menu }: HomeProps) {
  const [rating, setRating] = useState<number>(0)

  return (
    <>
      <ul>
        {menu.map((m) => (
          <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
        ))}
      </ul>
    </>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory,
    }
  )
  return {
    props: {
      menu,
      firstCategory,
    },
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}
