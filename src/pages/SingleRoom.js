import React,{Component} from 'react';
import { RoomContext } from '../Context';
import defaultBcg from '../images/room-1.jpeg';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import StyledHero from '../components/StyledHero';

class SingleRoom extends Component{
  static contextType = RoomContext;
  state = {
    slug:this.props.match.params.slug,
    defaultBcg
  }

  componentDidMount(){

  }
  render(){
    const {getroom} = this.context;
    const room = getroom(this.state.slug);
    if(!room){
      return <div className="error">
        <h3>no such room could be found....</h3>
        <Link to='/rooms' className='btn-primary'>
          back to rooms
        </Link>
      </div>
    }
const {name, description,capacity,size,price,extras,breakfast,pets,images:[image1,...remainingimages]} =room

    return (
      <>
      <StyledHero img={image1 || this.state.defaultBcg}>
       <Banner title={`${name} room`}>
         <Link to='/rooms'  className='btn-primary'>back to rooms</Link> 
       </Banner>
     </StyledHero>
     <section className="single-room">
       <div className="single-room-images">
         {remainingimages.map((image,i)=>{
    return <img key={i} src={image} alt={name} />
         })}
       </div>
       <div className="single-room-info">
         <article className="desc">
           <h3>details</h3>
           <p>{description}</p>
         </article>
         <article className="info">
           <h3>info</h3>
           <h6>price: ${price}</h6>
           <h6>size: {size} SQFT</h6>
           <h6>max capacity:{capacity>1?` ${capacity} people`:` ${capacity} person`}</h6>
           <h6>{pets?"pets allowed":"no pets allowed"}</h6>
           <h6>{breakfast&&"free break fast included"}</h6>
         </article>
       </div>
     </section>
<section className="room-extras">
  <h6>extras</h6>
  <ul className="extras">
    {extras.map((extra,i)=>{
      return <li key={i}>-{extra}</li>
    })}
  </ul>
</section>
     </>
    )
}
}

export default SingleRoom;
