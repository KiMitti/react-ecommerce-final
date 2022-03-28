import React from 'react';
import { useProductsContext } from '../context/products_context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Error from './Error';
import Loading from './Loading';
import Product from './Product';

const FeaturedProducts = () => {
  const { featuredProducts, productsLoading, productsError } =
    useProductsContext();
  if (productsLoading) {
    return <Loading />;
  }
  if (productsError) {
    return <Error />;
  }

  if (featuredProducts.length > 0) {
    return (
      <Wrapper className='section'>
        <div className='title'>
          <h2>featured products</h2>
          <div className='underline'></div>
        </div>
        <div className='featured section-center'>
          {featuredProducts.map((product) => {
            return <Product key={product.id} {...product} />;
          })}
        </div>
        <Link to='/products' className='btn'>
          See All Products!
        </Link>
      </Wrapper>
    );
  }
  return <></>;
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 200px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
