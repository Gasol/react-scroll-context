import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import throttle from './helpers/throttle';

const ScrollProvider = ({
  Context,
  children,
  scrollContainer,
  throttleTime
}) => {
  if (typeof scrollContainer === 'undefined') {
    return children;
  }

  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // handle scroll
  const onScroll = throttle(() => {
    // `scrollX` for `window`, `scrollLeft` for an element
    const scrollContainerX = scrollContainer.scrollX || scrollContainer.scrollLeft;

    // `scrollY` for `window`, `scrollTop` for an element
    const scrollContainerY = scrollContainer.scrollX || scrollContainer.scrollTop;

    // if scroll has changed
    if (scrollContainerX !== scrollX || scrollContainerY !== scrollY) {
      setIsScrollingDown(scrollContainerY > scrollY);
      setScrollX(scrollContainerX);
      setScrollY(scrollContainerY);
    }
  }, throttleTime);

  // by passing an empty array as the second argument for `useEffect` we are
  // imitating `componentDidMount` lifecycle method.
  useEffect(
    () => {
      scrollContainer.addEventListener('scroll', onScroll, false);
      return () => {
        scrollContainer.removeEventListener('scroll', onScroll, false);
      };
    },
    [],
  );

  return (
    <Context.Provider
      value={{
        isScrollingDown,
        scrollX,
        scrollY,
      }}
    >
      {children}
    </Context.Provider>
  );
};

ScrollProvider.propTypes = {
  Context: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  scrollContainer: PropTypes.oneOf([PropTypes.node, PropTypes.object]),
  throttleTime: PropTypes.number,
};

ScrollProvider.defaultProps = {
  throttleTime: 200,
  scrollContainer: scrollContainer,
};

export default ScrollProvider;
