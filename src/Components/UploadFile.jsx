// import React, { useState } from "react";
// import Axios from "axios";

// function UpLoadFile() {
//   const [name, setName] = useState();
//   const [file, setFile] = useState();

//   const send = event => {
//     const data = new FormData();
//     data.append("name", name);
//     data.append("file", file);

//     console.log(data)
//     Axios.post("http://localhost:4000/users/uploadcv", data)
//       .then(res => console.log(res))
//       .catch(err => console.log(err));
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <form action="#">
//           <div className="flex">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               onChange={event => {
//                 const { value } = event.target;
//                 setName(value);
//               }}
//             />
//           </div>
//           <div className="flex">
//             <label htmlFor="file">File</label>
//             <input
//               type="file"
//               id="file"
//             //   accept=".jpg"
//               onChange={event => {
//                 const file = event.target.files[0];
//                 setFile(file);
//               }}
//             />
//           </div>
//         </form>
//         <button onClick={send}>Send</button>
//       </header>
//     </div>
//   );
// }

// export default UpLoadFile;


// import React from 'react';
// import axios from 'axios';
// import { getAllUserDataFromToken } from '../Api/api';
// import { getUserToken } from '../services/authServices';

// class UploadFile extends React.Component {

//   constructor(props) {
//       super(props);
//       this.state ={
//           file: null
//       };
//       this.onFormSubmit = this.onFormSubmit.bind(this);
//       this.onChange = this.onChange.bind(this);
//   }
//  async onFormSubmit(e){
//       e.preventDefault();
//       const formData = new FormData();
//       formData.append('myfile',this.state.file);
//       console.log()

//       const token = await getUserToken();
      
//       const config = {
//           headers: {
//               'content-type': 'multipart/form-data',
//             //   "x-auth-token" : token
//           }
//       };
      
//       const userData = await getAllUserDataFromToken();
//       axios.post("http://localhost:4000/users/uploadcv",formData,config)
//           .then((response) => {
//               alert("The file is successfully uploaded");
//           }).catch((error) => {
//       });
//   }

//   onChange(e) {
//       this.setState({file:e.target.files});
//   }

//   render() {
//       return (
//           <form onSubmit={this.onFormSubmit}>
//               <h1>File Upload</h1>
//               <input type="file" className="custom-file-input" name="myImage" onChange= {this.onChange} />
//               {/* //{console.log(this.state.file)} */}
//               <button className="upload-button" type="submit">Upload to DB</button>
//           </form>
//       )
//   }
// }

// export default UploadFile;


import React, { Component } from 'react';
import axios from 'axios';
import { getUserData } from '../services/authServices';

export default class UploadFile extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            profileImg: ''
        }
    }

    onFileChange(e) {
        this.setState({ profileImg: e.target.files[0] })
    }

   async onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        const userData = await getUserData();

        formData.append('usercv', this.state.profileImg)

        axios.post("http://localhost:4000/users/getUserData", userData, {
        }).then(res => {
            console.log(res)
        })

        axios.post("http://localhost:4000/users/user-profile", formData, {
        }).then(res => {
            console.log(res)
        })
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}