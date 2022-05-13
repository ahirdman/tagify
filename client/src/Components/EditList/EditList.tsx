import * as React from 'react';
import { useEffect, useState } from 'react';
import Magnifier from '../../assets/magnifier.svg';
import { onSnapshot } from 'firebase/firestore';
import './EditList.scss';
import { tagDoc } from '../../utils/firebase';
import { IDbTrack } from '../../utils/interface';

interface IEditListProps {
  selectedList: string;
}

const EditList = ({ selectedList }: IEditListProps) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(tagDoc('purchasedAids', selectedList), doc => {
      const tracks = doc.data().tracks;
      setTracks(tracks);
    });

    return () => {
      unsub();
    };
  }, [selectedList]);

  return (
    <fieldset className="edit-list">
      <legend className="edit-list__title">{selectedList}</legend>
      <form className="edit-list__search">
        <input type="text" className="edit-list__search--input" />
        <img src={Magnifier} alt="search" className="edit-list__search--icon" />
      </form>
      <section className="edit-list__header">
        <p className="edit-list__header--title">TRACKS</p>
      </section>
      <ul className="tracks">
        {tracks.map((track: IDbTrack, index) => {
          return (
            <li key={index} className="tracks__row">
              <img src={track.artwork} alt="album" className="tracks__album" />
              <section className="tracks__details">
                <p className="tracks__details--title">{track.title}</p>
                <p className="tracks__details--artist">{track.artist}</p>
              </section>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};

export default EditList;
