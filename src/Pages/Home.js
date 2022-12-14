import React from 'react';
import Blog from '../components/Blog';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import Reviews from '../components/Reviews';
import OurShafe from '../components/OurShafe';

const Home = () => {
    return (

        <div>
            <Carousel></Carousel>
            <Blog></Blog>
            <Categories></Categories>
            <Reviews></Reviews>
            <OurShafe></OurShafe>
        </div>

    );
};

export default Home;