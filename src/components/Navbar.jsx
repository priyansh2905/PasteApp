import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex flex-row justify-center items-center gap-8 py-4 bg-stone-950 rounded-xl'>
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          isActive ? 'text-green-400 font-bold' : 'text-white font-semibold'
        }
      >
        Home
      </NavLink>

      <NavLink 
        to="/pastes" 
        className={({ isActive }) => 
          isActive ? 'text-green-400 font-bold' : 'text-white font-semibold'
        }
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
