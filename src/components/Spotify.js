import React, { useEffect, useState } from 'react'
import { Container, InputGroup, FormControl, Button, Row, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useStateProvider } from '../assests/StateProvider';
import { reducerCases } from '../assests/Constants';
import Songss from './Songss';
import Header from './header';
import Footer from './Footer';



function Spotify() {

    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlums] = useState([]);
    const [songs, setSongs] = useState([]);

    const [{ token }, dispatch] = useStateProvider();
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const token = hash.substring(1).split("&")[0].split("=")[1];
            setAccessToken(token);
            dispatch({ type: reducerCases.SET_TOKEN, token });
        }
    }, [dispatch, token]);
    // Search 
    async function search() {
        console.log("Search for " + searchInput)

        //Atrist id
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => { return data.artists.items[0].id }
            )
        // song id

        var songID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', searchParameters)
            .then(response => response.json())
            .then(data => setSongs(data.tracks.items.map(tracks => {
                return {
                    artist: tracks.artists[0].name,
                    title: tracks.name,
                    uri: tracks.uri,
                    albumUrl: tracks.album.images[1].url,
                    link: tracks.external_urls.spotify,

                }
            })))
        console.log(songs)

        // console.log("Artist ID is " + artistID);
        // with id grab alumb
        var returedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setAlums(data.items);
            });

    }

    // console.log(albums);
    return (
        <div>
        <div className="App">
            <Header />
            <Container >
                <InputGroup className="mb-3" size="lg">
                    <FormControl
                        placeholder="Search For Artist or Album Name"
                        type="input"
                        onKeyPress={event => {
                            if (event.key == "Enter") {
                                search();
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                    <Button onClick={search} style={{background:"Black"}}>
                        Search
                    </Button>
                </InputGroup>
                <div className="white">
                <h1>Songs</h1>
                </div>
                <Row className="mx-2 row row-cols-6">
                    {songs.map(track => (
                        <Songss track={track} key={track.uri} />
                    ))}
                </Row>
            </Container>
            <div className="white">
                <h1>Albums list</h1>
            </div>
            <Container>
                <Row className="mx-2 row row-cols-4">
                    {albums.map((album, i) => {
                        // console.log(album)
                        return (
                            <Card sx={{BackgroundColour: "#3b3d3c"}}>
                                <Card.Img src={album.images[0].url} />
                                <Card.Body>
                                    <p> Album name:  {album.name} </p>
                                </Card.Body>
                            </Card>
                        )
                    })}

                </Row>
                
            </Container>
            
        </div>
        <Footer />
        </div>


    )
}

export default Spotify;