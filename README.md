# `@foo-software/react-scroll-context`

> **React Scroll Context** exports a [React context](https://reactjs.org/docs/context.html) provider and consumer. It provides `window` scroll data to a consumer.

## Install

> npm

```
npm install @foo-software/react-scroll-context
```

> yarn

```
yarn add @foo-software/react-scroll-context
```

## Dependencies

- `react@16.8`

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
    <td><code>Context</code></td>
    <td>A <code>Context</code> object created by <code>React.createContext()</code></td>
    <td><code>object</code></td>
    <td><code>true</code></td>
    <td><code>--</code></td>
  </tr>
  <tr>
    <td><code>children</code></td>
    <td>Anything that can be rendered, but typically a tree of elements. Scroll data can be consumed from anywhere in this tree.</td>
    <td><code>node</code></td>
    <td><code>true</code></td>
    <td><code>--</code></td>
  </tr>
  <tr>
    <td><code>scrollContainer</code></td>
    <td>A scroll container. This will be <code>window</code> by default, but you could use an element instead with this option.</td>
    <td><code>oneOf[PropTypes.object, PropTypes.node]</code></td>
    <td><code>false</code></td>
    <td><code>window</code></td>
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
    <th>Type</th>
  </tr>
  <tr>
    <td><code>scrollX</code></td>
    <td>The current value of <code>window.scrollX</code>.</td>
    <td><code>number</code></td>
  </tr>
  <tr>
    <td><code>scrollY</code></td>
    <td>The current value of <code>window.scrollY</code>.</td>
    <td><code>number</code></td>
  </tr>
  <tr>
    <td><code>isScrollingDown</code></td>
    <td>Identifies whether or not scroll direction is down.</td>
    <td><code>boolean</code></td>
  </tr>
</table>

## Usage

> Standard

```jsx
import React from 'react';
import { ScrollProvider } from '@foo-software/react-scroll-context';

// replace `scroll-context` any name you like.
const Context = React.createContext('scroll-context');

const ScrollDisplay = () => (
  <ScrollProvider
    Context={Context}
  >
    <div>
      <h1>Scroll it!</h1>
      <Context.Consumer>
        {({ scrollX, scrollY, isScrollingDown }) => (
          <pre>
            scrollX: {scrollX}
            scrollY: {scrollY}
            isScrollingDown: {isScrollingDown ? 'yes' : 'no'}
          </pre>
        )}
      </Context.Consumer>
    </div>
  </ScrollProvider>
);
```

> Class

```jsx
import React, { Component } from 'react';
import { ScrollProvider } from '@foo-software/react-scroll-context';

// replace `scroll-context` any name you like.
const Context = React.createContext('scroll-context');

class ScrollDisplay extends Component {
  static contextType = Context;

  render() {
    const { scrollX, scrollY, isScrollingDown } = this.context;
    return (
      <pre>
        scrollX: {scrollX}
        scrollY: {scrollY}
        isScrollingDown: {isScrollingDown ? 'yes' : 'no'}
      </pre>
    );
  }
}

const App = () => (
  <ScrollProvider
    Context={Context}
  >
    <div>
      <h1>Scroll it!</h1>
      <ScrollDisplay />
    </div>
  </ScrollProvider>
);
```

> [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) hook

```jsx
import React, { useContext } from 'react';
import { ScrollProvider } from '@foo-software/react-scroll-context';

// replace `scroll-context` any name you like.
const Context = React.createContext('scroll-context');

const ScrollDisplay = () => {
  const { scrollX, scrollY, isScrollingDown } = useContext(Context);
  return (
    <pre>
      scrollX: {scrollX}
      scrollY: {scrollY}
      isScrollingDown: {isScrollingDown ? 'yes' : 'no'}
    </pre>
  );
};

const App = () => (
  <ScrollProvider
    Context={Context}
  >
    <div>
      <h1>Scroll it!</h1>
      <ScrollDisplay />
    </div>
  </ScrollProvider>
);
```

## Credits

> <img src="https://s3.amazonaws.com/foo.software/images/logo-200x200.png" width="100" height="100" align="left" /> This package was brought to you by [Foo - a website performance monitoring tool](https://www.foo.software). Create a **free account** with standard performance testing. Automatic website performance testing, uptime checks, charts showing performance metrics by day, month, and year. Foo also provides real time notifications when performance and uptime notifications when changes are detected. Users can integrate email, Slack and PagerDuty notifications.
