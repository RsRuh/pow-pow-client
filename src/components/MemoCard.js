import React from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import shawarma from '../assets/shawarma.png'

const MemoCard = ({ orders, handleDelete }) => {



    return (
        <div className='md:w-80 lg:w-80'>
            {/* <div className='lg:sticky lg:top-10'>
                <div className='flex gap-5 mb-5'>
                    <div className="flex items-center gap-5">
                        <img src="https://img.freepik.com/free-photo/flying-sweet-donuts-with-sprinkels-grey_573717-45.jpg?w=826&t=st=1670212257~exp=1670212857~hmac=abe3442a580e0337dce859f82d90996176573ed66c599ca98981ac3aafa6aed0" alt="" className="object-cover object-center w-20 h-20 rounded-full bg-gray-500" />
                        <div>
                            <h2 className="font-semibold">Leroy Jenkins</h2>
                            <span className="text-sm">2 x $14.00</span>
                        </div>
                    </div>
                    <CiCircleRemove className='text-2xl' />
                </div>
                <div className='flex gap-5 mb-5'>
                    <div className="flex items-center gap-5">
                        <img src="https://img.freepik.com/free-photo/flying-sweet-donuts-with-sprinkels-grey_573717-45.jpg?w=826&t=st=1670212257~exp=1670212857~hmac=abe3442a580e0337dce859f82d90996176573ed66c599ca98981ac3aafa6aed0" alt="" className="object-cover object-center w-20 h-20 rounded-full bg-gray-500" />
                        <div>
                            <h2 className="font-semibold">Leroy Jenkins</h2>
                            <span className="text-sm">2 x $14.00</span>
                        </div>
                    </div>
                    <CiCircleRemove className='text-2xl' />
                </div>
                <div className="divider"></div>
                <div className='flex gap-5'>
                    <Link to='/view-cart'
                        className="rounded-full p-[2px] bg-violet-400"
                        href="/download"
                    >
                        <span
                            className="block rounded-full bg-white px-8 py-3 text-sm font-medium hover:bg-transparent"
                        >
                            View Cart
                        </span>
                    </Link>
                    <Link
                        className="rounded-full p-[2px] bg-violet-400"
                        href="/download"
                    >
                        <span
                            className="block rounded-full bg-white px-8 py-3 text-sm font-medium hover:bg-transparent"
                        >
                            CheckOut
                        </span>
                    </Link>
                   
                </div>
            </div> */}


            <div
                className="relative block w-full lg:sticky lg:top-10 px-3 py-8 bg-gray-100 shadow">

                {orders.length ?
                    <div className="mt-6 space-y-6">
                        <ul className="space-y-4">
                            {
                                orders?.map(order => <li key={order?._id} className="flex items-center">
                                    <img
                                        src={order.foodPic}
                                        alt=""
                                        className="object-cover w-16 h-16 rounded"
                                    />

                                    <div className="ml-4">
                                        <h3 className="text-sm text-gray-900">{order.foodName}</h3>

                                        <div>
                                            <p className="inline text-sm">Price: </p>
                                            <p className="inline text-sm">${order.foodPrice}</p>
                                            <p className="inline text-xs px-1">X</p>
                                            <p className="inline text-sm">{order.itemsNumber}</p>
                                        </div>

                                    </div>

                                    <div className="flex items-center justify-end flex-1 gap-2">
                                        <button onClick={()=>handleDelete(order)} className="text-gray-600 transition hover:text-red-600">
                                            
                                            <span className="sr-only">Remove item</span>

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </li>)
                            }

                        </ul>

                        <div className="space-y-4 text-center">
                            <Link
                                to="/view-cart"
                                className="block px-5 py-3 text-sm text-gray-600 transition border border-gray-600 rounded hover:ring-1 hover:ring-gray-400"
                            >
                                View my cart ({orders.length})
                            </Link>
                            <Link
                                to="#"
                                className="block px-5 py-3 text-sm text-gray-100 transition bg-gray-700 rounded hover:bg-gray-600"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="flex flex-col justify-center">
                            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">Todays Best Deal</h1>
                            <p className="text-base lg:text-xl text-gray-800">
                                Buy one <span className="font-bold">Get one</span>
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <img src={shawarma} alt="" className="md:w-20 md:h-20 lg:w-full lg:h-full" />
                        </div>
                    </div>
                }
            </div>

        </div>
    );
};

export default MemoCard;