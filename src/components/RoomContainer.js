import React from 'react';
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import { withRoomConsumer } from '../Context';
import Loading from './Loading';

const RoomContainer = ({context:{loading, rooms, sortedRooms}})=>{
if(loading)return <Loading/>;
return <> 
       <RoomsFilter rooms={rooms}/>
       <RoomsList rooms={sortedRooms}/> 
    </>
}

export default withRoomConsumer(RoomContainer);





// import React from 'react';
// import RoomsFilter from './RoomsFilter';
// import RoomsList from './RoomsList';
// import { RoomConsumer } from '../Context';
// import Loading from './Loading';

//  const RoomContainer = () =>{
// return <RoomConsumer>
// {({loading, rooms, sortedrooms})=>{
// if(loading)return <Loading/>;
// return <div> 
//        <RoomsFilter rooms={rooms}/>
//        <RoomsList rooms={sortedRooms}/> 
//     </div>
// }}
// </RoomConsumer>
// }


// export default RoomContainer;