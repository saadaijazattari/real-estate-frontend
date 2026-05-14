import React from 'react'
import './Filter.scss'

const Filter = () => {
  return (
    <div className='filter'>
        <h1>Search results for <b>London</b></h1>
        <div className='top'>
            <div className='item'>
                <label htmlFor="city">Location</label>
                <input type="text" id="city" name='city' placeholder='City Location'/>
            </div>
        </div>
        <div className="bottom">

            {/* item 1 */}
            <div className='item'>
                <label htmlFor="Type">Type</label>
                <select name="Type" id="Type">
                    <option value="">any</option>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                </select>

            </div>

                {/* item 2 */}
            <div className='item'>
                <label htmlFor="Property">Property</label>
                <select name="Property" id="Property">
                    <option value="">any</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Condo">Condo</option>
                    <option value="Land">Land</option>
                </select>

            </div>

            {/* item 3 */}
            <div className='item'>
                <label htmlFor="minPrice">Min Price</label>
                <input type="number" id="minPrice" name='minPrice' placeholder='any'/>
            </div>

            {/* item 4 */}
            <div className='item'>
                <label htmlFor="maxPrice">Max Price</label>
                <input type="number" id="maxPrice" name='maxPrice' placeholder='any'/>
            </div>

            {/* item 5  */}
            <div className='item'>
                <label htmlFor="bedrooms">Bedrooms</label>
                <input type="number" id="bedrooms" name='bedrooms' placeholder='any'/>
            </div>
            
            <button>
                <img src="/search.png" alt="" />
            </button>
        </div>
    </div>
  )
}

export default Filter