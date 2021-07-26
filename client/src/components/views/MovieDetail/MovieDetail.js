import React, {useEffect, useState}from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards'
import Favorite from './Sections/Favorite'
import { Row } from 'antd';

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        
//        console.log(props.match)
        
        let endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;
        
        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log("MovieDetail Info response", response)
            setMovie(response)            
        })

        let endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            console.log("MovieDetail Casts", response.cast)
            setCasts(response.cast);
        })

        return () => {
           
        }
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }
    
    return (
        <div>
            
            {Movie.backdrop_path &&

                <MainImage image={`${IMAGE_BASE_URL}/w1280/${Movie.backdrop_path}`} 
                    title={Movie.title} 
                    desc={Movie.overview} 
                />

            }

            <div style={{width:'85%', margin: '1rem auto'}}>

                <div style={{ display:'flex', justifyContent: 'flex-end'}}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>
               
                <br />

                <MovieInfo movie={Movie} />

                {/* Movie Grid Cards */}

                <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16,16]}>
                        {Casts && Casts.map((cast, index) => (
                            
                            //console.log('movie : ' , movie.original_title),
                            <React.Fragment key={index}>                                
                                <GridCards 
                                    image= { cast.profile_path ?
                                    `${IMAGE_BASE_URL}/w500/${cast.profile_path}` : null}                                
                                    charaterName={cast.name}
                                />
                            </React.Fragment>
                            
                        ))}                        
                    </Row>
                }
            </div>
            
        </div>
    )
}

export default MovieDetail
