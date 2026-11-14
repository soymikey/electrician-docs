import React, {type ComponentProps} from 'react';
import {useLocation} from '@docusaurus/router';
import SpeakButton from '../SpeakButton';
import {glossarySpeechText} from './speechText.mjs';

export default function GlossaryTerm({children, ...props}: ComponentProps<'strong'>) {
  const {pathname} = useLocation();
  const text = React.Children.toArray(children);
  const heading = text.every((child) => typeof child === 'string') ? text.join('') : '';
  const spoken = glossarySpeechText(pathname, heading);
  return <><strong {...props}>{children}</strong>{spoken && <SpeakButton text={spoken} />}</>;
}
