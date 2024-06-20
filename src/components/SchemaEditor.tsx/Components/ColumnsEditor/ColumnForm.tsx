import { ProColumnType } from '@ant-design/pro-components';
import { Field, Input } from '@grafana/ui';
import React from 'react';

export default function ColumnForm({ value, onChange }: { value: ProColumnType; onChange: any }) {
  return (
    <div>
      <Field label="dataIndex" description="字段名">
        <Input
          value={value.dataIndex as string}
          onChange={(e: any) => {
            onChange('dataIndex', e.target.value);
          }}
        />
      </Field>
      <Field label="title" description="展示名">
        <Input
          value={value.title as string}
          onChange={(e: any) => {
            onChange('title', e.target.value);
          }}
        />
      </Field>
    </div>
  );
}
