/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import invariant from 'shared/invariant';
import warning from 'shared/warning';
// TODO: We can remove this if we add invariantWithStack()
// or add stack by default to invariants where possible.
import ReactSharedInternals from 'shared/ReactSharedInternals';

import voidElementTags from './voidElementTags';

const HTML = '__html';

let ReactDebugCurrentFrame = null;
if (__DEV__) {
  ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
}

function assertValidProps(tag: string, props: ?Object) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  //不能包含 children 的 DOM 节点，如<br/>、<input/>等
  if (voidElementTags[tag]) {
    invariant(
      props.children == null && props.dangerouslySetInnerHTML == null,
      '%s is a void element tag and must neither have `children` nor ' +
        'use `dangerouslySetInnerHTML`.%s',
      tag,
      __DEV__ ? ReactDebugCurrentFrame.getStackAddendum() : '',
    );
  }
  if (props.dangerouslySetInnerHTML != null) {
    invariant(
      props.children == null,
      'Can only set one of `children` or `props.dangerouslySetInnerHTML`.',
    );
    invariant(
      typeof props.dangerouslySetInnerHTML === 'object' &&
        HTML in props.dangerouslySetInnerHTML,
      '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' +
        'Please visit https://fb.me/react-invariant-dangerously-set-inner-html ' +
        'for more information.',
    );
  }
  //删除了 dev 代码
  invariant(
    props.style == null || typeof props.style === 'object',
    'The `style` prop expects a mapping from style properties to values, ' +
      "not a string. For example, style={{marginRight: spacing + 'em'}} when " +
      'using JSX.%s',
    __DEV__ ? ReactDebugCurrentFrame.getStackAddendum() : '',
  );
}

export default assertValidProps;
