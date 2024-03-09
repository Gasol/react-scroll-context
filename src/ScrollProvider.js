import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import throttle from './helpers/throttle';

const ScrollProvider = ({
  Context,
  children,
  scrollContainer,
  throttleTime,
}) => {
  if (typeof scrollContainer === 'undefined') {
    return children;
  }

  // `useRef` instead of `useState` to persist scroll state without re-render
  const isScrollingDown = useRef(false);
  const scrollX = useRef(0);
  const scrollY = useRef(0);

  // trigger re-render by setting these
  const [isScrollingDownValue, setIsScrollingDownValue] = useState(false);
  const [scrollXValue, setScrollXValue] = useState(0);
  const [scrollYValue, setScrollYValue] = useState(0);

  // handle scroll
  const onScroll = throttle(() => {
    // `scrollX` for `window`, `scrollLeft` for an element
    const scrollContainerX = typeof scrollContainer.scrollX === 'undefined'
      ? scrollContainer.scrollLeft
      : scrollContainer.scrollX;

    // `scrollY` for `window`, `scrollTop` for an element
    const scrollContainerY = typeof scrollContainer.scrollY === 'undefined'
      ? scrollContainer.scrollTop
      : scrollContainer.scrollY;

    // if scroll has changed
    if (scrollContainerX !== scrollX.current || scrollContainerY !== scrollY.current) {
      isScrollingDown.current = scrollContainerY > scrollY.current;
      scrollX.current = scrollContainerX;
      scrollY.current = scrollContainerY;

      // trigger re-render
      setIsScrollingDownValue(isScrollingDown.current);
      setScrollXValue(scrollX.current);
      setScrollYValue(scrollY.current);
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
    [scrollContainer],
  );

  return (
    <Context.Provider
      value={{
        isScrollingDown: isScrollingDownValue,
        scrollX: scrollXValue,
        scrollY: scrollYValue,
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
  scrollContainer: window,
};

export default ScrollProvider;
