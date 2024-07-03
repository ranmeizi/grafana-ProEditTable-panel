import { Field, FieldProps, Tooltip, InlineSwitch } from '@grafana/ui';
import React, { PropsWithChildren, useMemo } from 'react';
import useConstant from 'utils/useConstant';

type Props = FieldProps & {
  initialValue?: any; // 初始值
  enabled: boolean;
};

export default function OptionalField({
  enabled,
  children,
  initialValue,
  onChange,
  ...fieldProps
}: PropsWithChildren<Props>) {
  const _initialValue = useConstant(() => initialValue);

  /**
   * 切换可选项的启用
   * 当非启用时，给undefined值
   */
  function onEnabeledChange(checked: boolean) {
    if (!onChange) {
      return;
    }

    if (checked) {
      onChange(_initialValue || ('' as any));
    } else {
      onChange(undefined as any);
    }
  }

  return (
    <div style={{ position: 'relative', transition: '0.15s', filter: enabled ? 'opacity(1)' : 'opacity(0.7)' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, justifyContent: 'space-between', alignItems: 'center' }}>
        <InlineSwitch
          showLabel
          label="启用"
          value={enabled}
          onChange={(e: any) => onEnabeledChange(e.target.checked)}
        />
      </div>
      <Field {...fieldProps}>{enabled ? children : <div>未启用,这是一个可选属性</div>}</Field>
    </div>
  );
}
