import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 Seif"
    links={[
      {
        key: 'Seif',
        title: 'Seif',
        href: 'seifwu.com',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/SeifWu',
        blankTarget: true,
      },
    ]}
  />
);
