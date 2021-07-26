import Axios from 'axios'
import { setNestedObjectValues } from 'formik'
import React, { useEffect, useState } from 'react'
import './favorite.css'


function FavoritePage() {

    const [Movies, setMovies] = useState([])

    useEffect(() => {
        
        Axios.post('/api/favorite/getFavoriteMovie', {userFrom: localStorage.getItem('userId') })
            .then(response => {
                if(response.data.success){

                    console.log(response.data)

                    setMovies(response.data.favorites)

                }
                else{
                    alert('영화 정보를 가져오는데 실패했습니다.')
                }
            })        
    }, [])


    return (
        <div style={{width:'85%', margin: '3rem auto'}}>
            <h2> Favorite Movies </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                    {Movies.map((favorite, index) => (
                        <tr key={index}>
                            <td>{favorite.movieTitle}</td>
                            <td>{favorite.movieRunTime} mins</td>  
                            <td><button>Remove</button></td>                          
                        </tr>
                    ))}
                </tbody>
            </table>            
        </div>
    )
}

export default FavoritePage
