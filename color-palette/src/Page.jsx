import React from 'react'
import './styles/App.css'

export default function Page({children}) {
  return (
    <section className='page'>{children}</section>
  )
}

