import React from 'react'
export default function Button(props) {
  return (
    <button className={`button ${props.className}`} styles={props.styles} onClick={props.onClick}>{props.children}</button>
  )
}
