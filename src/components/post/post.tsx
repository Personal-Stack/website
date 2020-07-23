import React from 'react';
import { pageTitleHelper } from '@app/helpers/postTitle';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import './post.scss';

export interface IPost {
  sanityId: string;
  urlName: string;
  series: {
    name: string;
  };
  title: string;
  tag: Array<{
    tag: string;
  }>;
  content: string;
}

// tslint:disable-next-line: no-shadowed-variable
export function Post(props: { post: IPost }) {
  return (
    <div className='blog__post__link' role='listitem'>
      <div className='blog__post__link__time-to-read'>
        <FontAwesomeIcon icon={faReadme} />
        <span> {Math.round(props.post.content.split(' ').length / 200)} mins </span>
      </div>

      <h2>
        <Link
          to={`/post/${
            props.post.urlName || pageTitleHelper(props.post.title)
          }`}
        >
          {props.post.title}
        </Link>
      </h2>
    </div>
  );
}
