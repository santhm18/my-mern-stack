import React from "react";
import FileBase64 from 'react-file-base64';
import { connect } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./MemoriesForm.css";
import { createNewMemory } from '../../_actions/memoriespost';
class MemoriesForm extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         creator: '',
         title: '',
         description: '',
         selectedFile: ''
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleEditorChange = this.handleEditorChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
   }

   handleEditorChange(event, editor) {
      this.setState({ description: editor.getData() });
   }

   // Callback~
   getFile(file) {
      this.setState({ selectedFile: file.base64 })
   }

   handleSubmit(e) {
      e.preventDefault();
      // const {currentId} =  this.props;
      const memory = this.state;
      this.props.createNewMemory(memory);
      // if (currentId === 0) {
      //    this.props.createNewMemory(memory);
      //  } else {
      //    this.props.updateMemory(currentId,memory);
      //  }
   }

   // static getDerivedStateFromProps(props, current_state) {
   //    if (props.currentId !== 0) {
   //       const selectedMemory =  props.currentId ? props.memories.find((memory) => memory._id === props.currentId) : null;
   //       return {
   //          creator: selectedMemory.creator,
   //          title:selectedMemory.title,
   //          description:selectedMemory.description
   //        }
   //    }
   //    return null
   //  }

   

   render() {
      // const { creator, title, description } = this.state;
      // const { currentId, setCurrentId } = this.props;
      return (

         <div className="modal fade memoryFormModal" id="memoryFormModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="container modal-dialog modal-dialog-scrollable modal-fullscreen">
               <form name="form" onSubmit={this.handleSubmit} autoComplete="off">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="memoryFormModal">Creating a Memory</h5>
                        {/* <h5 className="modal-title" id="memoryFormModal">{currentId ? `Editing "${title}"` : 'Creating a Memory'}</h5> */}
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div className="modal-body">
                        <div className="memoriesForm">

                           <div className="marginBottom15">
                              <label>Creator</label>
                              <input type="text" className="form-control form-fields" placeholder="creator name"
                                 value={this.state.creator} name="creator" onChange={this.handleChange} />
                           </div>
                           <div className="marginBottom15">
                              <label>Title</label>
                              <input type="text" className="form-control form-fields" placeholder="memory title"
                                 value={this.state.title} name="title" onChange={this.handleChange} />
                           </div>
                           <div className="marginBottom15">
                              <label>Description</label>
                              {/* <textarea className="form-control form-fields" rows="4" cols="50"
                                 name="description" defaultValue={description} onChange={this.handleChange}></textarea> */}

                              <CKEditor
                                 editor={ClassicEditor}
                                 value={this.state.description}
                                 onChange={this.handleEditorChange}
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
                           </div>
                           <div className='fileInput'>
                              <label>Image upload</label>
                              <p><FileBase64 type="file" multiple={false} onDone={this.getFile.bind(this)} /></p></div>

                        </div>
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn formClearbutton formbuttons" data-bs-dismiss="modal">Close</button>
                        <button className="btn formCreationbutton formbuttons">Submit</button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      state: state.memory,
      memories: state.memoriespost
   }
}

// Define all dispatch methods below 
const actionCreators = {
   createNewMemory: createNewMemory
};
export default connect(mapStateToProps, actionCreators)(MemoriesForm);