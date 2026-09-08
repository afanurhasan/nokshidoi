import Link from "next/link";
import Image from "next/image";

const Footer = () => {

    const MailIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.6654 4.66699L8.67136 8.48499C8.46796 8.60313 8.23692 8.66536 8.0017 8.66536C7.76647 8.66536 7.53544 8.60313 7.33203 8.48499L1.33203 4.66699M2.66536 2.66699H13.332C14.0684 2.66699 14.6654 3.26395 14.6654 4.00033V12.0003C14.6654 12.7367 14.0684 13.3337 13.332 13.3337H2.66536C1.92898 13.3337 1.33203 12.7367 1.33203 12.0003V4.00033C1.33203 3.26395 1.92898 2.66699 2.66536 2.66699Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const PhoneIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.22003 11.045C9.35772 11.1082 9.51283 11.1227 9.65983 11.086C9.80682 11.0493 9.93692 10.9636 10.0287 10.843L10.2654 10.533C10.3896 10.3674 10.5506 10.233 10.7357 10.1404C10.9209 10.0479 11.125 9.99967 11.332 9.99967H13.332C13.6857 9.99967 14.0248 10.1402 14.2748 10.3902C14.5249 10.6402 14.6654 10.9794 14.6654 11.333V13.333C14.6654 13.6866 14.5249 14.0258 14.2748 14.2758C14.0248 14.5259 13.6857 14.6663 13.332 14.6663C10.1494 14.6663 7.09719 13.4021 4.84675 11.1516C2.59631 8.90119 1.33203 5.84894 1.33203 2.66634C1.33203 2.31272 1.47251 1.97358 1.72256 1.72353C1.9726 1.47348 2.31174 1.33301 2.66536 1.33301H4.66536C5.01899 1.33301 5.35812 1.47348 5.60817 1.72353C5.85822 1.97358 5.9987 2.31272 5.9987 2.66634V4.66634C5.9987 4.87333 5.9505 5.07749 5.85793 5.26263C5.76536 5.44777 5.63096 5.60881 5.46536 5.73301L5.15336 5.96701C5.03098 6.06046 4.94471 6.1934 4.90923 6.34324C4.87374 6.49308 4.89122 6.65059 4.9587 6.78901C5.86982 8.63959 7.36831 10.1362 9.22003 11.045Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const MapPinIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.3346 6.66634C13.3346 9.99501 9.64197 13.4617 8.40197 14.5323C8.28645 14.6192 8.14583 14.6662 8.0013 14.6662C7.85677 14.6662 7.71615 14.6192 7.60064 14.5323C6.36064 13.4617 2.66797 9.99501 2.66797 6.66634C2.66797 5.25185 3.22987 3.8953 4.23007 2.89511C5.23026 1.89491 6.58681 1.33301 8.0013 1.33301C9.41579 1.33301 10.7723 1.89491 11.7725 2.89511C12.7727 3.8953 13.3346 5.25185 13.3346 6.66634Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M8.0013 8.66634C9.10587 8.66634 10.0013 7.77091 10.0013 6.66634C10.0013 5.56177 9.10587 4.66634 8.0013 4.66634C6.89673 4.66634 6.0013 5.56177 6.0013 6.66634C6.0013 7.77091 6.89673 8.66634 8.0013 8.66634Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    
    const FacebookIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
    );

    const YoutubeIcon = () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF0000">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
    );

    const linkSections = [
        {
            title: "CATEGORIES",
            links: [
                { text: "Headphones", path: '/shop?category=Headphones', icon: null },
                { text: "Speakers", path: '/shop?category=Speakers', icon: null },
                { text: "Smartwatches", path: '/shop?category=Watch', icon: null },
                { text: "Earbuds", path: '/shop?category=Earbuds', icon: null },
            ]
        },
        {
            title: "QUICK LINKS",
            links: [
                { text: "Home", path: '/', icon: null },
                { text: "All Products", path: '/shop', icon: null },
                { text: "Track My Orders", path: '/orders', icon: null },
                { text: "Shopping Cart", path: '/cart', icon: null },
            ]
        },
        {
            title: "CONTACT & SUPPORT",
            links: [
                { text: "+880 1894-372152", path: 'tel:+8801894372152', icon: PhoneIcon },
                { text: "contact@mustbuy.com", path: 'mailto:contact@mustbuy.com', icon: MailIcon },
                { text: "Dhaka, Bangladesh", path: '/', icon: MapPinIcon }
            ]
        }
    ];

    const socialIcons = [
        { name: "Facebook", icon: FacebookIcon, link: "https://www.facebook.com/share/1DcGHBUbCL/" },
        { name: "YouTube", icon: YoutubeIcon, link: "https://youtube.com/@mustbuybd?si=ONpg9HUpSmZR-c9C" },
    ];

    return (
        <footer className="mx-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-12 border-b border-slate-200 text-slate-500">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <img
                                src="/logo.png"
                                alt="MustBuy Logo"
                                className="h-11 w-auto object-contain rounded-xl shadow-xs group-hover:scale-105 transition"
                            />
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold tracking-tight text-slate-900 leading-none">
                                    Must<span className="text-[#FF8904]">Buy</span>
                                </span>
                                <span className="text-[11px] tracking-wide text-slate-400 font-medium">
                                    Buy The Chosen Ones
                                </span>
                            </div>
                        </Link>
                        <p className="max-w-[380px] text-xs leading-relaxed text-slate-500">
                            Welcome to <strong>MustBuy</strong> — Buy The Chosen Ones. Your premier destination for authentic smart gadgets, premium acoustics, smartwatches, and innovative lifestyle tech.
                        </p>
                        <div className="pt-2">
                            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Connect with us</p>
                            <div className="flex items-center gap-3">
                                {socialIcons.map((item, i) => (
                                    <a
                                        href={item.link}
                                        key={i}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={item.name}
                                        className="flex items-center justify-center w-10 h-10 bg-slate-50 hover:bg-slate-100 hover:scale-110 border border-slate-200 transition rounded-xl shadow-xs"
                                    >
                                        <item.icon />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-6 text-xs">
                        {linkSections.map((section, index) => (
                            <div key={index} className="min-w-[140px]">
                                <h3 className="font-bold text-slate-800 uppercase tracking-wider mb-3 text-[11px]">{section.title}</h3>
                                <ul className="space-y-2">
                                    {section.links.map((link, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            {link.icon && <link.icon />}
                                            <Link href={link.path} className="hover:text-slate-900 transition font-medium">{link.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
                    <p>
                        Copyright {new Date().getFullYear()} &copy; <strong>MustBuy</strong>. All Rights Reserved.
                    </p>
                    <p className="text-[11px]">
                        Hotline: <strong className="text-slate-700">+880 1894-372152</strong>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;