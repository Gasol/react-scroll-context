import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ScrollContext from './ScrollContext';
import throttle from './helpers/throttle';

const ScrollProvider = ({ children, throttleTime }) => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // handle scroll
  const onScroll = throttle(() => {
    // if scroll has changed
    if (window.scrollX !== scrollX || window.scrollY !== scrollY) {
      setIsScrollingDown(window.scrollY > scrollY);
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    }
  }, throttleTime);

  // by passing an empty array as the second argument for `useEffect` we are
  // imitating `componentDidMount` lifecycle method.
  useEffect(
    () => {
      window.addEventListener('scroll', onScroll, false);
      return () => {
        window.removeEventListener('scroll', onScroll, false);
      };
    },
    [],
  );

  return (
    <ScrollContext.Provider
      value={{
        isScrollingDown,
        scrollX,
        scrollY,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

ScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
  throttleTime: PropTypes.number,
};

ScrollProvider.defaultProps = {
  throttleTime: 200,
};

export default ScrollProvider;
