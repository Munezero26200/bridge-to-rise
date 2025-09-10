import React, { useState, useEffect } from 'react';
const Footer = () => {
    return (
        <div>
            <footer className="bg-blue-600 py-8">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-4 md:space-y-0">
                    <div className="left-footer">
                        <h3 className="text-xl font-bold">BRIDGE2RISE</h3>
                        <p className="mt-2 text-sm">
                            Connecting African youth with global diaspora professionals for a brighter future.
                        </p>
                        <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
                    </div>
                    <div className="right-footer">
                        <h3 className="text-lg font-bold text-black-800 mb-2">Resources</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline">Mentorship</a></li>
                            <li><a href="#" className="hover:underline">Career Resources</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Footer;