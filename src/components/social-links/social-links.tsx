import React from 'react';
import { SocialLink } from '@app/types/social-link';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, NavLink } from 'theme-ui';
import './social-links.scss';

export default function SocialLinks(props: { links: SocialLink[] }) {
  return (
    <Flex aria-label='Social links'>
      {props.links.map((social, index) => (
        <NavLink key={index} href={social.socialLink} p={2}>
          <FontAwesomeIcon icon={['fab', social.socialTitle as IconName]} />
        </NavLink>
      ))}
    </Flex>
  );
}
