import { SocialLink } from '@app/types/social-link';

export const socialLinkEdgesMap = (el: { node: SocialLink }): SocialLink => el.node;
