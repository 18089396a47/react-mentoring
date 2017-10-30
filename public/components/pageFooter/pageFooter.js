import React from 'react';
import { Link } from 'react-router-dom';
import './pageFooterStyles.styl';

export default () => (
    <footer className="page-footer">
        <Link to="/" className="page-footer__link">netflixroulette</Link>
    </footer>
)
