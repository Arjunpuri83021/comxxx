import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./partials/Navbar";
import Slider from "./partials/Slider"; 
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import PaginationComponent from '../components/partials/PaginationComponent'; // Import the PaginationComponent

const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
    const { page } = useParams(); // Get the page number from the URL
    const currentPage = page ? Number(page) : 1; // Default to page 1 if not present
    const navigate = useNavigate();
    
    // Redirect to root URL if currentPage is 1
    useEffect(() => {
        if (currentPage === 1 && window.location.pathname !== '/') {
            navigate('/');  // Redirect to root URL
        }
    }, [currentPage, navigate]);

    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(""); 
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const itemsPerPage = 16;

    useEffect(() => {
        document.title = `wowuncut spanbank xxxhd pornve 3gp king bf xx Page ${currentPage} on comxxx`;
    
        // Update meta description
        const metaDesc = document.querySelector("meta[name='description']");
        if (metaDesc) {
            metaDesc.setAttribute(
                "content",
                "fry99 hqpornee freeomovie 3gp king adelt movies auntymaza badwap com bf full hd bf hd video bfxxx bigfucktv xxxhd spanbank borwap com pornve wowuncut| comxxx"
            );
        } else {
            const newMeta = document.createElement("meta");
            newMeta.name = "description";
            newMeta.content = "desi 52 com desi 49 com dehati sex dasi sex blueflim boyfriendtv com bollywood sex bf sexy indiangaysite sxyprn bf hindi video bf hindi movie banglaxx | comxxx";
            document.head.appendChild(newMeta);
        }
    
        // Update canonical link dynamically based on current page
        const canonicalLink = document.querySelector("link[rel='canonical']");
        const currentUrl = `https://comxxx.fun/${currentPage === 1 ? '' : currentPage}`;  // Handle root URL (page 1) and others
        if (canonicalLink) {
            canonicalLink.setAttribute("href", currentUrl);
        } else {
            const newCanonical = document.createElement("link");
            newCanonical.rel = "canonical";
            newCanonical.href = currentUrl;
            document.head.appendChild(newCanonical);
        }
    }, [currentPage]);  // Re-run this when the page changes

    // Function to slugify title for URL
    const slugifyTitle = (title) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[\s]+/g, "-") 
            .replace(/[^a-z0-9-]/g, "");
    };

    // Fetch data for the current page
    const fetchData = async (page = 1, category = "", searchQuery = "") => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `${apiUrl}/getpostdata?page=${page}&limit=${itemsPerPage}&category=${category}&search=${searchQuery}`,
                { mode: "cors" }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setPostData(data.records);
            setTotalPages(data.totalPages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect hook to fetch data when page, category, or search query changes
    useEffect(() => {
        fetchData(currentPage, selectedCategory, search);
    }, [currentPage, selectedCategory, search]);

    // Handle page change and update the URL
    const handlePageChange = (event, value) => {
        navigate(`/${value}`);
        window.scrollTo(0, 0); // Change URL to reflect the selected page
    };

    // Shuffle posts (for display purposes, if needed)
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    return (
        <>
            <Helmet>
                <title>wowuncut spanbank xxxhd pornve hqpornee 3gp king bf xx |comxxx</title>
                {/* Dynamically set the canonical link */}
                <link 
                    rel="canonical" 
                    href={`https://comxxx.fun/${currentPage === 1 ? '' : currentPage}`} 
                />
                <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
                <meta 
                    name="description" 
                    content="fry99 hqpornee freeomovie 3gp king adelt movies auntymaza badwap com bf full hd bf hd video bfxxx bigfucktv xxxhd spanbank borwap com pornve wowuncut| comxxx" 
                />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <Sidebar onSearch={(query) => setSearch(query)} />
            <Slider onCategorySelect={(category) => setSelectedCategory(category)} />

            <div style={{ width: "95%", margin: "auto" }}>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {shuffleArray(postData).map((post) => (
                        <div className="col" key={post._id}>
                            <Link
                                to={`/video/${post._id}-${slugifyTitle(post.titel)}`}
                                style={{ textDecoration: "none" }}
                            >
                                <div className="card">
                                    <img
                                        loading="lazy"
                                        style={{ height: "250px" }}
                                        src={post.imageUrl}
                                        className="card-img-top"
                                        alt={post.altKeywords?.trim() || post.titel}
                                    />
                                    <div className="card-body">
                                        <div>
                                            <p>
                                                <i className="bi bi-hand-thumbs-up-fill"></i>{" "}
                                                {Math.min(Math.round((post.views / 200) * 100), 100)}%
                                            </p>
                                            <p>
                                                <i className="bi bi-clock-fill"></i> {post.minutes}
                                            </p>
                                            <p>
                                                <i className="bi bi-eye-fill"></i> {post.views || 2}K+ ..
                                            </p>
                                        </div>
                                        <h2 className="card-title">{post.titel}</h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Reusable Pagination Component */}
                <PaginationComponent
                    count={totalPages}
                    page={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
}

export default Home;
