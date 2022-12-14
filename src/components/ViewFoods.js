import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import MemoCard from './MemoCard';
import { GoInfo } from "react-icons/go";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaSlackHash } from "react-icons/fa";
import logo from "../assets/logo.png"
import { AuthContext } from '../context/AuthProvider';

const ViewFoods = () => {

    // এখানে রিফেচ করলে কিনার পর সংখ্যা কমবে
    const foods = useLoaderData();


    const { user } = useContext(AuthContext)

    const url = `http://localhost:5000/booked?email=${user?.email}`;

    const { data: orders = [], refetch } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                // headers: {
                //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                // }
            });
            const data = await res.json();
            return data;
        }

    })



    let price = 0

    const handleBook = item => {
        let subtotal = localStorage.getItem('subtotal')

        if(!subtotal){
            subtotal = 0
        }
        price = price + item.price

        localStorage.setItem('subtotal', price + parseFloat(subtotal))

        console.log(price);
        
        const receipt = {
            customerEmail: user?.email,
            customerName: user?.displayName,
            customerPic: user?.photoURL,
            foodName: item.foodName,
            foodPrice: item.price,
            foodPic: item.foodPic,
            itemsNumber: 1,
            foodId: item._id
        }

        fetch(`http://localhost:5000/booked?id=${item._id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(receipt)
        })  
            .then(res =>res.json())
            .then(item => {
                refetch()
            })
            .catch(err => console.errors(err))

    }

    let remove = 0

    const handleDelete = item => {

        
        let subtotal = localStorage.getItem('subtotal')

        if(!subtotal){
            subtotal = 0
        }
        remove = subtotal - (item.itemsNumber * item.foodPrice)

        localStorage.setItem('subtotal', parseFloat(remove))

        console.log(remove);

        fetch(`http://localhost:5000/delete-food?id=${item._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(deleteItem => {
                refetch()
            })
            .catch(err => console.error(err))
    }


    return (
        <>
            <div className="p-6 mb-10 py-12 bg-[#50577A] text-gray-900">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <h2 className="text-center text-md md:text-6xl tracking-tighter font-bold">Buy
                            <br className="sm:hidden" /> 3 Items &
                            <br className="sm:hidden" /> Get One Burger Free
                        </h2>
                        <div className="space-x-2 text-center flex items-center py-2 lg:py-0">
                            <img src={logo} className='h-10 w-10' alt='' />
                            <span className="font-bold text-lg">Pow Pow</span>
                        </div>
                        <p className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-gray-50 text-gray-900 border-gray-400">Buy Now</p>
                    </div>
                </div>
            </div>
            <div className='md:flex gap-3'>
                <div className="w-full flex-1 md:px-5 lg:px-0 xl:px-10 2xl:px-20 overflow-auto lg:gap-8 grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 xl:gap-10">

                    {
                        foods?.map(food => <div key={food._id} className="relative block overflow-hidden group">
                            <Link to={`/food/${food?._id}`}
                                className="absolute right-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
                            >

                                <GoInfo />

                            </Link>

                            <img
                                src={food?.foodPic}
                                alt=""
                                className="object-cover w-full h-64 transition duration-500 group-hover:scale-105 sm:h-72"
                            />

                            <div className="relative p-6 bg-white border-black border">
                                <div className='justify-between flex'>
                                    <div className='flex items-center'>
                                        <button>
                                            <AiOutlineHeart />
                                        </button>
                                        <p className='text-sm pl-1'>12</p>
                                    </div>
                                    <div className='flex items-center'>
                                        <button>
                                            <FaSlackHash />
                                        </button>
                                        <p className='text-sm pl-1'>{food?.quantity}</p>
                                    </div>
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">{food?.foodName}</h3>

                                <p className="mt-1.5 text-red-700 text-right">${food?.price}</p>

                                <div className="mt-4">
                                    <button
                                        onClick={() => handleBook(food)}
                                        className="block w-full p-4 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>)
                    }

                </div>
                <MemoCard handleDelete={handleDelete} orders={orders}></MemoCard>
            </div>
        </>
    );
};

export default ViewFoods;