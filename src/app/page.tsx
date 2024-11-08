import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'
import Categories from '@/components/Categories'
import Products from '@/components/Products'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main>
      <Slider/>

      <Categories />
      
    
      <Offer/>

      <Featured/>

      <Products />
      </main>
  )
}
