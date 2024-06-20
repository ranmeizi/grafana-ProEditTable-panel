// 完全替换
import { AutoSaveField, Field, Input } from '@grafana/ui';
import React from 'react';

// 合并 editableProTableProps 上的属性

export default function ActionsEditor({ value, onChange }: any) {
  return (
    <>
      <Field label="queryList" description="列表请求URL地址">
        <Input
          value={value.queryList}
          onChange={(e: any) => {
            onChange('queryList', e.target.value);
          }}
        />
      </Field>
      <Field label="create" description="新增行URL地址">
        <Input
          value={value.create}
          onChange={(e: any) => {
            onChange('create', e.target.value);
          }}
        />
      </Field>
      <Field label="updateById" description="按rowKey更新行URL地址">
        <Input
          value={value.updateById}
          onChange={(e: any) => {
            onChange('updateById', e.target.value);
          }}
        />
      </Field>
      <Field label="deleteById" description="按rowKey删除行URL地址">
        <Input
          value={value.deleteById}
          onChange={(e: any) => {
            onChange('deleteById', e.target.value);
          }}
        />
      </Field>
    </>
  );
}
