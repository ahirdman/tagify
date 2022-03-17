import { useState, useEffect } from 'react'
import './Profile.scss'
import fetchJson from '../httpClient'

export const Profile = ({ accessToken }) => {

  // const Spotify = window.spotify

  const [user, setUser] = useState({})

  const getUser = async () => {
    const user = await fetchJson('/user', accessToken)
    setUser({
      name: user.display_name,
      image: user.images[0].url,
      followers: user.followers.total
    })
  }
  
  useEffect(() => {
    getUser();
  }, [])

  return (
    <section className='profile'>
      <img src={user.image} alt='profile' className='profile__image' />
      <p className='profile__name'>{user.name}</p>
      <p className='profile__followers'>{user.followers}</p>
    </section>
  )
}
