import React, { Component } from 'react';
import { Table, CustomInput } from 'reactstrap'
import SideNavbar from './AdminSideBar'
import Axios from 'axios';
import { API_URL } from '../../API_URL';

class AdminAddJumbotron extends Component {
    state = { 
        jumboList: [],
        addImageFileName : 'Select Image...',
        addImageFile : undefined,
        nameAdd : '',
        selectedEditPostId : 0,
     }
     componentDidMount() {
         Axios.get(`${API_URL}/jumboslider/getallsliders`)
         .then((res) => {
             this.setState({jumboList: res.data})
             console.log(res.data)
         })
         .catch((err) => {
             console.log(err)
         })
     }

    // ========================== RENDER BUTTON ===========================================
     onBtnDeleteClick = (id) => {
         Axios.delete(`${API_URL}/jumboslider/deletesliders/${id}`)
         .then((res) => {
                Axios.get(`${API_URL}/jumboslider/getallsliders`)
            .then((res) => {
                this.setState({jumboList: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
         })
         .catch((err) => {
             console.log(err)
         })
     }
    //  ======================= ADD =====================================
    onAddImageFileChange = (event) =>{
        // console.log(document.getElementById('addImagePost').files[0])
        console.log(event.target.files[0]);
        var file = event.target.files[0]
      
        if (file) {
            this.setState({addImageFileName :file.name, addImageFile: file })
        }else{
            this.setState({addImageFileName : 'Select Image...', addImageFile: undefined})
        }
    }

     onBtnAddClick = () => {
        if(this.state.addImageFile){
            var formData = new FormData()
        
            var headers = {
                headers : 
                {  
                    'Content-Type': 'multipart/form-data'
                },
                
            }

            
           
            // append mirip push di array
            formData.append('image', this.state.addImageFile)//image harus sama kaya di backend

            Axios.post(API_URL + '/jumboslider/addallsliders',formData,headers)
            .then((res)=>{
                Axios.get(`${API_URL}/jumboslider/getallsliders`)
                 .then((res)=>{
                
                this.setState({jumboList : res.data})
                })
                 .catch((err)=>{
                console.log(err);
            
                 })
                 this.setState({addImageFileName: 'Select Image...', nameAdd : ''})
                
                
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }
     }

     // ================================================RENDER JUMBO========================================================
     renderJumboList = () => {
      return  this.state.jumboList.map((item) => {
        if(item.id !== this.state.selectedEditPostId){
            return (<tr>
                <td>{item.id}</td>
                <td>
                <img width={100} src={`${item.image}`} alt='jumbo' />
                </td>
                <td><input type='button' className='btn btn-danger' value='DELETE' onClick={()=> this.onBtnDeleteClick(item.id)}/></td>
            </tr>
            )
        };
        return (
            <tr>
                <td>{item.id}</td>
                <td>
                    <img src={`${API_URL}${item.logo}`} alt={`${item.logo}`} width={100}/>
                   
                   
                  <CustomInput id='editImagePost' type='file' label={this.state.editImageFileName} onChange={this.onEditImageFileChange}  />  
                </td>
                <td><input type='button' className='btn btn-primary' value='CANCEL' onClick={()=> this.setState({selectedEditPostId : 0})} /></td>
                <td><input type='button' className='btn btn-primary' value='SAVE' onClick={()=> this.onBtnUpdatePostClick(item.id)}  /></td>
            </tr>
        )
        
        })
     }
     //================================================             =======================================================
    render() { 
        return ( 
            <div style={{marginTop: 70}} className='row'>
                <SideNavbar/>
            <div className='container' style={{}}>
                <center>
                    <h1> Manage Jumbotron</h1>
                    <Table striped bordered style={{justifyContent:'center'}}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>IMAGE</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderJumboList()}
                            
                        </tbody>    
                        <tfoot>
                           <tr>
                               <td></td>
                               <td>
                                    <CustomInput id="addImagePost" type='file' label={this.state.addImageFileName} onChange={this.onAddImageFileChange} /> 
                                   </td>
                               <td colSpan='2' style={{paddingLeft:155}}>
                               <input type='button' className='btn btn-success' value='ADD ' onClick={this.onBtnAddClick}/>
                               </td>
                               <td></td>
                           </tr>
                        </tfoot>
                    </Table >
                </center>
            </div>
        </div>
         );
    }
}
 
export default AdminAddJumbotron;