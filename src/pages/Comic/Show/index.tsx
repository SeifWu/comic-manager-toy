import { List, Divider, Button } from 'antd';
import React, { FC, useEffect } from 'react';
import { connect, Dispatch, history } from 'umi';
import { StateType } from '../model';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-layout';

interface ComicShowProps {
  dispatch: Dispatch;
  comic: StateType;
  loading: boolean;
  match: any;
}

const ComicShow: FC<ComicShowProps> = ({ dispatch, comic: { detail }, loading, match }) => {
  useEffect(() => {
    dispatch({
      type: 'comic/show',
      payload: {
        id: match.params?.id,
      },
    });
  }, []);

  const toRead = (id: string) => {
    localStorage.setItem(`lastTimeReadChapter-${detail.id}`, id);
    history.push(`/comics/${detail.id}/${id}`);
  };

  const lastTimeReadChapter = (detail.comicChapter || []).filter(
    (item) => item.id == localStorage.getItem(`lastTimeReadChapter-${detail.id}`),
  );

  return (
    <PageContainer title={detail.name}>
      <div className={styles.coverCardList}>
        <Divider orientation="left">上次看到</Divider>
        {lastTimeReadChapter.map((item) => {
          return (
            <div key={item.id}>
              <Button
                onClick={() => toRead(item.id)}
                block
                style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                {item.num}
              </Button>
            </div>
          );
        })}

        <Divider orientation="left">章节列表</Divider>
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={detail.comicChapter}
          renderItem={(item) => (
            <List.Item>
              <Button
                onClick={() => toRead(item.id)}
                block
                style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                {item.num}
              </Button>
            </List.Item>
          )}
        />
      </div>
    </PageContainer>
  );
};

export default connect(
  ({ comic, loading }: { comic: StateType; loading: { models: { [key: string]: boolean } } }) => ({
    comic,
    loading: loading.models.comic,
  }),
)(ComicShow);
