/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, TextArea } from '@grafana/ui';
import React, { useEffect, useRef, useState } from 'react';

export default function JsonEditor({ value, onChange }: any) {
  const [_value, _setValue] = useState(value);
  const [errmsg, setErrmsg] = useState('');
  const el = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    _setValue(JSON.stringify(JSON.parse(value), undefined, 4));
  }, [value]);

  function onBlur() {
    // 保存

    // 检查
    try {
      if (JSON.stringify(JSON.parse(value)) !== JSON.stringify(JSON.parse(_value))) {
        onChange(_value);
      }
    } catch (e: any) {
      // 警告
      setErrmsg(e.message);
    }
  }

  function onClose() {
    setErrmsg('');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Modal title="等一下！你的JSON好像有问题" isOpen={!!errmsg} onDismiss={onClose} onClickBackdrop={onClose}>
        <div>{errmsg}</div>
        <Modal.ButtonRow>
          <Button
            variant="secondary"
            fill="outline"
            onClick={() => {
              _setValue(JSON.stringify(JSON.parse(value), undefined, 4));
              onClose();
            }}
          >
            恢复原样
          </Button>
          <Button
            variant="secondary"
            fill="outline"
            onClick={() => {
              onClose();
              setTimeout(() => {
                el.current!.focus();
              }, 0);
            }}
          >
            我再改改
          </Button>
        </Modal.ButtonRow>
      </Modal>
      <TextArea
        ref={el}
        value={_value}
        // @ts-ignore
        onChange={(e) => _setValue(e.target.value)}
        onBlur={onBlur}
        style={{ flex: 1 }}
      />
    </div>
  );
}
