import React, { useState } from "react";
import FileBase64 from 'react-file-base64';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "../MemoriesEditForm/MemoriesEditForm.css";
import sanitizeHtml from "sanitize-html";
import { patchMemory } from '../../_actions/memoriespost';
function MemoriesEditForm() {
   const location = useLocation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { memory } = location.state;
   const [updateMemory, setUpdateMemory] = useState({
      title: memory.title,
      description: memory.description,
      creator: memory.creator,
      id: memory._id,
      selectedFile: memory.selectedFile
   });
   const selectedFile = {
      backgroundImage: 'url(' + updateMemory.selectedFile + ')'
   }
   // const { memory } = location.state;
   function handleEditorChange(event, editor) {
      const sanitizedData = sanitizeHtml(editor.getData());
      setUpdateMemory(updateMemory => ({ ...updateMemory, description: sanitizedData }));
   }

   function handleChange(event) {
      setUpdateMemory(updateMemory => ({ ...updateMemory, [event.target.name]: event.target.value }))
   }

   function handleSubmit(e) {
      e.preventDefault();
      console.log(updateMemory);
      const { from } = { from: { pathname: "/home" } };
      dispatch(patchMemory(updateMemory.id, updateMemory,navigate,from));
   }

   // Callback~
   // function getFile(file) {
   //    console.log(updateMemory);
   //    setUpdateMemory(updateMemory => ({ ...updateMemory, selectedFile: file.base64 }))
   
   // }
   return (
      <div className="container">
         <div className="row editForm">
           <div className="col">
           <form name="form" onSubmit={handleSubmit} autoComplete="off">
               <div className="mb-3">
                  <label className="form-label">Creator</label>
                  <input type="text" className="form-control" aria-describedby="memroryCreator" value={updateMemory.creator}
                  onChange={handleChange} />
               </div>
               <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" aria-describedby="memoryTitle" value={updateMemory.title}
                  onChange={handleChange} />
               </div>
               <CKEditor
                  editor={ClassicEditor}
                  data={updateMemory.description}
                  onChange={handleEditorChange}
                  config={{
                     toolbar: [
                        "Heading",
                        "|",
                        "Bold",
                        "Italic",
                        "Link",
                        "NumberedList",
                        "BulletedList",
                        "|",
                        "BlockQuote",
                        "MediaEmbed",
                        "Undo",
                        "Redo",
                     ],
                  }}
               />
               <div className="previewBanner">
               <label>Image Preview</label>
               <div className="bannerDetails" style={selectedFile}></div>
               </div>
               <div className='fileInput'>
                  <label>Image upload</label>
                  <p><FileBase64 type="file" multiple={false} onDone={({ base64 }) => setUpdateMemory({ ...updateMemory, selectedFile: base64 })} /></p>
               </div>
               <button className="btn btn-primary updateBtn">Update</button>
            </form>
           </div>
         </div>
      </div>
   );
}
export default MemoriesEditForm;