import Header from '../components/Header'
import Footer from '../components/Footer'
import Dashboard from '../layout/Dashboard'

const Home = () => {
  return (
    <>
      <Header />
      <main className='min-h-[78vh] bg-blue-200'>
        <section>
          <Dashboard />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home

