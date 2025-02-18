import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useParams
import { Helmet } from "react-helmet";
import Sidebar from "../partials/Navbar";
import Slider from "../partials/Slider";
import PaginationComponent from '../partials/PaginationComponent';

const apiUrl = process.env.REACT_APP_API_URL;

function Sister() {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("sis");
    const itemsPerPage = 16;

    const { page } = useParams(); // Get the current page number from the URL
    const currentPage = parseInt(page) || 1; // Default to page 1 if the page is not defined

    const navigate = useNavigate();


    useEffect(() => {
            if (currentPage === 1 && window.location.pathname !== '/category/sex-sister') {
                navigate('/category/sex-sister');  // Redirect to root URL
            }
        }, [currentPage, navigate]);

    useEffect(() => {
        document.title = `Sister Sex Videos page ${currentPage} on comxxx`;
        const metaDescContent = "Explore a collection of premium Sister sex videos. Enjoy handpicked, high-quality content filtered for your preferences.";

        const metaDesc = document.querySelector("meta[name='description']");
        if (metaDesc) {
            metaDesc.setAttribute("content", metaDescContent);
        } else {
            const newMeta = document.createElement("meta");
            newMeta.name = "description";
            newMeta.content = metaDescContent;
            document.head.appendChild(newMeta);
        }

        // Dynamically set the canonical link
        const canonicalUrl = `https://comxxx.fun/category/sex-sister/${currentPage === 1 ? '' : currentPage}`;
        const canonicalLink = document.querySelector("link[rel='canonical']");
        if (canonicalLink) {
            canonicalLink.setAttribute("href", canonicalUrl);
        } else {
            const newCanonical = document.createElement("link");
            newCanonical.rel = "canonical";
            newCanonical.href = canonicalUrl;
            document.head.appendChild(newCanonical);
        }
    }, [currentPage]); // Run when currentPage changes

    const fetchData = async (page = 1, searchQuery = "sis") => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiUrl}/getpostdata?page=${page}&limit=${itemsPerPage}&search=${searchQuery}`, { mode: "cors" });
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            setPostData(data.records);
            setTotalPages(data.totalPages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage, search);
    }, [currentPage, search]);

    const handlePageChange = (event, value) => {
        navigate(`/category/sex-sister/${value}`); // Update URL with new page
        window.scrollTo(0, 0); // Scroll to top after page change
    };

    const handleSearch = (query) => {
        setSearch(query || "sis");
        navigate(`/category/sex-sister/1`); // Reset to page 1 on search
    };

    const slugifyTitle = (title) => title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    return (
        <>
            <Helmet>
                <title>Sister Sex Videos on comxxx</title>
                <link rel="canonical" href={`https://comxxx.fun/category/sex-sister/${currentPage === 1 ? '' : currentPage}`} /> {/* Dynamic canonical URL */}
                <meta name="description" content="Explore a collection of premium Sister sex videos. Enjoy handpicked, high-quality content filtered for your preferences." />
            </Helmet>
            <Sidebar onSearch={handleSearch} />
            <Slider />
            <div style={{ width: "95%", margin: "auto" }}>
                <h1>Sister - Sister Sex Videos</h1>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="row row-cols-2 row-cols-md-3 g-4">
                    {postData.map((post) => (
                        <div className="col" key={post._id}>
                            <Link style={{ textDecoration: "none" }} to={`/video/${post._id}-${slugifyTitle(post.titel)}`}>
                                <div className="card">
                                    <img style={{ height: "250px" }} src={post.imageUrl} className="card-img-top card-img" alt={post.altKeywords?.trim() || post.titel} />
                                    <div className="card-body">
                                        <div>
                                            <p><i className="bi bi-hand-thumbs-up-fill"></i> {Math.min(Math.round((post.views / 200) * 100), 100)}%</p>
                                            <p><i className="bi bi-eye-fill"></i> {post.views || 2}K+..</p>
                                            <p><i className="bi bi-clock-fill"></i> {post.minutes}</p>
                                        </div>
                                        <h2 className="card-title" style={{ fontSize: "13px" }}>{post.titel.length > 40 ? `${post.titel.substring(0, 40)}...` : post.titel}</h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <PaginationComponent
                    count={totalPages}
                    page={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
}

export default Sister;
