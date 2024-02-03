import React from 'react';
import millify from 'millify';
import { Card, Row, Col, Input } from 'antd'; 
import { Link } from 'react-router-dom'; 

import { useGetCryptosQuery } from '../services/CryptoApi'; 
import { useState } from 'react';

function CryptoCurrencies( { simplified } ) {
  const count = (simplified)? 10:100;

  const {data: cryptosList, isFetching} = useGetCryptosQuery(count);

  if(isFetching) return 'Loading...'

  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  console.log(cryptos);

  return (
      <>
        <Row gutter={[34, 34]} className='crypto-card-container'>
            {cryptos?.map((currency) => (
                <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                  <Link to={`/crypto/${currency.id}`}>
                      <Card 
                        title={`${currency.rank}. ${currency.name}`}
                        extra={<img className='crypto-image' src = {currency.iconUrl} />}
                        hoverable
                      >
                        <p> Price: {millify(currency.price)}</p>
                        <p> Market Cap: {millify(currency.marketCap)}</p>
                        <p> Daily Change: {millify(currency.change)} %</p>
                      </Card>
                  </Link>
                </Col>
            ))}
        </Row>
      </>
  )
}

export default CryptoCurrencies