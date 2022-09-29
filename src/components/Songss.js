import React, { useEffect, useState } from 'react'
import { Container, InputGroup, FormControl, Button, Row, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Songss({ track }) {
  return (
   
    <Card>
      <Card.Img src={track.albumUrl} />
      <Card.Body>
        <div className="text"><font color="green">Songs Name:</font><br /> {track.title} <p><font color="green">Artist Name:</font><br /> {track.artist}</p></div>
        <a href={track.link} target="_blank" rel="noreferrer">
          <button style={{borderRadius:"5rem",background:"#49f585"}}>Click to visit Spotify</button>
        </a>
    </Card.Body>
      </Card >
     
    
  )
}
