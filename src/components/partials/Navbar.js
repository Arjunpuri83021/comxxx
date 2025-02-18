import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(window.innerWidth > 768);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            const isNowMobile = window.innerWidth <= 768;
            setIsMobile(isNowMobile);
            setIsSearchOpen(!isNowMobile); // Always show on desktop
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const toggleSearchBar = () => {
        if (isMobile) {
            setIsSearchOpen((prev) => !prev);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    const menuItems = [
        { name: "Home", icon: "🏠", path: "/" },
        { name: "Models", icon: "👩‍🦰", path: "/Pornstars" },
        { name: "Indians", icon: "👧🏼", path: "/indian" },
        { name: "Muslim", icon: "👩‍🦳🎀", path: "/muslim" },
        { name: "Top Videos", icon: "🎬🔥", path: "/top-videos" },
        { name: "New Content", icon: "🆕📹", path: "/new-content" },
        { name: "Most Liked", icon: "❤️👍", path: "/most-liked" },
    ];

    return (
        <div className="navbar-container">
            {/* Top Navbar */}
            <div className="top-navbar">
                <div className="left-section">
                    <button className="toggle-button" onClick={toggleSidebar}>
                        {isOpen ? "✖" : "☰"}
                    </button>
                    <Link to="/" className="logo-link">
                        <h2 className="logo">ComXxx</h2>
                    </Link>
                </div>
                <div className="right-section">
                    {isMobile && (
                        <span className="icon search-icon" onClick={toggleSearchBar}>🔍</span>
                    )}
                    
                    <input
                        type="text"
                        className={`search-bar ${isSearchOpen ? "visible" : ""}`}
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    
                    <span className="icon profile-icon">👤</span>
                </div>
            </div>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                {isOpen && <button className="close-button" onClick={toggleSidebar}>✖</button>}
                <ul className="menu">
                    {menuItems.map((item, index) => (
                        <li key={index} className="menu-item">
                            <Link to={item.path} className="menu-link" onClick={toggleSidebar}>
                                <span className="icon">{item.icon}</span>
                                <span className="text">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
