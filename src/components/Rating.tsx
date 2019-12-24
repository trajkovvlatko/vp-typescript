import React from 'react';

interface Props {
  stars: number;
}

function Rating(props: Props) {
  return (
    <div>
      {[...Array(props.stars)].map((e, i) => <span className="star">★</span>)}
    </div>
  );
}

export default Rating;
