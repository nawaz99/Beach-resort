import React,{ Fragment } from 'react';
import { Link }  from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import Services from '../components/Services';
import FeaturedRoom from '../components/FeaturedRoom';



const Home = () => {
    return (
         <Fragment>
       <Hero hero="defaultHero" >
           <Banner title="luxurios rooms" subtitle="delux rooms starting at $299">
               <Link to='/rooms' className="btn-primary">
                   our rooms 
               </Link>
           </Banner>
       </Hero>
       <Services />
       <FeaturedRoom />
       </Fragment>
    );
}

export default Home;
