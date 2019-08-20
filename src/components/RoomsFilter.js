import React,{useContext} from 'react';
import { RoomContext } from '../Context';
import Title from './Title';


const  getUnique = (items,value)=>{
let unique =  [];
for(let i=0;i<items.length;i++){
    if(unique.indexOf(items[i][value]) === -1){
        unique.push(items[i][value]);
    }
} 
return unique
}


const RoomsFilter = ({rooms}) => {
    const context = useContext(RoomContext);
   const {handleChange,type,capacity,price,minPrice,maxPrice,minSize,maxSize,breakfast,pets} = context;
   let types = getUnique(rooms,"type");
   types = ["all",...types];
   types = types.map((type,i)=>{
       return <option value={type} key={i}>{type}</option>
   })
   let peoples = getUnique(rooms,"capacity");
  peoples =  peoples.map((people,i)=>{
       return <option value={people} key={i}>{people}</option>
   })
    return (
        <section className="filter-container">
          <Title title="search rooms" />
          <form className="filter-form">
          {/* select type */}
<div className="from-group">
    <label htmlFor="type">room type</label>
<select 
name="type" 
id="type" 
value={type}
className="form-control"
onChange={handleChange}
 >
{types}
 </select>
</div>

          {/* end select type */}
                   {/* guest */}
<div className="from-group">
    <label htmlFor="capacity">Guests</label>
<select 
name="capacity" 
id="capacity" 
value={capacity}
className="form-control"
onChange={handleChange}
 >
{peoples}
 </select>
</div>
{/* end guest */}
{/* price */}
<div className="form-group">
<label htmlFor="price">room price ${price} </label>
    <input type="range" name="price" max={maxPrice}
     min={minPrice}
      id="price" 
      value={price} 
      onChange={handleChange}
      className="form-control" 
      />
</div>
{/* end price */}
{/* size */}
<div className="form-group">
    <label htmlFor="size">room size</label>
    <div className="size-inputs">
        <input 
        type="number" 
        value={minSize} 
        name="minSize"
         id="size" 
         className="size-input"
         onChange={handleChange}
         />
           <input 
        type="number" 
        value={maxSize} 
        name="maxSize"
         id="size" 
         className="size-input"
         onChange={handleChange}
         />
    </div>
</div>
{/* end of size */}

{/* extras */}
<div className="form-group">
    <div className="single-extra">
        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
        <label htmlFor="breakfast">breakfast</label>
    </div>
    <div className="single-extra">
        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
        <label htmlFor="pets">pets</label>
    </div>
</div>


{/* end of extras */}

          </form>
        </section>
    )
}

export default RoomsFilter;
