import React, { useState, useEffect } from 'react';
const LuUsers = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <path d="M20 8v6M23 11h-6"></path>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const LuUserPlus = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M20 8v6" />
        <path d="M23 11h-6" />
    </svg>
);

const LuGlobe = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
    </svg>
);

const LuHeart = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);

const Stat = ({ number, text, icon: IconComponent }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    let currentCount = 0;
                    const targetCount = parseInt(target.getAttribute('data-count'), 10);
                    const increment = targetCount / 100;

                    const timer = setInterval(() => {
                        currentCount += increment;
                        if (currentCount >= targetCount) {
                            setCount(targetCount);
                            clearInterval(timer);
                            return;
                        }
                        setCount(Math.ceil(currentCount));
                    }, 10);

                    observer.unobserve(target);
                }
            },
            { threshold: 0.5 }
        );

        const statRef = document.getElementById(text.replace(/\s+/g, '-').toLowerCase());
        if (statRef) {
            observer.observe(statRef);
        }
    }, [text]);

    return (
        <div
            id={text.replace(/\s+/g, '-').toLowerCase()}
            data-count={number}
            className="relative p-6 bg-blue-100 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            <div className="flex items-center justify-center mb-4">
                <IconComponent />
            </div>
            <div className="flex items-center justify-center text-4xl font-bold">
                <span className="text-6xl font-extrabold">{count}</span>
                <span className="text-3xl ml-1">+</span>
            </div>
            <div className="mt-2 text-center text-lg font-medium ">{text}</div>
        </div>
    );
};

const Hero = () => {
    const stats = [
        { number: 1, text: 'Diaspora Professionals', icon: LuUsers },
        { number: 1, text: 'Youth Seeking Guidance', icon: LuUserPlus },
        { number: 1, text: 'Successful Matches', icon: LuHeart },
        { number: 30, text: 'Countries Reached', icon: LuGlobe },
    ];

    return (
        <div className="min-h-screen bg-[url('C:\Users\User\bridge-to-rise\src\assets\image\bg3.png')] font-serif object-cover bg-cover">
            <main className="pt-24 pb-12 ">
                <section className="container mx-auto px-6 py-2 flex flex-col items-center text-center">
                    <div className="w-2/3">
                        <h2 className="text-xl md:text-2xl mt-1 font-semibold">
                            Connecting African Youth with Global Diaspora
                        </h2>
                        <div className=" mx-auto mt-12 text-lg">
                            <p className="mt-6 text-justify tracking-tighter">
                            Bridge2Rise connects African youth with diaspora professionals for mentorship, career guidance, and job readiness, opening access to knowledge, networks, and opportunities that empower the next generation to thrive and drive Africa’s development.
                            </p>
                        </div>
                        
                    </div>
                </section>

                <section className="container mx-auto px-6 py-12 text-center text-black">
                    <h2 className="text-xl md:text-2xl font-semibold mb-10">Our Growing Impact</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <Stat key={index} {...stat} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Hero;
