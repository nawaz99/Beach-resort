import React,{ Component } from 'react';
import Title from './Title';
import { FaCocktail, FaShuttleVan, FaHiking, FaBeer} from 'react-icons/fa';

class Services extends Component{
  state ={
        services:[
        {
            icon:<FaCocktail/>,
            title:"Free cocktails",
            info:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, blanditiis!"
        },
        {
           icon:<FaHiking/>,
           title:"Endless Hiking",
           info:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, blanditiis!"
       },
        {
           icon:<FaShuttleVan/>,
           title:"Free shuttle",
           info:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, blanditiis!"
       },
       {
           icon:<FaBeer/>,
           title:"Strongest Beer",
           info:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, blanditiis!"
       }
        ]
       }
    render(){
        return <section className="services">
           <Title title="Services" />
           <div className="services-center">
               {this.state.services.map((item,i) =>{
                   const {icon,title,info} = item
                return   <article key={i} className="service">
                     <span>{icon}</span>
                     <h6>{title}</h6>
                     <p>{info}</p>
                   </article>
               })}
           </div>
        </section >
    }
}

export default Services;