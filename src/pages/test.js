import React,{ Component} from 'react'

class Test extends Component {
    render(){
        return (
            <div>
      <div className="bodyRegister" style={{marginTop: '200px'}}>
                    <div className="main">
                        <div className="container">
                            <form className="appointment-form" id="appointment-form">
                                <h2>Welcome to Instagrin</h2>
                                <div className="form-group-1">
                                    <input ref="username" type="text" name="name" id="name" placeholder="Username" required />
                                    <input ref="email" type="email" name="email" id="email" placeholder="Email" required />
                                    <input ref="password" type="text" name="password" id="password" placeholder="Password" required />
                                </div>
                                <div>
                                    {this.renderError()}
                                </div>
                                <div className="form-submit">
                                    {this.renderButton()}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Test