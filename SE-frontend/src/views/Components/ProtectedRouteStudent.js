import React from "react"
import { Route, Redirect } from "react-router-dom"

const ProtectedRouteStudent = ({ component: Component, studata, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (studata) return <Component {...rest} {...props} studata={studata} />
        else
          return (
            <Redirect
              to={{
                pathname: "/Unauthorized",
                state: { from: props.location }
              }}
            />
          )
      }}
    ></Route>
  )
}
export default ProtectedRouteStudent
