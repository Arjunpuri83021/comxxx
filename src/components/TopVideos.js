import React, { useEffect, useState } from "react";
import Sidebar from "./partials/Navbar";
import Slider from "./partials/Slider";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const apiUrl = process.env.REACT_APP_API_URL;

function TopVideo() {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const itemsPerPage = 16;

    useEffect(() => {
        document.title = "scout69 porndish hitbdsm pornwild tubsexer pornhits pornhut | comxxx";

        const metaDesc = document.querySelector("meta[name='description']");
        if (metaDesc) {
            metaDesc.setAttribute("content", "pornmz pornwild hitbdsm freesexyindians milf300 sex18 desi49 wwwxxx xvedeo sex sister freeomovie 3gp king aunty sex adelt movies bf full hd bigfucktv | comxxx");
        } else {
            const newMeta = document.createElement("meta");
            newMeta.name = "description";
            newMeta.content = "pornmz pornwild hitbdsm freesexyindians milf300 sex18 desi49 wwwxxx xvedeo sex sister freeomovie 3gp king aunty sex adelt movies bf full hd bigfucktv | comxxx";
            document.head.appendChild(newMeta);
        }

        const canonicalLink = document.querySelector("link[rel='canonical']");
        if (!canonicalLink) {
            const newCanonical = document.createElement("link");
            newCanonical.rel = "canonical";
            newCanonical.href = "https://comxxx.fun/top-videos";
            document.head.appendChild(newCanonical);
        }
    }, []);

    const fetchData = async (page = 1, category = "", searchQuery = "") => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiUrl}/getpopularVideos?page=${page}&limit=${itemsPerPage}&category=${category}&search=${searchQuery}`, { mode: "cors" });
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            setPostData(data.records);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage, selectedCategory, search);
    }, [currentPage, selectedCategory, search]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
    };

    const slugifyTitle = (title) => title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    return (
        <>
            <Helmet>
                <title>scout69 porndish hitbdsm pornwild tubsexer pornhits pornhut | comxxx</title>
                <link rel="canonical" href="https://comxxx.fun/top-videos" />
                <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
                <meta name="description" content="pornmz pornwild hitbdsm freesexyindians milf300 sex18 desi49 wwwxxx xvedeo sex sister freeomovie 3gp king aunty sex adelt movies bf full hd bigfucktv | comxxx" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <Sidebar onSearch={(query) => setSearch(query)} />
            <Slider onCategorySelect={(category) => setSelectedCategory(category)} />
            <div style={{ width: "95%", margin: "auto" }}>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                 <div className="row row-cols-1 row-cols-md-3 g-4">
                                    {postData.map((post, index) => (
                                        <div className="col" key={post._id}>
                                            <Link to={`/video/${post._id}-${slugifyTitle(post.titel)}`} style={{ textDecoration: "none" }}>
                                                <div className="card">
                                                    <img loading="lazy" style={{ height: "250px" }} src={post.imageUrl} className="card-img-top" alt={post.altKeywords?.trim() || post.titel} />
                                                    <div className="card-body">
                                                        <div>
                                                            <p><i className="bi bi-hand-thumbs-up-fill"></i> {Math.min(Math.round((post.views / 200) * 100), 100)}%</p>
                
                                                            <p><i className="bi bi-eye-fill"></i> {post.views || 2}K+..</p>
                                                            <p><i className="bi bi-clock-fill"></i> {post.minutes}</p>
                                                        </div>
                                                        {index === 0 ? <h1 className="card-title">{post.titel}</h1> : <h2 className="card-title">{post.titel}</h2>}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <button className="btn btn-dark" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={{ marginRight: "10px" }}>Previous</button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i + 1} className={`btn btn-dark ${currentPage === i + 1 ? "active" : ""}`} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                    ))}
                    <button className="btn btn-dark" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{ marginLeft: "10px" }}>Next</button>
                </div>
            </div>
        </>
    );
}

export default TopVideo;
