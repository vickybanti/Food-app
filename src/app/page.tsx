import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'
import Categories from '@/components/Categories'
import Products from '@/components/Products'
import { Suspense } from 'react'
import SecondFeatured from '@/components/SecondFeatured'
import Restaurants from '@/components/Restaurants'

export default function Home() {
  return (
    <main className='md:relative mobile'>
      <Slider/>
      <Categories />
      <Featured/>

      <Offer/>
    
      
    


      <Products />

      <Restaurants />
      </main>
  )
}
