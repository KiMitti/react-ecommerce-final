import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
  const {
    filters: {
      text,
      company,
      cat,
      color,
      minPrice,
      maxPrice,
      actualPrice,
      shipping,
    },
    allProducts,
    updateFilters,
    clearFilters,
  } = useFilterContext();

  //get unique values from products for filters
  const categories = getUniqueValues(allProducts, 'category');
  const companies = getUniqueValues(allProducts, 'company');
  const colors = getUniqueValues(allProducts, 'colors');

  return (
    <Wrapper>
      <div className='content'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/*search input*/}
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='Search...'
              className='search-input'
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/*category input*/}
          <div className='form-control'>
            <h5>Categories</h5>
            {categories.map((category, index) => {
              return (
                <button
                  type='button'
                  name='cat'
                  className={category.toLowerCase() === cat ? 'active' : 'null'}
                  key={index}
                  value={category.toLowerCase()}
                  onClick={updateFilters}
                >
                  {category}
                </button>
              );
            })}
          </div>
          {/*company input*/}
          <div className='form-control'>
            <div className='form-control'>
              <h5>Company</h5>
              <select
                name='company'
                value={company}
                onChange={updateFilters}
                className={company}
              >
                {companies.map((company, index) => {
                  return (
                    <option value={company} key={index}>
                      {company}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/*color input*/}
          <div className='form-control'>
            <div className='form-control'>
              <h5>Colors</h5>
              <div className='colors'>
                {colors.map((c, index) => {
                  if (c === 'all') {
                    return (
                      <button
                        type='button'
                        name='color'
                        className={c === color ? 'all-btn active' : 'all-btn'}
                        key={index}
                        value={c}
                        onClick={updateFilters}
                      >
                        {c}
                      </button>
                    );
                  }
                  return (
                    <button
                      type='button'
                      name='color'
                      className={c === color ? 'color-btn active' : 'color-btn'}
                      key={index}
                      value={c}
                      style={{ backgroundColor: c }}
                      onClick={updateFilters}
                    >
                      {c === color && <FaCheck />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {/*price input*/}
          <div className='form-control'>
            <h5>Price</h5>
            <p className='price'>{formatPrice(actualPrice)}</p>
            <input
              type='range'
              name='actualPrice'
              min={minPrice}
              max={maxPrice}
              value={actualPrice}
              onChange={updateFilters}
            />
          </div>
          {/*shipping input*/}
          <div className='form-control shipping'>
            <label htmlFor='shipping'>free shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              onChange={updateFilters}
              checked={shipping}
            />
          </div>
        </form>
        {/* clear filters */}
        <button type='button' className='clear-btn' onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      // position: sticky;
      // top: 1rem;
    }
  }
`;

export default Filters;
