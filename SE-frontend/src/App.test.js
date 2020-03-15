import React from "react"
import {
  render,
  queryAllByText,
  findAllByText,
  getByTitle
} from "@testing-library/react"
import App from "./App"
import { unmountComponentAtNode } from "react-dom"

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

test("renders home page button ", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText("Instructions")
  expect(linkElement).toBeInTheDocument()
})

test("renders login button", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText("login")
  expect(linkElement).toBeInTheDocument()
})
