import React,{ Component } from 'react'
import {CustomInput, Table} from 'reactstrap'
import axios from 'axios'
import {API_URL} from '../../API_URL'
import SideNavBar from './AdminSideBar'

class AdminAddBrand extends Component {
    state={
        listBrand : [],
        addImageFileName : 'Select Image...',
        addImageFile : undefined,
        nameAdd : '',
        selectedEditPostId : 0,
        editImageFileName : 'Select Image...',
        editImageFile : undefined,
        nameEdit : ''
    }

    componentDidMount() {
        const token = localStorage.getItem('username')
        console.log(token)

        const headers = {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        }
        axios.get(`${API_URL}/brand/getbrand`)
        .then((res)=>{
            console.log(res.data)
            this.setState({listBrand : res.data})

        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
    // ======================================= ADD SECTION ================================================
    onCaptionAddChange = (event) =>{
        console.log(event.target.value);
        if (event.target.value.length <= 100 ){
            this.setState({nameAdd: event.target.value})
        }
    }
    
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

    onBtnBrandAddClick = () => {
        if(this.state.addImageFile){
            var formData = new FormData()
        const token = localStorage.getItem('username')
            var headers = {
                headers : 
                {   'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                
            }

            var data = {
                name : this.state.nameAdd
            }

            // append mirip push di array
            formData.append('logo', this.state.addImageFile)//logo harus sama kaya di backend
            formData.append('data', JSON.stringify(data))

            axios.post(API_URL + '/brand/addbrand',formData,headers)
            .then((res)=>{
                console.log(res.data);
                const token = localStorage.getItem('username')
                var headers = {
                    headers : 
                    {   'Authorization' : `Bearer ${token}`
                    }
                }
                axios.get(`${API_URL}/brand/getbrand`,headers)
                 .then((res)=>{
                
                this.setState({listBrand : res.data})
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
// =========================================== ADD SECTION END =========================================
//============================================ DELETE SECTION START ==============================================
    onBtnDeleteClick = (id) => {
        const token = localStorage.getItem('token')
        var headers = {
            headers : 
            {   'Authorization' : `Bearer ${token}`
            },
            params: {
                coba: `ini query`
            }
        }
        axios.delete(`${API_URL}/brand/deletebrand/${id}`,headers,{terserah: `ini body`})
        .then((res)=>{
            this.setState({listBrand : res.data})
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
//====================================== DELETE SECTION END ============================================
// ===================================== EDIT SECTION START =============================================
    onEditImageFileChange = (event) => {
        if(event.target.files[0]){
            this.setState({editImageFileName : event.target.files[0].name, editImageFile : event.target.files[0]})
        }
        else{
            this.setState({editImageFileName : 'Select Image...', editImageFile: undefined})
        }
    }

    oNameEditChange = (event) =>{
        console.log(event.target.value);
        if (event.target.value.length <= 100 ){
            this.setState({nameEdit: event.target.value})
        }
    }

    onBtnUpdatePostClick = (id) =>{
        var formData = new FormData()
        var headers = {
            headers:
            {   
                'Content-Type': 'multipart/form-data'
            }
        }

        var data = {
            name : this.state.nameEdit,
        }

        formData.append('logo',this.state.editImageFile)
        formData.append('data',JSON.stringify(data))

        axios.put(API_URL + "/brand/editbrand/" + id, formData,headers)
        .then((res)=>{
            this.setState({listBrand : res.data,selectedEditPostId : 0, editImageFileName : 'Select Image...'})
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

// ===================================== EDIT SECTION END ==============================================
//====================================== RENDER SECTION START =============================================
    renderBrandList = () => {
        return this.state.listBrand.map((item)=>{
            if(item.id !== this.state.selectedEditPostId){

                return (<tr>
                    <td>{item.id}</td>
                    <td><img src={`${API_URL + item.logo}`} alt={item.logo} width={100}/></td>
                    <td>{item.name}</td>
                    <td><input type='button' className='btn btn-primary' value='EDIT' onClick={()=> this.setState({selectedEditPostId : item.id,nameEdit:item.name})} /> </td>
                    <td><input type='button' className='btn btn-danger' value='DELETE' onClick={()=> this.onBtnDeleteClick(item.id)}/></td>
                </tr>)
            }
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>
                            <img src={`${API_URL}${item.logo}`} alt={`${item.logo}`} width={100}/>
                           
                           
                          <CustomInput id='editImagePost' type='file' label={this.state.editImageFileName} onChange={this.onEditImageFileChange}  />  
                        </td>
                        <td>
                            <textarea value={this.state.nameEdit} onChange={this.oNameEditChange}>
                            </textarea>
                        </td>
                        <td><input type='button' className='btn btn-primary' value='CANCEL' onClick={()=> this.setState({selectedEditPostId : 0})} /></td>
                        <td><input type='button' className='btn btn-primary' value='SAVE' onClick={()=> this.onBtnUpdatePostClick(item.id)}  /></td>
                    </tr>
                )
            
        })

    }
    //===================================== RENDER SECTION END ========================================

    render() {
        return (
            <div style={{marginTop: 70}} className='row'>
                <SideNavBar/>
                <div className='container' style={{}}>
                    <center>
                        <h1> Manage Brand</h1>
                        <Table striped dark bordered>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>LOGO</th>
                                    <th>NAME</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderBrandList()}
                            </tbody>
                            <tfoot>
                               <tr>
                                   <td></td>
                                   <td>
                                    <CustomInput id="addImagePost" type='file' label={this.state.addImageFileName} onChange={this.onAddImageFileChange} /> 
                                   </td>
                                    <td>
                                        <textarea value={this.state.nameAdd} onChange={this.onCaptionAddChange}>
                                        </textarea>
                                    </td>
                                   <td></td>
                                   <td>
                                   <input type='button' className='btn btn-success' value='ADD ' onClick={this.onBtnBrandAddClick}/>
                                   </td>
                                   <td></td>
                               </tr>
                            </tfoot>
                        </Table >
                    </center>
                </div>
            </div>
        )
    }
}

export default AdminAddBrand