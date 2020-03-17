import { useRef, useCallback } from "react";

interface Options {
  isPreventDefault?: boolean,
  delay?: number,
}

const isTouchEvent = (event: Event): event is TouchEvent => {
  return "touches" in event;
};

const preventDefault = (event: Event) => {
  if(!isTouchEvent(event)) return;

  if(event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

const useLongPress = (
  callback: (e: TouchEvent | MouseEvent) => void,
  { isPreventDefault = true, delay = 300 } : Options = {}
) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const target = useRef<EventTarget>();

  const start = useCallback(
    (event: TouchEvent | MouseEvent) => {
      // 阻止移动设备默认事件
      if(isPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, { passive: false })
        target.current = event.target;
      }
      timeout.current = setTimeout(() => callback(event), delay);
    },
    [callback, delay]
  );

  const clear = useCallback(
    () => {
      timeout.current && clearTimeout(timeout.current);

      if(isPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [],
  );

  return {
    onMouseDown: (e: any) => start(e),
    onTouchStart: (e: any) => start(e),
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear
  } as const;
};

export default useLongPress;