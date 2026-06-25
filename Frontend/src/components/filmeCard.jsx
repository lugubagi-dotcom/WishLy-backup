'use client';
import React from 'react';

export default function FilmCard({ film = {}, onClick }) {
  const {
    title = 'Título desconhecido',
    year = '',
    description = '',
    poster = '/placeholder.png'
  } = film;

  const shortDesc = description.length > 140 ? description.slice(0, 137) + '...' : description;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: 260,
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
    background: '#fff',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'transform .18s ease, box-shadow .18s ease'
  };

  const imgStyle = {
    width: '100%',
    height: 360,
    objectFit: 'cover',
    background: '#eee',
    display: 'block'
  };

  const bodyStyle = {
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  };

  const titleStyle = {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    color: '#111'
  };

  const metaStyle = {
    fontSize: 12,
    color: '#666'
  };

  const descStyle = {
    margin: 0,
    fontSize: 13,
    color: '#333',
    lineHeight: 1.3
  };

  return (
    <article
      className="film-card"
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-6px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <img src={poster || '/placeholder.png'} alt={title} style={imgStyle} />
      <div style={bodyStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <h3 style={titleStyle}>{title}</h3>
          {year ? <small style={metaStyle}>{year}</small> : null}
        </div>
        {shortDesc ? <p style={descStyle}>{shortDesc}</p> : null}
      </div>
    </article>
  );
}