import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="sneaker-block"
    speed={2}
    width={280}
    height={493}
    viewBox="0 0 280 493"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="136" r="136" />
    <rect x="0" y="284" rx="15" ry="15" width="280" height="27" />
    <rect x="0" y="332" rx="10" ry="10" width="280" height="80" />
    <rect x="181" y="382" rx="0" ry="0" width="0" height="8" />
    <rect x="9" y="435" rx="5" ry="5" width="94" height="27" />
    <rect x="123" y="431" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
