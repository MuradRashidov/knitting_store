import { getCollections } from '@/lib/actions/actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-heading1-bold">
        Collections
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {!collections || collections.length === 0 ? <p className='text-body-bold'>No collection found</p>
        :collections.map((collection: CollectionType) => (
          <Link href={`/collections/${collection._id}`} key={collection._id}>
            <div className="w-200 h-200 relative overflow-hidden rounded-lg cursor-pointer">
              <Image  style={{height:"200px !important"}}  width={350} height={200} className="w-200 h-200" src={collection.image} alt={collection.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;
export const dynamic = "force-dynamic";

