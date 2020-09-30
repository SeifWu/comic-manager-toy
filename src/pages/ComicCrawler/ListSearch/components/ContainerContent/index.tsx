import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

interface StandardFormRowProps {
  onSearch: Function;
  defaultValue: string | string[] | undefined;
}

const ContainerContent: React.FC<StandardFormRowProps> = ({
  onSearch,
  defaultValue,
}) => {
  console.log(defaultValue)
  return (
    <Search
      defaultValue={defaultValue}
      placeholder="输入漫画名称"
      enterButton="搜索"
      size="large"
      onSearch={value => onSearch(value)}
    />
  );
};

export default ContainerContent;
