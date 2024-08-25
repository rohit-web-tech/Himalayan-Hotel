import React from "react";

import "./style.scss";

const ContentWrapper = ({ children,className }) => {
    return <div className={`contentWrapper ${className}`}>{children}</div>;
};

export default ContentWrapper;