import React, { useState } from 'react';
import '../../css/video-reviews.css';

const videoData = [
     {
        id: 'TOhkdVsTcog',
        name: 'Mr. Harikishore.',
        service: 'TNPSC Group II ',
        caption: 'How Kingmakers helped me crack TNPSC in the first attempt with targeted study plans.',
        rank: 'TNPSC Group II  – 2023',
    },
    {
        id: 'xax-AAGW2xQ',
        name: 'Ms. Saranya Saravanan',
        service: 'IAS Officer',
        caption: 'My journey from a small town aspirant to an IAS officer — how Kingmakers changed everything.',
        rank: 'AIR 48 – UPSC 2025',
    },
   
    {
        id: 'gGq6MjsmH7c',
        name: 'Prakash R.',
        service: 'IPS Officer',
        caption: 'The importance of mentorship in UPSC preparation — my experience with Mr. Elango.',
        rank: 'AIR 112 – UPSC 2021',
    },
    {
        id: 'htaRMCZjFjU',
        name: 'Divya S.',
        service: 'IRS Officer',
        caption: 'Writing practice at Kingmakers helped me score over 130 in GS Papers. Highly recommended!',
        rank: 'IRS – UPSC 2022',
    },
    {
        id: 'BPdevkbOdZs',
        name: 'Ms. Sindhu N Raghavan.',
        service: 'IRS Officer',
        caption: 'Writing practice at Kingmakers helped me score over 130 in GS Papers. Highly recommended!',
        rank: 'AIR 336 - UPSC 2023',
    },
    // {
    //     id: 'Fh06cITwHI0',
    //     name: 'Divya S.',
    //     service: 'IRS Officer',
    //     caption: 'Writing practice at Kingmakers helped me score over 130 in GS Papers. Highly recommended!',
    //     rank: 'IRS – UPSC 2022',
    // },
    // {
    //     id: '7HQzfWC_sOI',
    //     name: 'Divya S.',
    //     service: 'IRS Officer',
    //     caption: 'Writing practice at Kingmakers helped me score over 130 in GS Papers. Highly recommended!',
    //     rank: 'IRS – UPSC 2022',
    // },
    // {
    //     id: '2aWj9WmIu-8',
    //     name: 'Divya S.',
    //     service: 'IRS Officer',
    //     caption: 'Writing practice at Kingmakers helped me score over 130 in GS Papers. Highly recommended!',
    //     rank: 'IRS – UPSC 2022',
    // },
];

const RAIL_LIMIT = 7;

const VideoReviews = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const active = videoData[activeIdx];

    const visibleVideos = videoData.slice(0, RAIL_LIMIT);
    const extraVideos = videoData.slice(RAIL_LIMIT);
    const hasExtra = extraVideos.length > 0;

    const renderThumb = (v, i) => (
        <button
            key={v.id}
            className={`vr-thumb ${i === activeIdx ? 'vr-thumb--active' : ''}`}
            onClick={() => setActiveIdx(i)}
        >
            <div className="vr-thumb-img">
                
                <img
                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                    alt={v.name}
                    loading="lazy"
                />
                {i !== activeIdx && (
                    <div className="vr-play-overlay">
                        <span className="vr-play-btn">▶</span>
                    </div>
                )}
                {i === activeIdx && (
                    <div className="vr-playing-overlay">
                        <span>▶ Now Playing</span>
                    </div>
                )}
            </div>
            <div className="vr-thumb-info">
                <strong>{v.name}</strong>
                <span>{v.rank}</span>
            </div>
        </button>
    );

    return (
        <section className="vr-section" id="video-reviews">
            <div className="container">

                {/* Header */}
                <div className="vr-header">
                    {/* <span className="vr-badge">STUDENT STORIES</span> */}
                    <h2>Student Testimonials</h2>
                    {/* <p>
                        Watch what our successful officers have to say
                        about their preparation journey at Kingmakers IAS Academy.
                    </p> */}
                </div>

                {/* Main layout */}
                <div className="vr-layout">

                    {/* Featured player */}
                    <div className="vr-featured">
                        <div className="vr-player-wrap">
                            <iframe
                                key={active.id}
                                src={`https://www.youtube.com/embed/${active.id}?rel=0&modestbranding=1`}
                                title={`Review by ${active.name}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="vr-iframe"
                            />
                        </div>

                        {/* Active video info */}
                        {/* <div className="vr-featured-info">
                            <div className="vr-featured-meta">
                                <span className="vr-featured-rank">{active.rank}</span>
                                <span className="vr-featured-service">{active.service}</span>
                            </div>
                            <h3>{active.name}</h3>
                            <p>{active.caption}</p>
                        </div> */}
                    </div>

                    {/* Thumbnail rail */}
                    <div className="vr-rail">
                        <p className="vr-rail-label">
                            More Stories
                            <span className="vr-rail-count">{videoData.length}</span>
                        </p>

                        {/* First 7 always visible */}
                        {visibleVideos.map((v, i) => renderThumb(v, i))}

                        {/* Collapsible extra items */}
                        {hasExtra && (
                            <>
                                <div className={`vr-extra ${showMore ? 'vr-extra--open' : ''}`}>
                                    {extraVideos.map((v, i) =>
                                        renderThumb(v, RAIL_LIMIT + i)
                                    )}
                                </div>

                                <button
                                    className="vr-show-more"
                                    onClick={() => setShowMore(s => !s)}
                                >
                                    {showMore
                                        ? '▲ Show less'
                                        : `▼ Show ${extraVideos.length} more`}
                                </button>
                            </>
                        )}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default VideoReviews;
