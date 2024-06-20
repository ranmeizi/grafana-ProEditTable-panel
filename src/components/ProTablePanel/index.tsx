import { SchemaEditableProTable, Provider } from '@bomon/schema-pro-component';
import { css } from '@emotion/css';
import { GrafanaTheme2, PanelProps } from '@grafana/data';
import { getTheme, useStyles2 } from '@grafana/ui';
import { ConfigProvider, Pagination, theme } from 'antd';
import React, { PropsWithChildren, useMemo } from 'react';
import { AppOptions } from 'types';
import { getParam, updateVariable } from 'utils';
import useRequest from './useRequest';
import { useVariables } from 'utils/useVariables';
import { RemoteSchemaEditableProTableConfig } from '@bomon/schema-pro-component/src/components/EditableProTable';

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

  const { var_page, config } = options;

  const schemaEditableProTableProps = useMemo<RemoteSchemaEditableProTableConfig>(() => {
    return JSON.parse(config || '{}');
  }, [config]);

  return (
    <Provider request={request}>
      <ThemeProvider {...props}>
        <div className={rootCls} style={{ height: height + 'px', overflow: 'scroll' }}>
          <SchemaEditableProTable key={config} vars={vars} {...schemaEditableProTableProps} />
          <Pagination
            current={vars[var_page]}
            total={9999}
            simple
            onChange={(page) => {
              updateVariable(var_page, page);
            }}
          />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export { ProTablePanel };
