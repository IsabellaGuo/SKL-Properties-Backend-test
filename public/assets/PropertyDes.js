import React from 'react'

function PropertyDes(props) {
    return (
        <div>
            <p className="property__description">
               {props.item.description}
            </p>
        </div>
    )
}

export default PropertyDes
