import React from 'react'
import './ListingCard.css'

const ListingCard = (props) => {
    const listing = props.listing;
    const name = listing.name;
    const city = listing.city;
    const rating = listing.rating;
    const price = listing.price;

    return(
    <div className="listing-card">
        <div className="listing-image"> </div>
        <div className="listing-info">
            <div className="listing-details">
                <div className="listing-name"> {name}</div>
                <div className="listing-city">{city} </div>
                <div className="listing-rating">{rating}</div>
            </div>
            <div className="listing-price">{price}</div>
        </div>
    </div>
    )
}

export default ListingCard