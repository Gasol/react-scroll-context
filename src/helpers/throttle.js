// https://www.sitepoint.com/throttle-scroll-events/
export default (fn, wait) => {
  let time = Date.now();
  return function throttle() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  };
};
