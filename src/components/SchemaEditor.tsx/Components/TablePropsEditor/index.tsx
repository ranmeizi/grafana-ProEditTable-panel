import { AutoSaveField, Field, Input } from '@grafana/ui';
import React from 'react';

// 合并 editableProTableProps 上的属性

export default function TablePropsEditor({ value, onChange }: any) {
  return (
    <Field label="rowKey" description={'表格行的唯一键'}>
      <Input
        value={value.rowKey}
        onChange={(e: any) => {
          onChange('rowKey', e.target.value);
        }}
      />
    </Field>
  );
}
