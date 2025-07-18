import { Header } from "../modules/home/components/header"


const Home = () => {
  return (
    <>
    <Header />
      <main className="flex-1">
        <div id="editor" className="h-full"></div>
      </main>
    </>
  )
}

export default Home
