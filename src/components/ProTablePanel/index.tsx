import { SchemaEditableProTable, Provider } from '@bomon/schema-pro-component';
import { css } from '@emotion/css';
import { GrafanaTheme2, PanelProps } from '@grafana/data';
import { getTheme, useStyles2 } from '@grafana/ui';
import { ConfigProvider, Pagination, theme } from 'antd';
import FullBlock from 'components/FullBlock';
import React, { PropsWithChildren } from 'react';
import { AppOptions } from 'types';
import { getParam, updateVariable } from 'utils';
import useRequest from './useRequest';
import { useVariables } from 'utils/useVariables';

// 样式
const getStyles = (theme: GrafanaTheme2) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '.ant-pagination': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      '.ant-pagination-options': {
        display: 'none',
      },
    },
    '.schema-editable-protable': {
      height: '100%',
    },
    '.ant-pro-card': {
      background: 'transparent',
      height: '100%',
    },
    '.schema-editable-protable>.ant-pro-card>.ant-pro-card-body': {
      paddingBlock: 0,
    },
  });

const ThemeProvider: React.FC<PropsWithChildren<Props>> = (props) => {
  const grafana_theme = getTheme();

  // url_param
  const url_dark_theme = getParam('theme');

  let is_dark = grafana_theme.isDark;

  if (url_dark_theme) {
    is_dark = url_dark_theme === 'dark';
  }

  // 主题
  const themeConfig = {
    token: {
      borderRadius: 4,
    },
    algorithm: is_dark ? [theme.darkAlgorithm, theme.compactAlgorithm] : [theme.compactAlgorithm],
  };
  return <ConfigProvider theme={themeConfig}>{props.children}</ConfigProvider>;
};

interface Props extends PanelProps<AppOptions> {}

function ProTablePanel(props: Props) {
  const rootCls = useStyles2(getStyles);

  const { height, options } = props;

  const request = useRequest(options);

  let vars = useVariables();

  const pageKey = options.var_page;
  console.log(vars);
  return (
    <Provider request={request}>
      <ThemeProvider {...props}>
        <div className={rootCls} style={{ height: height + 'px', overflow: 'scroll' }}>
          <SchemaEditableProTable
            vars={{
              page_num: vars.page,
              page_size: vars.size,
            }}
            editableProTableProps={{
              rowKey: 'id',
              columns: [
                { title: 'ID', dataIndex: 'id', editable: false },
                { title: '用户名', dataIndex: 'uname', editable: true, valueType: 'text' },
                { title: '昵称', dataIndex: 'nickname', editable: true, valueType: 'text' },
                {
                  title: '性别',
                  dataIndex: 'sex',
                  editable: true,
                  valueType: 'select',
                  fieldProps: {
                    options: [
                      { label: '男', value: '1' },
                      { label: '女', value: '2' },
                      { label: '未知', value: '3' },
                    ],
                  },
                },
                { title: '手机', dataIndex: 'mobile', editable: true, valueType: 'text' },
                { title: '邮箱', dataIndex: 'email', editable: true, valueType: 'text' },
                { title: '启用', dataIndex: 'enabled', editable: true, valueType: 'switch' },
              ],
            }}
            actions={{
              queryList: 'http://localhost:3001/system/user/list',
              create: 'http://localhost:3001/system/user/create',
              updateById: 'http://localhost:3001/system/user/update',
              deleteById: 'http://localhost:3001/system/user/deleteById',
            }}
          />
          <Pagination
            current={vars[pageKey]}
            total={9999}
            simple
            onChange={(page) => {
              updateVariable(pageKey, page);
            }}
          />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export { ProTablePanel };
