import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form,  Button } from 'react-bootstrap';
import { API_URL } from '../utils/constants';
import {
  useRecoilState,
} from 'recoil';
import { State } from '../../../State/State';
import JobsNavBar from "../../JobsNavBar";
import  FilesList  from './FilesList';
const UploadCv = (props) => {

  const [userInfo] = useRecoilState(State.userInfo);
  const [filesList, setFilesList] = useState(State.filesList);

  const [file, setFile] = useState(null); // state for storing actual image
  const [ ,setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [ ,setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  
  React.useEffect(() => {
    FatchApi();
  },[userInfo])

  const FatchApi = React.useCallback(async () => {
    if(userInfo._id != null){
    const { data } = await axios.post(`${API_URL}/getAllFiles`, {userId:userInfo._id});
    setErrorMsg('');
    const arrayData = [data];
    setFilesList(arrayData);}
  })

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  const handleOnSubmit = async (event) => {
     event.preventDefault();

    try {
      const { title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);
          formData.append('userId', userInfo._id);

          setErrorMsg('');
          
          const res = await Promise.all([
            await axios.post(`${API_URL}/upload`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }),
            FatchApi(),
          ]);
          props.history.push('/list');
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <>
                          <JobsNavBar />
                          <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">{"<Junior>"}</span>
          <span className="block text-indigo-600">Upload CV</span>
        </h2>
        {/* <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get started
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Learn more
            </a>
          </div>
        </div> */}
      </div>
    </div>
    <div >
    <React.Fragment >
      <Form className="search-form" onSubmit={handleOnSubmit}>
        
       <div style={{display:'flex', justifyContent:'center', alignItems:'center',alignContent:'center', marginTop:'50px',flexWrap:'wrap'}}>
       
       {errorMsg && <p className="errorMsg">{errorMsg}</p>}
       
       <div style={{marginTop:"10px",marginBottom:"10px"}}>
        <Form.Group controlId="title">
              <Form.Control
                type="text"
                name="title"
                value={state.title || ''}
                placeholder="Enter title"
                onChange={handleInputChange}
              />
            </Form.Group>
        </div>
           
         
       
        
          <div style={{marginRight:"10px",marginLeft:"10px",marginTop:"10px",marginBottom:"10px"}}>
          <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="description"
                value={state.description || ''}
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </Form.Group>

          </div >
          <div style={{marginTop:"10px",marginBottom:"10px"}} className="upload-section">
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              
              <Button  {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} />
                <p style={{display:'flex',justifyContent:'center', alignItems:'center', margin:'0px'}}>{"click here to select a file "}</p>
              </Button>
            )}
           
          </Dropzone>
          <div>
          {file && (
                  <div>
                    <strong>{"Selected file:"}</strong> {file.name}
                  </div>
                )}
          </div>
          {/* {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )} */}
        </div>
       </div>
       
        
          
         
        
         
     
        <div style={{display:'flex',justifyContent:'center',marginTop:'50px'}}>
        <Button variant="success" type="submit">
          Upload
        </Button>
        </div>
        
      </Form>
    </React.Fragment>

    </div>
    <div >
      <FilesList fileListData={filesList}/>
    </div>
    </>
  );
};

export default UploadCv;
