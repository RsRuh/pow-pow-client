import React from 'react';
import '../styles/Cart.css'
import { Link } from 'react-router-dom';
import burger from '../assets/burger.png'
import pizza from '../assets/pizza.png'
import friedChicken from '../assets/friedChicken.png'
import shawarma from '../assets/shawarma.png'
import noodles from '../assets/noodles.png'
import donut from '../assets/donut.png'
import iceCream from '../assets/ice-cream.png'
import drinks from '../assets/drinks.png'


const Categories = () => {

    const categories = [
        { name: "Burger", link: "burger", img: burger },
        { name: "Pizza", link: "pizza", img: pizza },
        { name: "Fried Chicken", link: "fried-chicken", img: friedChicken },
        { name: "Shawarma", link: "shawarma", img: shawarma },
        { name: "Noodles", link: "noodles", img: noodles },
        { name: "Donut", link: "donut", img: donut },
        { name: "Ice Cream", link: "ice-cream", img: iceCream },
        { name: "Drinks", link: "drinks", img: drinks },

    ];

    return (
        <>
            <h1 className='text-5xl text-center mb-10'>Our Categories</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
                {
                    categories?.map((category, i) => <div key={i} className="container flex justify-center ">
                        <div className="card">
                            <div className="imgBx">
                                <img src={category?.img} alt='' />
                            </div>
                            <div className="contentBx">
                                <h2>{category?.name}</h2>

                                <Link to={`/foods/${category.link}`}>Buy Now</Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </>
    );
};

export default Categories;