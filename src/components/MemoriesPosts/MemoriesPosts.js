import React, { useState, useMemo } from "react";
import "./MemoriesPosts.scss";
import ReactPaginate from 'react-paginate';
import MemoriesPost from './MemoriesPost/MemoriesPost';
import { removeMemory } from '../../_actions/memoriespost';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import { Modal, Button } from "react-bootstrap";
function MemoriesPosts(props) {
   let PageSize = 10;
   const dispatch = useDispatch();
   const listOfMemories = props.memories;
   const [currentPage, setCurrentPage] = useState(1);
   const [selectedMemoryId, setSelectedMemoryId] = useState(1);
   const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return listOfMemories.slice(firstPageIndex, lastPageIndex);

   }, [currentPage, PageSize, listOfMemories]);
   const setCurrentId = props.setCurrentId;
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handleCallback = (childData) => {
      setSelectedMemoryId({ id: childData });
      handleShow();
   }

   function removeSingleMemory() {
      dispatch(removeMemory(selectedMemoryId.id));
   }
   // if (listOfMemories) {
      return (
         <div className="memoriesPosts">
   
            <section className="wrapper">
                  <div className="">
                  <div className="content">
                     <div className="">
                        <div className="row">
                           {currentTableData.map(memory =>
                              <div className="col-xs-12 col-sm-4 col-md-6 col-lg-4" key={memory._id}>
                                 <MemoriesPost memory={memory} parentCallback={handleCallback} />
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
                  </div>
               </div>
            </section>
   
   
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
                  <Button variant="primary" onClick={removeSingleMemory}>
                     Yes
                  </Button>
               </Modal.Footer>
            </Modal>
         </div>
      );
   }
// }

export default MemoriesPosts;