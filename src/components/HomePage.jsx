import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom'; 
import { useGetCryptosQuery } from '../services/CryptoApi'; 
import CryptoCurrencies from './CryptoCurrencies';
import News from './News';

const { Title } = Typography;

function HomePage() {

  const { data, isFetching } = useGetCryptosQuery(10);

  if(isFetching) return "Loading...";
  const globalStats = data?.data?.stats;

  console.log(data);

  return (
    <>
      <Title level={2} className='heading'>Global Crypto stats</Title>
      <Row>
        <Col span={12}> <Statistic title="Total CryptoCurrency" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/> </Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /> </Col>
        <Col span={12}><Statistic title="Total 24h volume" value={millify(globalStats.total24hVolume)} /> </Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /> </Col>
      </Row>
      
      <div className='home-heading-container'>
        <Title level={2} className='home-heading'>Top 10 Crypto Currencies in the world</Title>
        <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show more...</Link></Title>
      </div>
      <CryptoCurrencies simplified />
      <div className='home-heading-container'>
        <Title level={2} className='home-heading'>Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to='/news'>Show more...</Link> </Title>
      </div>
      <News simplified />
    </>
  )
}

export default HomePage