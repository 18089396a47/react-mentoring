import React from 'react';
import PropTypes from 'prop-types';
import './infoPanelStyles';

const InfoPanel = ({ children }) => (
    <div className="info-panel">
        {children}
    </div>
);

InfoPanel.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default InfoPanel;
