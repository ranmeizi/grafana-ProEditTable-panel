/* eslint-disable react-hooks/exhaustive-deps */
import { AppOptions, HttpAddParts } from 'types';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Request } from '@bomon/schema-pro-component/src/components/Provider';
import useConstant from 'utils/useConstant';
import { PanelData } from '@grafana/data';

// 默认的GF请求url，用于useGFRequest匹配拦截
export const GF_REQUEST_ACTION = {
  queryList: '__gf__queryList',
  create: '__gf__create',
  updateById: '__gf__updateById',
  deleteById: '__gf__deleteById',
};

/**
 * GF 数据源查询语句名称
 */
const GF_DATASOURCE_CRUD_CONFIG = {
  queryList: 'queryList',
  create: 'create',
  updateById: 'updateById',
  deleteById: 'deleteById',
};

export default function useGFRequest(data: PanelData['series']): Request {
  // 数据源
  const [data, setData] = useState([]);

  return useCallback((url, method, params) => {
    return Promise.reject();
  }, []);
}
