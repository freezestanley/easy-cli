import React from 'react';
import { Button } from 'antd';
import ImgShow from 'components/ImgShow/index';
import { downloadFileFun } from 'utils/index';

import commonStyle from '../common.module.scss';

const getFileType = (type) => {
  const dotIndex = type.lastIndexOf('.');
  return type.slice(dotIndex + 1);
};

// const isImgFun = (data) => {
//   const type = getFileType(data);
//   return ['jpg', 'png', 'jpeg'].includes(type);
// };

const isPdfFun = (data) => {
  const type = getFileType(data);
  return type === 'pdf';
};

const getSigleFileNode = (data, key) => {
  const isPdf = isPdfFun(data.name);
  return (
    <div className="df" key={key}>
      <div className={'ellipsis ' + commonStyle['width-200']}>{data.name}</div>
      <Button type="link" icon="download" size="small" onClick={() => downloadFileFun(data.url)}>
        下载文件
      </Button>
      {isPdf ? (
        <Button type="link" icon="file-search" size="small">
          预览
        </Button>
      ) : null}
    </div>
  );
};

const getFileListNode = (list) => {
  const nodeArr = [];
  list.forEach((item, index) => {
    const sigleFileNode = getSigleFileNode(item, index);
    nodeArr.push(sigleFileNode);
  });
  return (
    <div>
      {nodeArr}
    </div>
  );
};

const getNode = (showType, fileList) => {
  const fileNo = fileList.length;
  if (!fileNo) return null;

  if (showType === 'file') {
    if (fileNo === 1) {
      return getSigleFileNode(fileList[0], 0);
    } else {
      return getFileListNode(fileList);
    }
  } else {
    return (
      <div className="df">
        <div className={'df ' + commonStyle['width-200']}>
          <ImgShow data={fileList}></ImgShow>
          {fileNo > 1 ? <div>共{fileNo}张</div> : null}
        </div>
        {fileNo > 1 ? (
          <Button type="link" icon="download" size="small">
            下载全部图片
          </Button>
        ) : null}
      </div>
    );
  }
};

const FileAndImgShow = (props) => {
  const { fileList, showType = 'image' } = props;
  const node = getNode(showType, fileList);

  return node;
};

export default FileAndImgShow;
