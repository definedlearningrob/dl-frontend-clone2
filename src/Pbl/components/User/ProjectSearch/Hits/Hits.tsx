import { connectInfiniteHits, Hit, InfiniteHitsProvided } from 'react-instantsearch-core';
import { useEffect, useMemo, useRef, useState } from 'react';

import HitComponent from './Hit/Hit';
import './Hits.sass';

const UserProjectSearchHits = ({ hits, hasMore, refineNext }: InfiniteHitsProvided) => {
  const sentinel = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersectiing] = useState(false);

  const onSentinelIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      setIsIntersectiing(entry.isIntersecting);
    });
  };

  const observer = useMemo(() => new IntersectionObserver(onSentinelIntersection), []);

  useEffect(() => {
    if (sentinel.current) {
      observer.observe(sentinel.current);
    }

    () => observer.disconnect();
  }, [sentinel.current, hits]);

  useEffect(() => {
    if (hasMore && isIntersecting) {
      refineNext();
    }
  }, [isIntersecting]);

  return (
    <div className='search-results'>
      {hits.map((hit: Hit) => (
        <HitComponent key={hit.objectID} hit={hit} />
      ))}
      <div ref={sentinel} />
    </div>
  );
};

export default connectInfiniteHits(UserProjectSearchHits);
