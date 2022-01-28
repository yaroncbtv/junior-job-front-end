import React, { useState, useEffect } from 'react';
// import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import {
  useRecoilState,
} from 'recoil';
import { State } from '../../../State/State';
import {  Table } from 'react-bootstrap';

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [, setErrorMsg] = useState('');
  const [userInfo] = useRecoilState(State.userInfo);

  
  useEffect(() => {

    const getFilesList = async () => {
      try {
        if(userInfo._id != null){
          const { data } = await axios.post(`${API_URL}/getAllFiles`, {userId:userInfo._id});
          setErrorMsg('');
          setFilesList(filesList => [...filesList, data]);

          //setFilesList(data);
        }
        
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, [userInfo]);

  // const downloadFile = async (id, path, mimetype) => {
  //   try {
      

  //     const result = await axios.get(`${API_URL}/download/${id}`, {
  //       responseType: 'blob'
  //     });

  //     console.log(filesList)
  //     const split = path.split('/');
  //     const filename = split[split.length - 1];
  //     setErrorMsg('');
  //     return download(result.data, filename, mimetype);
  //   } catch (error) {
  //     if (error.response && error.response.status === 400) {
  //       setErrorMsg('Error while downloading file. Try again later');
  //     }
  //   }
  // };
  return (
    
    <div className="files-container">

      <div className="container">
      {/* <Row>
        
        <Row>
          <Col>Title</Col>
          <Col>Description</Col>
          <Col>Download File</Col>
        </Row>
        
        {filesList.length > 0 ? (
            filesList.map(
              (data) => (
                <Row key={data._id}>

                  <Col className="file-title">{data.files.title}</Col>
                  <Col className="file-description">{data.files.description}</Col>
                  <Col>
                    <a
                      href={data.files.file_path}
                      // onClick={() =>
                      //   downloadFile(data._id, data.files.file_path, data.files.file_mimetype)
                      // }
                    >
                      Download
                    </a>
                  </Col>
                </Row>
              )
            )
          ) : (
            <Col>
              <Col colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </Col>
            </Col>
          )}
       
        </Row> */}
        <h1>My CV</h1>
        {/* {errorMsg && <p className="errorMsg">{errorMsg}</p>} */}
<Table striped bordered hover size="lg">
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Description</th>
      <th>Download File</th>
    </tr>
 
  {filesList.length > 0 ? (
            filesList.map(
              (data, index) => (
                <tr key={data._id}> 
      <td>{index + 1}</td>
      <td>{data.files.title}</td>
      <td>{data.files.description}</td>
      <td> <a
                      href={data.files.file_path}
                      // onClick={() =>
                      //   downloadFile(data._id, data.files.file_path, data.files.file_mimetype)
                      // }
                    >
                      Download
                    </a></td>
    </tr>
              )
            )
          ) : (
          
              <td >
                No files found. Please add some.
              </td>
            
          )}
 </thead>

</Table>

      </div>
      
      
      
      
      
      
      
      
      {/* <table className="files-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              (data) => (
                <tr key={data._id}>

                  <td className="file-title">{data.files.title}</td>
                  <td className="file-description">{data.files.description}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(data._id, data.files.file_path, data.files.file_mimetype)
                      }
                    >
                      Download
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table> */}
    </div>
  );
};

export default FilesList;
