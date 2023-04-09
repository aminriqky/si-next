import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ShallowRoutingProps {
  slug?: string;
}

const ShallowRouting: NextPage<ShallowRoutingProps> = ({ slug }) => {
  const router = useRouter();
  const { query } = router;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    router.push('/posting?slug=first-post', '/posting/first-post');
  };

  return (
    <div>
      <h1>Shallow Routing Example</h1>
      <p>This is an example of shallow routing in Next.js.</p>
      <Link href="/posting?slug=first-post" as="/posting/first-post">
        <a>Go to First Post</a>
      </Link>
      <br />
      <br />
      <button onClick={handleClick}>Go to First Post (Client-side)</button>
      <br />
      <br />
      <p>Slug: {query.posting || slug}</p>
    </div>
  );
};

ShallowRouting.getInitialProps = async ({ query }): Promise<ShallowRoutingProps> => {
  return { slug: query.slug as string };
};

export default ShallowRouting;
