import { ProColumnType } from '@ant-design/pro-components';

// 扩展列配置
export function expandColumn<DataType = unknown, ValueType = 'text'>(
    col: Array<ProColumnType<DataType, ValueType>>,
    fnList: any,
) {
    return fnList.reduce((p: any, f: any) => f(p), col);
}

// table column
export function colInTable<T = ProColumnType>(arr: T[]) {
    return arr.map((it) => ({
        ...it,
        hideInSearch: true,
    }));
}

// search column
export function colInSearch<T = ProColumnType>(arr: T[]) {
    return arr.map((it) => ({
        ...it,
        hideInForm: true,
        hideInTable: true,
        hideInDescriptions: true,
        hideInSetting: true,
    }));
}
