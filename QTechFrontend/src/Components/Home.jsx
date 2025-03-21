import React from 'react'
import MainHeader from './MainHeader'
import Carousel from './Carousel'
import Courses from './Courses'
import About from './About'
import Contact from './Contact'

function Home() {
  return (
   <>
    {/* <MainHeader/> */}
   <Carousel/> 
   <Courses/> 
   <About/> 
   <Contact/>
   </>
  )
}

export default Home