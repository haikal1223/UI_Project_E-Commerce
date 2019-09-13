import React, { Component} from 'react'
import { Table} from 'reactstrap'
import Axios from 'axios'
import { API_URL } from '../../API_URL'
import SideNavbar from './AdminSideBar'
class AdminAddCategory extends Component {
    state={
        listCat : [],
        nameAdd : '',
        selectedEditPostId : 0,
        nameEdit : ''
    }

    componentDidMount(){
        Axios.get(`${API_URL}/category/getcategory`)
        .then((res) => {
            this.setState({listCat: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderCategoryList = () => {
        return this.state.listCat.map((item) => {
            if(item.id !== this.state.selectedEditPostId){

                return (<tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td><input type='button' className='btn btn-primary' value='EDIT' onClick={()=> this.setState({selectedEditPostId : item.id,nameEdit:item.name})} /> </td>
                    <td><input type='button' className='btn btn-danger' value='DELETE' onClick={()=> this.onBtnDeleteClick(item.id)}/></td>
                </tr>)
            }
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>
                        <input type='text' value={this.state.nameEdit} onChange={this.onEditNameChange}>
                        </input>
                    </td>
                    <td><input type='button' className='btn btn-primary' value='CANCEL' onClick={()=> this.setState({selectedEditPostId : 0})} /></td>
                    <td><input type='button' className='btn btn-primary' value='SAVE' onClick={()=> this.onBtnSaveClick(item.id)}  /></td>
                </tr>
            )
        })
    }

    // ========================================= ADD START ==============================================
    onCaptionAddChange = (event) =>{
        console.log(event.target.value);
        if (event.target.value.length <= 100 ){
            this.setState({nameAdd: event.target.value})
        }
    }

    onBtnAddClick = () => {
        var data = {
            name: this.state.nameAdd
        }

        Axios.post(API_URL+'/category/postcategory', data)
        .then((res) => {
            this.setState({listCat: res.data})

        })
        .catch((err) => {
            console.log(err)
        })
    }

    //============================================ ADD END ==================================================
    // =========================================== DELETE START =============================================
        onBtnDeleteClick = (id) => {
            Axios.delete(`${API_URL}/category/deletecategory/${id}`)
            .then((res) => {
                this.setState({listCat: res.data})
            })
            .catch((err) => {
                console.log(err)
            })

        }
    // =========================================== DELETE END ================================================
    // =========================================== EDIT START ================================================
        onBtnSaveClick = (id) => {
        
            Axios.put(`${API_URL}/category/editcategory/${id}`, {name:this.state.nameEdit})
            .then((res) => {
                this.setState({listCat: res.data, selectedEditPostId : 0})
            })
            .catch((err) => {
                console.log(err)
            })
        }

        onEditNameChange = (e) => {
            if (e.target.value.length <= 100 ){
                this.setState({nameEdit: e.target.value})
            }
        }
    //============================================ EDIT END ==================================================

    render() {
        return (
            <div style={{marginTop: 70}} className='row'>
                <SideNavbar/>
            <div className='container' style={{}}>
                <center>
                    <h1> Manage Category</h1>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCategoryList()}
                        </tbody>
                        <tfoot>
                           <tr>
                               <td></td>
                                <td>
                                    <input type='text' value={this.state.nameAdd} onChange={this.onCaptionAddChange}>
                                    </input>
                                </td>
                               <td></td>
                               <td>
                               <input type='button' className='btn btn-success' value='ADD' onClick={this.onBtnAddClick}/>
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

export default AdminAddCategory