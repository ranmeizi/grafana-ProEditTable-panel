import { Row, Col } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React from 'react';
import { Button, Input, useStyles2 } from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';

// 样式
const getStyles = (theme: GrafanaTheme2) =>
  css({
    '.type-list__row': {
      width: '100%',
      '.ant-col': {
        padding: '4px',
      },
      '&.title': {
        display: 'flex',
        alignItems: 'center',
        background: theme.colors.background.secondary,
      },
    },
  });

type EditListProps = {
  value: DefaultOptionType[];
  onChange: (value: DefaultOptionType[]) => void;
};

// 编辑列表
export function OptionsEditor(props: EditListProps) {
  const rootCls = useStyles2(getStyles);

  function handleRowChange(index: number, value?: DefaultOptionType) {
    if (!value) {
      // 删除
      props.value.splice(index, 1);
    } else {
      props.value.splice(index, 1, value);
    }
    props.onChange([...props.value]);
  }
  return (
    <Row className={rootCls}>
      <Row className="type-list__row title">
        <Col span={10}>Value</Col>
        <Col span={10}>Label</Col>
      </Row>
      {props.value.map((item, index) => (
        <EditRow key={index} value={item} onChange={(value: any) => handleRowChange(index, value)}></EditRow>
      ))}
      <Button
        variant="secondary"
        fullWidth
        onClick={() => {
          props.onChange([...props.value, { label: '', value: '' }]);
        }}
      >
        新增
      </Button>
    </Row>
  );
}

type EditRowProps = {
  value: DefaultOptionType;
  onChange: (value?: DefaultOptionType) => void;
};
type FixEvent = React.FormEvent<HTMLInputElement> & { target: { value: any } };

// 行编辑
function EditRow({ value, onChange }: EditRowProps) {
  return (
    <Row align="middle" className="type-list__row">
      <Col span={10}>
        <Input value={String(value.value)} onChange={(e: FixEvent) => onChange({ ...value, value: e.target.value })} />
      </Col>
      <Col span={10}>
        <Input value={String(value.label)} onChange={(e: FixEvent) => onChange({ ...value, label: e.target.value })} />
      </Col>
      <Col span={4}>
        <Button fullWidth icon="trash-alt" variant="destructive" onClick={() => onChange()}></Button>
      </Col>
    </Row>
  );
}
