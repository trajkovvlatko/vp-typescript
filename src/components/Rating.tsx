import React from 'react';

interface Props {
  stars: number;
}

function Rating(props: Props) {
  return (
    <div>
      {[...Array(props.stars)].map((e, i) => <span key={`star-${i}`} className="star">★</span>)}
    </div>
  );
}

export default Rating;
