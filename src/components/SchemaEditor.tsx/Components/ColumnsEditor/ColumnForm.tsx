/* eslint-disable no-duplicate-imports */
import { EditableProTable, ProColumnType, ProConfigProvider } from '@ant-design/pro-components';
import {
  Switch,
  Field,
  Input,
  PanelContainer,
  Select,
  useStyles2,
  SelectCommonProps,
  HorizontalGroup,
} from '@grafana/ui';
import React, { useRef, useState } from 'react';
import OptionalField from '../OptionalField';
import useConstant from 'utils/useConstant';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';
import { ProTable, BetaSchemaForm } from '@ant-design/pro-components';
import { ThemeProvider } from 'components/ProTablePanel';
import { Button, ConfigProvider, Divider } from 'antd';
import { OptionsEditor } from '../OptionsEditor';

// 样式c
const getStyles = (theme: GrafanaTheme2) => css({});

export default function ColumnForm({
  value,
  onChange,
  onClose,
}: {
  value: ProColumnType;
  onChange: any;
  onClose: any;
}) {
  const css = useStyles2(getStyles);

  //@ts-ignore
  const initialValues = useConstant(() => value);

  const [data, setData] = useState<any>(initialValues);

  const [previewValue, setPreviewValue] = useState('');

  const popupContainerEl = useRef<HTMLDivElement>(null);

  function onFieldChange(key: string, value: any) {
    const clone_data = JSON.parse(JSON.stringify(data));
    if (value === undefined) {
      delete clone_data[key];
    } else {
      clone_data[key] = value;
    }
    setData({ ...clone_data });
  }

  return (
    <div ref={popupContainerEl} className={css}>
      <ThemeProvider>
        <ConfigProvider getPopupContainer={() => popupContainerEl.current!}>
          {/* 文档地址 */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>使用Ant-Design Colunms标准</div>
            <a
              href={'https://procomponents.ant.design/components/table#columns-%E5%88%97%E5%AE%9A%E4%B9%89'}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'rgb(90, 134, 222)' }}
            >
              Columns 文档
            </a>
          </div>
          <Divider type="horizontal" />
          <div style={{ display: 'flex' }}>
            {/* 预设 */}
            <div style={{ width: '300px', marginRight: '32px' }}>
              <Field label="预设" description="几种常用的预设字段类型">
                <Select
                  options={[
                    {
                      label: '不使用预设',
                      value: 'none',
                    },
                    {
                      label: '下拉选择框',
                      value: '1',
                    },
                  ]}
                  onChange={(e: any) => {
                    alert('hei');
                  }}
                />
              </Field>
            </div>
            {/* 预览 */}
            <div style={{ width: '100%' }}>
              <Field label="预览" description="简单预览 表格/表单">
                <PanelContainer
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '12px',
                    background: 'rgba(111,111,111,.1)',
                  }}
                >
                  <EditableProTable
                    rowKey="id"
                    style={{ width: '240px' }}
                    cardProps={{ bodyStyle: { padding: 0 } }}
                    columns={[
                      data,
                      {
                        title: '操作',
                        valueType: 'option',
                        render(_, record, index, action) {
                          return (
                            <a
                              key="editable"
                              onClick={() => {
                                action?.startEditable?.(1);
                              }}
                            >
                              编辑
                            </a>
                          );
                        },
                      },
                    ]}
                    size="small"
                    search={false}
                    options={false}
                    value={[{ [String(data.dataIndex)]: previewValue, id: 1 }]}
                    pagination={false}
                    recordCreatorProps={false}
                    editable={{ actionRender: (row, config, defaultDom) => [defaultDom.cancel] }}
                  />
                  <BetaSchemaForm
                    autoFocusFirstInput={false}
                    key={JSON.stringify(data)}
                    columns={[data]}
                    initialValues={{ [data.dataIndex]: previewValue }}
                    onValuesChange={(values) => setPreviewValue(values[data.dataIndex])}
                    submitter={false}
                  />
                </PanelContainer>
              </Field>
            </div>
          </div>
          <Divider type="horizontal" />
          {/* 表单 */}
          <div style={{ overflowY: 'auto', maxHeight: '700px' }}>
            <Field label="字段名" description="dataIndex">
              <Input
                value={data.dataIndex as string}
                onChange={(e: any) => {
                  onFieldChange('dataIndex', e.target.value);
                }}
              />
            </Field>

            <Field label="展示名" description="title">
              <Input
                value={data.title as string}
                onChange={(e: any) => {
                  onFieldChange('title', e.target.value);
                }}
              />
            </Field>

            <Field label="可编辑" description="可编辑editable">
              <Switch
                value={data.editable}
                onChange={(e: any) => {
                  onFieldChange('editable', e.target.checked);
                }}
              />
            </Field>

            <OptionalField
              label="字段类型"
              initialValue={initialValues.valueType}
              description="valueType(自定义类型需要使用Provider提供组件,默认是text)"
              onChange={(v) => onFieldChange('valueType', v)}
              enabled={data.valueType !== undefined}
            >
              <Select
                value={data.valueType}
                options={AntValueMapsOptions}
                onChange={(value) => {
                  onFieldChange('valueType', value.value);
                }}
              ></Select>
            </OptionalField>

            {data.valueType === 'select' ? (
              <Field label="枚举值">
                <div style={{ width: '400px' }}>
                  <OptionsEditor
                    value={data?.fieldProps?.options || []}
                    onChange={(v) => {
                      onFieldChange('fieldProps', {
                        ...data.fieldProps,
                        options: v,
                      });
                    }}
                  />
                </div>
              </Field>
            ) : null}
          </div>
          <Divider type="horizontal" />
          {/* 提交按钮 */}
          <HorizontalGroup justify="flex-end">
            <Button onClick={onClose}>取消</Button>
            <Button type="primary">保存</Button>
          </HorizontalGroup>
        </ConfigProvider>
      </ThemeProvider>
    </div>
  );
}

const AntValueMapsOptions: SelectCommonProps<any>['options'] = [
  { label: '文本框', value: 'text' },
  { label: '下拉框', value: 'select' },
  { label: '开关', value: 'switch' },
  { label: '日期', value: 'date' },
  { label: '日期时间', value: 'dateTime' },
  { label: '数字输入框', value: 'digit' },
  { label: '金额输入框', value: 'money' },
];
