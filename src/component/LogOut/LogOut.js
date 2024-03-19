"use client"
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import React from 'react';

const LogOut = () => {
    return (
        <div>
            <button className='btn btn-sm bg-white hover:text-[#080403] text-black font-bold' onClick={()=> signOut(auth)}>
                LogOut
            </button>
        </div>
    );
};

export default LogOut;