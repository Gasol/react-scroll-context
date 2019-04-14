# `@foo-software/react-scroll-context`

> **React Scroll Context** exports a [React context](https://reactjs.org/docs/context.html) provider and consumer. It provides `window` scroll data to a consumer. 

## Props

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>PropType</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><code>children</code></td>
    <td>Anything that can be rendered, but typically a tree of elements. Scroll data can be consumed from anywhere in this tree.</td>
    <td><code>node</code></td>
    <td><code>true</code></td>
    <td><code>--</code></td>
  </tr>
  <tr>
    <td><code>throttleTime</code></td>
    <td>Time in milleseconds to throttle calculations of scroll.</td>
    <td><code>number</code></td>
    <td><code>false</code></td>
    <td><code>200</code></td>
  </tr>
</table>

## Exposed Context Consumer Data

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>scrollX</code></td>
    <td>The current value of `window.scrollX`</td>
  </tr>
  <tr>
    <td><code>scrollY</code></td>
    <td>The current value of `window.scrollY`</td>
  </tr>
</table>

## Usage

> Standard

```jsx
import react from 'react';
import { ScrollProvider, ScrollContext } from '@foo-software/react-scroll-context`;

const ScrollDisplay = () => (
  <ScrollProvider>
    <div>
      <h1>Scroll it!</h1>
      <ScrollContext.Consumer>
        {({ scrollX, scrollY, isScrollingDown }) => (
          <pre>
            scrollX: {scrollX}
            scrollY: {scrollX}
            isScrollingDown: {scrollY}
          </pre>
        )}
      </ScrollContext.Consumer>
    </div>
  </ScrollProvider>
);
```

> Class

```jsx
import react, { Component } from 'react';
import { ScrollProvider, ScrollContext } from '@foo-software/react-scroll-context`;

class ScrollDisplay extends Component {
  static contextType = ScrollContext;
  render() {
    const { scrollX, scrollY, isScrollingDown } = this.context;
    return (
      <pre>
        scrollX: {scrollX}
        scrollY: {scrollX}
        isScrollingDown: {scrollY}
      </pre>
    );
  }
}

const App = () => (
  <ScrollProvider>
    <div>
      <h1>Scroll it!</h1>
      <ScrollDisplay />
    </div>
  </ScrollProvider>
);
```

> [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) hook

```jsx
import react, { useContext } from 'react';
import { ScrollProvider, ScrollContext } from '@foo-software/react-scroll-context`;

const ScrollDisplay = () => {
  const { scrollX, scrollY, isScrollingDown } = useContext(ScrollContext);
  return (
    <pre>
      scrollX: {scrollX}
      scrollY: {scrollX}
      isScrollingDown: {scrollY}
    </pre>
  );
};

const App = () => (
  <ScrollProvider>
    <div>
      <h1>Scroll it!</h1>
      <ScrollDisplay />
    </div>
  </ScrollProvider>
);
```

## Credits

> <img src="https://s3.amazonaws.com/foo.software/images/logo-200x200.png" width="100" height="100" style="float: left" /> <p>Ipsum lorem ipsum lorem. Ipsum lorem ipsum lorem. Ipsum lorem ipsum lorem. Ipsum lorem ipsum lorem. Ipsum lorem ipsum lorem.</p>
