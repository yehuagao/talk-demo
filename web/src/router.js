import React from 'react'
import { Route } from 'react-router'
import AppComponent from './modules/app/AppComponent.jsx'
import LoginComponent from './modules/login/LoginComponent.jsx'
export default (
 		
	<Route path="/" component={AppComponent}>		       
	     <Route path='/login' component={LoginComponent} />
	</Route>
    	
)