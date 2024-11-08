import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'
import CategoryPage from './menu/[category]/page'
import Categories from '@/components/Categories'
import Products from '@/components/Products'
import { Suspense } from 'react'
import Loading from '@/components/loading'

export default function Home() {
  return (
    <main>
      <Slider/>
      <Suspense fallback={<Loading />} >

      <Categories />
      
    </Suspense>
    
      <Offer/>
      <Suspense fallback={<Loading />} >

      <Featured/>
      </Suspense>
      <Suspense fallback={<Loading />} >

      <Products />
      </Suspense>
      </main>
  )
}
