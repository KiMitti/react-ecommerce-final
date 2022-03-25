import React from 'react';
import styled from 'styled-components';
import { CartContent, PageHero } from '../components';

const CartPage = () => {
  return (
    <main>
      <PageHero pageTitle='cart' />
      <Wrapper className='page'>
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main``;

export default CartPage;
