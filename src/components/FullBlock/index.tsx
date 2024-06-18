import type { HTMLAttributes } from 'react';
import React, { useEffect, useRef, useState } from 'react';

function getHeight(el: HTMLDivElement): number {
  const rect = el.getBoundingClientRect();
  return window.innerHeight - rect.top - 40;
}

/**
 * 填充页面剩余空间的 卡片
 */
export default function FullBlock({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    init();
    window.addEventListener('resize', init);

    return () => window.removeEventListener('resize', init);
  }, []);

  function init() {
    if (el.current) {
      const height = getHeight(el.current);

      el.current.style.height = `${height}px`;
    }
  }

  return (
    <div {...props} ref={el}>
      {children}
    </div>
  );
}

export function useHeight(selector: string) {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const el = document.querySelector(selector);
    setTimeout(() => {
      if (el?.clientHeight) {
        setHeight(el.clientHeight);
      }
    }, 20);
  }, []);

  return height;
}
