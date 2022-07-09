import React from "react";
import moment from 'moment'
import { Link } from "react-router-dom";
import "./MemoriesPost.css";
function MemoriesPost(props) {
   let formattedDate = moment(props.memory.createdAt).format("MMM D YYYY");
   let formattedTime = moment(props.memory.createdAt).hour();
   // let setCurrentId = props.setCurrentId;
   const selectedFile = {
      backgroundImage: 'url(' + props.memory.selectedFile + ')'
   }
   function removeMemoryById() {
      const id = props.memory._id;
      props.parentCallback(id);
   }
   return (
      <div className="post">
         <div className="topBanner">
            <div className="topBannerDetails" style={selectedFile}>
            <p>{props.memory.creator}</p>
            <p>{formattedTime} hours</p>
            </div>
         </div>

         <div className="bodyContent">
            <p className="createdDate">{formattedDate}</p>
            <div className="memory-content">
               <h1>{props.memory.title}</h1>
               <p className="description" dangerouslySetInnerHTML={{ __html: props.memory.description }} ></p>
            </div>
            <div className="actions">
            <Link to={`/memory/${props.memory._id}/edit`} state= {{memory:props.memory}}>
            <span className="EditMemoryBtn"><i className="bi bi-pencil"></i></span></Link>
            <div className="deleteMemoryBtn float-end" onClick={removeMemoryById}><i className="bi bi-trash"></i></div>
            <div className="clear"></div>
            </div>
         </div>
      </div>

   );
}

export default MemoriesPost;