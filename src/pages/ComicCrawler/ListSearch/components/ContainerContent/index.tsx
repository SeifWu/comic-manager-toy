import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

interface StandardFormRowProps {
  onSearch: Function
}

const ContainerContent: React.FC<StandardFormRowProps> = ({
  onSearch,
}) => {

  return (
    <Search
      placeholder="输入漫画名称"
      enterButton="搜索"
      size="large"
      onSearch={value => onSearch(value)}
    />
  );
};

export default ContainerContent;
