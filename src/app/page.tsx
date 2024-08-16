import Hero from '../app/Hero/page'
import Categories from '../app/Categories/page'
import JobsSection from '../app/JobSection/page'
import Achievements from '../app/Achievements/page'
import Recuritiers from '../app/Recuriters/page'
import Blog from '../app/Blog/page'
import Banner from './Components/Partials/Banner/banner'
import Testimonials from './Testimonials/page'

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <JobsSection />
      <Achievements />
      <Recuritiers />
      <Testimonials />
      <Blog />
      <Banner />
    </>
  );
}
