import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'
import CategoryPage from './menu/[category]/page'
import Categories from '@/components/Categories'
import Products from '@/components/Products'

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
