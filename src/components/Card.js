import React from 'react';


const Card = () => {
    return (
        <div className="Card">
            <h3>Add Item</h3>
            <form>
                <input type="text" className="inpt" placeholder=" Title"/>
                <input type="text" className="inpt" placeholder=" Description"/>
                <input type="text" className="inpt" placeholder=" Tag"/>

                <button type="submit" className="btn">Send</button>
            </form>
        </div>
    )
};

export default Card;