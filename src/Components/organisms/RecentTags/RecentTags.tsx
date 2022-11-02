import * as React from 'react'
import './RecentTags.scss'
import { useAppSelector } from '../../../store/hooks';
import { selectTagPlaylists } from '../../../store/playlists/playlists.slice';
import { TagSpotlight } from '../../molecules';

const RecentTags = () => {
  
  const taglists = useAppSelector(selectTagPlaylists);
  return (
    <ul className='recent-tags'>
      {taglists.map((list, index) => {
        return <TagSpotlight key={index} list={list} />;
      })}
    </ul>
  )
}

export default RecentTags