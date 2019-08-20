import React, { Component,createContext } from 'react';
// import items from './data';
import Client from './Contentful';



const RoomContext = createContext();

class RoomProvider extends Component {
state={
rooms:[],
sortedRooms:[],
featuredRooms:[],
loading:true,
type:"all",
capacity:1,
price:0,
minPrice:0,
maxPrice:0,
minSize:0,
maxSize:0,
breakfast:false,
pets:false
};



getdata = async ()=>{
try{
    let response = await Client.getEntries({
    content_type:"BeachResortRoom",
    // order:"sys.createdAt"
    order:"fields.price"
});
let rooms = this.formatedData(response.items);
let featuredRooms = [];
for(let i=0;i<rooms.length;i++){
(rooms[i].featured === true)&&(featuredRooms = [...featuredRooms,rooms[i]]);
}
let maxPrice = 0,
maxSize  = 0;

for(let i=0;i<rooms.length;i++){
if(rooms[i].price > maxPrice){
    maxPrice = rooms[i].price;
    maxSize= rooms[i].size;
}
}
//  let maxPrice = Math.max(...rooms.map(room=>room.price));
//  let maxSize = Math.max(...rooms.map(room=>room.size));
this.setState({
   rooms,
   featuredRooms,
   sortedRooms:rooms,
   loading:false,
   price:maxPrice,
   maxPrice,
   maxSize
})

}catch(err){
    console.log(err);
}
}
componentDidMount(){
this.getdata()
}

formatedData(items){
   let tempItems = items.map(item =>{
       let {sys:{id},fields:{images}} = item;
   images = images.map(image =>{
       const {fields:{file:{url}}} = image
    return url
});

let room = {...item.fields,images,id}
    return room;
   });
   return tempItems;
}

getroom = (slug)=>{
let tempRooms = [...this.state.rooms];
let room;
for(let j=0;j<tempRooms.length;j++){
    if(tempRooms[j].slug === slug){
      room = tempRooms[j];
    }
} 
return room;
}

handleChange = event=>{
const value = (event.target.type=== "checkbox")?event.target.checked:event.target.value;
this.setState({
    [event.target.name]:value
},this.filterRooms)
}

filterRooms = ()=>{
    let {rooms,type,capacity,price,minSize,maxSize,breakfast,pets} = this.state;
let tempRooms = [...rooms],
filteredRooms = [],
filteredcapacity = [],
filteredprice=  [],
filteredsize=  [],
filteredbreakfast=  [],
filteredpets = [];

// filter by type
if(type !== "all"){
    for(let i=0;i<tempRooms.length;i++)
    (tempRooms[i].type === type)&&(filteredRooms.push(tempRooms[i]))
    tempRooms = filteredRooms; 
    
}

capacity = parseInt(capacity);
// filter by capacity
if(capacity !==1){
    for(let i=0;i<tempRooms.length;i++)
 (tempRooms[i].capacity >= capacity)&&(filteredcapacity.push(tempRooms[i]))
tempRooms = filteredcapacity;
}

price = parseInt(price);

// filter by price
for(let i=0;i<tempRooms.length;i++)
(tempRooms[i].price <= price)&&(filteredprice.push(tempRooms[i]))
tempRooms = filteredprice;

//filter by size
for(let i=0;i<tempRooms.length;i++)
(tempRooms[i].size >= minSize && tempRooms[i].size <= maxSize)&&(filteredsize.push(tempRooms[i]))
tempRooms = filteredsize;

// filter by break fast
if(breakfast){
for(let i=0;i<tempRooms.length;i++)
(tempRooms[i].breakfast)&&(filteredbreakfast.push(tempRooms[i]));
tempRooms = filteredbreakfast;
}

// filter by pets
if(pets){
for(let i=0;i<tempRooms.length;i++)
(tempRooms[i].pets)&&(filteredpets.push(tempRooms[i]));
tempRooms = filteredpets;
}
this.setState({
    sortedRooms:tempRooms
})
}



render() {
        return (
            <RoomContext.Provider value={
                {
                    ...this.state,
                    getroom:this.getroom,
                    handleChange:this.handleChange
                }
                      }
                >
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

const withRoomConsumer = (Component)=>{
return (props)=>(<RoomConsumer>{value=><Component {...props} context={value} />}</RoomConsumer>)
}

export {RoomProvider, RoomConsumer, RoomContext, withRoomConsumer};