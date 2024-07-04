import { ProColumnType } from '@ant-design/pro-components';

export const field: Record<'PRESET_TEXT_FIELD' | 'PRESET_SELECT_FIELD', ProColumnType> = {
  // 文本输入框
  PRESET_TEXT_FIELD: {
    dataIndex: 'field_1',
    title: '表格列1',
  },
  // 下拉选择框
  PRESET_SELECT_FIELD: {
    dataIndex: 'field_1',
    title: '表格列1',
    valueType: 'select',
    fieldProps: {
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ],
    },
  },
};
