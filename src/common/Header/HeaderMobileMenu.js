import Link from 'next/link';
import React from 'react';

const HeaderMobileMenu = () => {
    return (
        <div className="container">
            <h3 className="mobile-menu__logo">Watch_Shop</h3>
            <ul>
                <li><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/allProduct"><a>Product</a></Link></li>
                <li><Link href="/contact"><a>Contact</a></Link></li>
            </ul>
        </div>
    );
};

export default HeaderMobileMenu;