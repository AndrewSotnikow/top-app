import { useEffect, useState } from 'react'
import { Htag, Paragraph, Button, Rating } from 'components/index'
import { withLayout } from 'layout/Layout'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { MenuItem } from 'interface/menu.interface'

function Home({ menu }: HomeProps) {

  return <></>
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
