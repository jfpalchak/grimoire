'use client';

import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string; };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {

  useEffect(() => {
    console.error(error)
  }, [error]);

  return (
    <section>
      <div className="mt-20 text-center text-x">
        <h2>Something went wrong! Roll with advantage.</h2>
        <button
          onClick={
            () => reset()
          }
        >
          Try again.
        </button>
      </div>
    </section>
  )
}