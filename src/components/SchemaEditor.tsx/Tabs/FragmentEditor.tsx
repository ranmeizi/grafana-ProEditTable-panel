import { Select } from '@grafana/ui';
import React, { useMemo, useState } from 'react';
import TablePropsEditor from '../Components/TablePropsEditor';
import ActionsEditor from '../Components/ActionsEditor';
import ColumnsEditor from '../Components/ColumnsEditor';

export default function FragmentEditor({ value, onChange }: any) {
  const [key, setKey] = useState('editableProTableProps');

  function tablePropsOnChange(key: string, value: any) {
    const newJson = {
      ...json,
      editableProTableProps: {
        ...json.editableProTableProps,
        [key]: value,
      },
    };
    onChange(JSON.stringify(newJson));
  }

  function actionsOnChange(key: string, value: any) {
    const newJson = {
      ...json,
      actions: {
        ...json.actions,
        [key]: value,
      },
    };
    onChange(JSON.stringify(newJson));
  }

  function columnsOnChange(columns: any[]) {
    const newJson = {
      ...json,
      editableProTableProps: {
        ...json.editableProTableProps,
        columns: columns,
      },
    };
    onChange(JSON.stringify(newJson));
  }

  const json = useMemo(() => {
    return JSON.parse(value);
  }, [value]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Select
        options={[
          {
            label: '[表格属性] editableProTableProps',
            value: 'editableProTableProps',
          },
          {
            label: '[列属性] editableProTableProps.columns',
            value: 'editableProTableProps.columns',
          },
          {
            label: '[请求地址] actions',
            value: 'actions',
          },
        ]}
        value={key}
        onChange={(v) => setKey(v.value + '')}
      ></Select>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {(() => {
          switch (key) {
            case 'editableProTableProps':
              return <TablePropsEditor value={json.editableProTableProps} onChange={tablePropsOnChange} />;
            case 'actions':
              return <ActionsEditor value={json.actions} onChange={actionsOnChange} />;
            case 'editableProTableProps.columns':
              return <ColumnsEditor value={json.editableProTableProps.columns} onChange={columnsOnChange} />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}
