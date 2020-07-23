import React from 'react';
import { Flex } from 'theme-ui';
import { NavigationLink } from '@app/types/navigation-link';
import { Link } from 'gatsby';
import './navigation-links.scss';

export default function NavigationLinks(props: { children?: any, links: NavigationLink[] | null, role?: string; }) {
  if (!props.links) {
    props.links = [];
  }

  return (
    <Flex role={props.role || ''} aria-label='Main page navigation' as='nav'>
      {props.children}
      {props.links.map((link, index) => (
        <Link key={index} to={link.link} activeClassName='router__active-link' >
          {link.name}
        </Link>
      ))}
    </Flex>
  );
}
