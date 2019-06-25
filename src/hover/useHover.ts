import * as React from 'react';

const { useState } = React;

export type Element = ((state: boolean) => React.ReactElement<any>) | React.ReactElement<any>;

const noop = () => {};
const useHover = (elemnt: Element): [React.ReactElement<any>, boolean] => {
  const [ state, setState ] = useState(false);
  const onMouseEnter = (originalOnMouseEnter: any) => (event: any) => {
    (originalOnMouseEnter || noop)(event)
    setState(true)
  };
  const onMouseLeave= (originalOnMouseLeave: any) => (event: any) => {
    (originalOnMouseLeave || noop)(event)
    setState(false)
  };

  if(typeof elemnt === 'function') {
    elemnt = elemnt(state)
  }

  const hoverd = React.cloneElement(elemnt, {
    onMouseEnter: onMouseEnter(elemnt.props.onMouseEnter),
    onMouseLeave: onMouseLeave(elemnt.props.onMouseLeave)
  });

  return [hoverd, state];
}

export default useHover;