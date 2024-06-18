/* eslint-disable react-hooks/exhaustive-deps */
import { AppOptions, HttpAddParts } from 'types';
import axios from 'axios';
import { useCallback } from 'react';
import { Request } from '@bomon/schema-pro-component/src/components/Provider';
import useConstant from 'utils/useConstant';

export default function useRequest({ http_add_parts }: AppOptions): Request {
  const cfg = useConstant(() => {
    const config: Record<'headers' | 'params' | 'datas', Record<string, any>> = {
      headers: {},
      params: {},
      datas: {},
    };
    const value: HttpAddParts[] = http_add_parts || [];
    const res: HttpAddParts[][] = [[], [], []];
    for (let item of value) {
      res[item.type].push(item);
    }
    const [headers, params, datas] = res;

    for (let header of headers) {
      config.headers[header.key] = header.value;
    }

    for (let param of params) {
      config.params[param.key] = param.value;
    }

    for (let data of datas) {
      config.datas[data.key] = data.value;
    }

    return config;
  });

  return useCallback((url, method, params) => {
    if (method === 'GET') {
      return axios.get(url, { params: { ...cfg.params, ...params }, headers: cfg.headers }).then((res) => {
        if (res.data.data?.record) {
          return {
            ...res.data.data,
            data: res.data.data.record,
          };
        }
        return res.data.data;
      });
    }

    if (method === 'POST') {
      return axios
        .post(url, { ...cfg.datas, ...params }, { params: { ...cfg.params, ...params }, headers: cfg.headers })
        .then((res) => res.data.data);
    }

    return Promise.reject();
  }, []);
}
