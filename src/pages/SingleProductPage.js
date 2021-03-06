import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
  const {
    fetchSingleProduct,
    clearSingleError,
    singleProductError,
    singleProductLoading,
    singleProduct,
  } = useProductsContext();
  const { id } = useParams();
  const productUrl = `${url}${id}`;
  const history = useNavigate();

  //try to get the single product
  useEffect(() => {
    fetchSingleProduct(productUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //redirect to homepage if there is an error & clear the error
  useEffect(() => {
    if (singleProductError) {
      setTimeout(() => {
        clearSingleError();
        history('/');
      }, 3000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleProductError]);

  if (singleProductLoading) {
    return <Loading />;
  }
  if (singleProductError) {
    return <Error />;
  }

  //destructure all the product info
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = singleProduct;

  return (
    <Wrapper>
      <PageHero pageTitle={name} product />
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          Back to Products
        </Link>
        <div className='product-center'>
          <ProductImages images={images} />
          <section className='content'>
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Availability:</span> {stock}
            </p>
            <p className='info'>
              <span>SKU:</span> {sku}
            </p>
            <p className='info'>
              <span>Brand:</span> {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={singleProduct} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
