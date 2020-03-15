import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import Navbar from '../Components/Navbar'




const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
// const DefaultHeader = React.lazy(() => import('./DefaultHeader'));


class DefaultLayout extends Component{
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    signOut(e) {
        e.preventDefault()
        this.props.history.push('/login')
      }

      render(){
          return(
            <div>
              <Navbar/>
            </div>
           
             
          );
      }
}


export default DefaultLayout;