import { Card, List, Typography } from 'antd';
import React, { FC, useEffect } from 'react';
import { connect, Dispatch, history } from 'umi';
import { SaveFilled, ReadFilled } from '@ant-design/icons';
import { StateType } from './model';
import { ListItemDataType } from './data.d';
import ContainerContent from './components/ContainerContent';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-layout';

import { getPageQuery } from '@/utils/utils';

const { Paragraph } = Typography;

interface ListSearchProps {
  dispatch: Dispatch;
  comicCrawlerAndListSearch: StateType;
  loading: boolean;
}

const ListSearch: FC<ListSearchProps> = ({
  dispatch,
  comicCrawlerAndListSearch: { list = [] },
  loading,
}) => {
  const query = getPageQuery();
  if (Object.keys(query).length) {
    useEffect(() => {
      dispatch({
        type: 'comicCrawlerAndListSearch/fetch',
        payload: query,
      });
    }, []);
  }

  const cardList = list && (
    <List<ListItemDataType>
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 6,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card
            className={styles.card}
            hoverable
            cover={
              <img
                alt={item.title}
                style={{ objectFit: 'cover', maxHeight: '337px' }}
                src={item.cover}
              />
            }
            actions={[
              <div onClick={() => save(item.id)}>
                <SaveFilled /> 保存
              </div>,
              <div>
                <ReadFilled /> 阅读(TODO)
              </div>,
            ]}
          >
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 1 }}>
                  {item.latestChapter}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{item.author}</span>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  const onSearch = (value: string) => {
    const payload = {
      title: value,
    };
    dispatch({
      type: 'comicCrawlerAndListSearch/fetch',
      payload,
    });

    history.replace({
      pathname: history.location.pathname,
      query: payload,
    });
  };

  const save = (id: string) => {
    dispatch({
      type: 'comicCrawlerAndListSearch/save',
      payload: {
        id,
      },
    });
  };

  return (
    <PageContainer content={<ContainerContent defaultValue={query.title} onSearch={onSearch} />}>
      <div className={styles.coverCardList}>
        <Card>
          <div className={styles.cardList}>{cardList}</div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default connect(
  ({
    comicCrawlerAndListSearch,
    loading,
  }: {
    comicCrawlerAndListSearch: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    comicCrawlerAndListSearch,
    loading: loading.models.comicCrawlerAndListSearch,
  }),
)(ListSearch);
