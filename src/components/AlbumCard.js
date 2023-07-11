import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function AlbumCard({ name, genre, rating }) {
  return (
    <>
    <Card style={{
        background: "rgba(244, 244, 244, .7)"
    }}>
        <Card.Title>
          <div style={{textAlign:"center"}}>
            <h2 className="fs-0">{name}</h2>
            <h1 className="fs-5">{genre}</h1>
            <h1 className="fs-5">{rating}</h1>
          </div>
        </Card.Title>
        <Card.Body>
      
        </Card.Body>
    </Card>
    </>
  )
}
