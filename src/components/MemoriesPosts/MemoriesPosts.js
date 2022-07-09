import React, {useState, useMemo} from "react";
import "./MemoriesPosts.scss";
import MemoriesPost from './MemoriesPost/MemoriesPost';
import { removeMemory } from '../../_actions/memoriespost'
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import {Modal,Button } from "react-bootstrap";
function MemoriesPosts(props) {
   let PageSize = 10;
   const dispatch = useDispatch();
   const listOfMemories = useSelector(state => state.memoriespost);
   const [currentPage, setCurrentPage] = useState(1);
   const [selectedMemoryId, setSelectedMemoryId] = useState(1);
   const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return listOfMemories.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
   const setCurrentId = props.setCurrentId;
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handleCallback = (childData) =>{
      setSelectedMemoryId({id:childData});
      handleShow();
  }

  function removeMemory() {
   dispatch(removeMemory(selectedMemoryId.id));
  }
   return (
      <div className="memoriesPosts">
         <div className="container">
            <div className="row">
            {listOfMemories.map(memory =>
               <div className="memoriesPost col-sm-12 col-md-6 col-lg-4 mb-4" key={memory._id}>
                  <MemoriesPost  memory = {memory} setCurrentId={setCurrentId} 
                  parentCallback = {handleCallback}/>
               </div>
               )}
               <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={listOfMemories.length}
                  pageSize={PageSize}
                  onPageChange={page => setCurrentPage(page)}
               />
            </div>
         </div>

         {/* Modal confirmation dialog */}
         <Modal show={show} onHide={handleClose} centered className="confirmationModal">
            <Modal.Header closeButton>
               <Modal.Title>Confirm Delete Memory</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this? </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Cancel
               </Button>
               <Button variant="primary" onClick={removeMemory}>
                  Yes
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
}

export default MemoriesPosts;