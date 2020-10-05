import React, { FC, useEffect } from 'react';
import { connect, Dispatch, history } from 'umi';
import { Button, Col, Row, Divider } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { StateType } from '../model';

interface ComicContentProps {
  dispatch: Dispatch;
  comic: StateType;
  loading: boolean;
  match: any;
}

const ComicContent: FC<ComicContentProps> = ({ dispatch, comic: { content }, loading, match }) => {
  useEffect(() => {
    dispatch({
      type: 'comic/content',
      payload: {
        id: match.params?.id,
        iid: match.params?.iid,
      },
    });
  }, []);

  const toRead = (id: string) => {
    localStorage.setItem(`lastTimeReadChapter-${content.data?.comic_id}`, id)
    history.replace({
      pathname: `/comics/${content.data?.comic_id}/${id}`,
      forceRefresh: true
    });
    dispatch({
      type: 'comic/content',
      payload: {
        id: content.data?.comic_id,
        iid: id,
      },
    }).then(() => {
      document.documentElement.scrollTop = 0
    });

  }

  return (
    <div>
      {content.data?.comicChapterDetail.map((item: any) => {
        return (
          <LazyLoadImage
            key={item.id}
            width="100%"
            effect="blur"
            src={item.img} // use normal <img> attributes as props
          />
        )
      })}

      <div style={{ marginTop: 20 }}>
        <Row gutter={12}>
          <Col span={12}>
            <Button disabled={content.meta?.previousChapter.id === 0} onClick={() => toRead(content.meta?.previousChapter.id)} block>上一话</Button>
          </Col>
          <Col span={12}>
            <Button disabled={content.meta?.nextChapter.id === 0} onClick={() => toRead(content.meta?.nextChapter.id)} block>下一话</Button>
          </Col>
        </Row>
        <Divider orientation="left">Tip</Divider>
        <div>
          上一话： {content.meta?.previousChapter.num}
        </div>
        <div>
          下一话： {content.meta?.nextChapter.num}
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ comic, loading }: { comic: StateType; loading: { models: { [key: string]: boolean } } }) => ({
    comic,
    loading: loading.models.comic,
  }),
)(ComicContent);
