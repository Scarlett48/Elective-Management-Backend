import React from "react"
import { Route, Redirect } from "react-router-dom"

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (user === "admin") return <Component {...rest} {...props} />
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
export default ProtectedRoute
