import { Card, List, Typography } from 'antd';
import React, { FC, useEffect } from 'react';
import { connect, Dispatch, history } from 'umi';
import { StateType } from '../model';
import { ListItemDataType } from '../data.d';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-layout';

import { getPageQuery } from '@/utils/utils';

const { Paragraph } = Typography;

interface ListSearchProps {
  dispatch: Dispatch;
  comic: StateType;
  loading: boolean;
}

const ListSearch: FC<ListSearchProps> = ({ dispatch, comic: { list = [] }, loading }) => {
  const query = getPageQuery();
  useEffect(() => {
    dispatch({
      type: 'comic/fetch',
      payload: query,
    });
  }, []);

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
                alt={item.name}
                style={{ objectFit: 'cover', maxHeight: '337px' }}
                src={item.cover}
              />
            }
            onClick={() => read(item.id)}
          >
            <Card.Meta
              title={<a>{item.name}</a>}
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

  const read = (id: string) => {
    history.push(`/comics/${id}`);
  };

  return (
    <PageContainer>
      <div className={styles.coverCardList}>
        <Card>
          <div className={styles.cardList}>{cardList}</div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default connect(
  ({ comic, loading }: { comic: StateType; loading: { models: { [key: string]: boolean } } }) => ({
    comic,
    loading: loading.models.comic,
  }),
)(ListSearch);
