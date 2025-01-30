import React from 'react';


const formatNumber = (number) => {
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + number).length / 3);
    const shortNumber = parseFloat((number / Math.pow(1000, suffixNum)).toFixed(1));
    return shortNumber >= 1 ? `${shortNumber}${suffixes[suffixNum]}${"+"}` : number.toString();
  };

const CardBelowHome = () => {
    const adoptedPets = formatNumber(1212);
  return (
    <div className='dark-grey-container'>
      <div className='left-pic'></div>
      <div className='left-para'><p><span className='adopted-pets-num'>{adoptedPets}</span><br/></p></div>
      <div className='right-pic'></div>
      <div className='right-para'><p className='we-do'></p></div>
    </div>
  )
}

export default CardBelowHome;