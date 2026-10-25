import React from 'react'
import { Outlet } from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
    <header className="sticky top-0 z-10 bg-card border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/#" className="font-serif font-bold text-xl text-accent">
          RecipeFinder
        </a>
        <a href="/#" className="text-text hover:text-accent font-medium">
          Home
        </a>
      </nav>
    </header>
    </>
  )
};
