import React, { Component } from 'react';
import 'whatwg-fetch';
import { setConfig } from 'react-hot-loader';

import { setInStorage, getFromStorage } from '../../services/services';
import Login from './Login'
import RegisterPage from './Register'
  

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      token:''
    };

  }

  componentDidMount() {
    const token = getFromStorage('test_token')
    if(token){
      fetch('/api/account/verify?token='+token)
      .then(res => res.json())
      .then(json => {
        if(json.success){
            this.setState({
              token,
              isLoading:false
            })
        }
        else{
            this.setState({
              isLoading:false
          })
        }
      })
    }
    else{
      this.setState({
        isLoading:false
      })
    }
  }

  render() {
    const { isLoading , token } = this.state
    if (isLoading){
      return (<div>
        <p>Loading.....</p>
      </div>);
    }
    if(!token){
     return( <div>
        <Login/>
      </div>
     );
    }
    else{
    return (
      <div>
        <p>
          You are signed in.
        </p>
        <button>
          Log out
        </button>
      </div>
    );
  }
  }
}

export default Home;
