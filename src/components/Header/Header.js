import React from 'react'
import useStyle from './styles'

const Header = (props) => {
  const classes = useStyle()
  return(<div  className ={classes.container}>
    <p>{props.text}</p>
  </div>)
}

export default Header ;