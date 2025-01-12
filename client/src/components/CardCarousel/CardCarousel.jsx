import React from 'react';
import style from './CardCarousel.module.css';
import locationIcon from "../../assets/icons/location.svg"
import { Link } from 'react-router-dom';
const CardCarousel = ({ item }) => {
  


  return (
    <div key={item.id} className={style.cardCarousel}>
      <Link to ={`/games/detail/${item.id}`}>
      <img src='https://ichef.bbci.co.uk/news/640/cpsprodpb/238D/production/_95410190_gettyimages-488144002.jpg'/>
      <h4 className={style.title}>{item.complex_name}</h4>
      <div className={style.subtitle}>
      <p >{item.name}</p>
      <p>{item.start} hs</p>
      <p>{item.end} hs</p>
      </div>
      <div className={style.location}>
        <img src={locationIcon}/>
        <p>{item.adress},{item.city}</p>
        
      </div>
      </Link>
      
    </div>
  )
}

export default CardCarousel