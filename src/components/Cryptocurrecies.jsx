import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrecies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  if (isFetching) return "Loading..";
  return (
    <>
      {simplified ? null : (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto Currency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((c) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={c.uuid}>
            <Link key={c.uuid} to={`/crypto/${c.uuid}`}>
              <Card
                title={`${c.rank}. ${c.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={c.iconUrl}
                    alt="crypto icon"
                  />
                }
                hoverable
              >
                <p>Price: {millify(c.price)}</p>
                <p>Market Cap: {millify(c.marketCap)}</p>
                <p>Daily Change: {millify(c.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrecies;
