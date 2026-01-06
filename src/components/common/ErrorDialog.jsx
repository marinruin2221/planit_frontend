import React from "react";
import { Button, Dialog, Portal, Text } from "@chakra-ui/react";

/**
 * 서버 에러 메시지용 공통 모달
 * - isOpen: 열림 여부
 * - title: 제목
 * - message: 본문(서버에서 내려준 message)
 * - onClose: 닫기
 */
export default function ErrorDialog({
  isOpen,
  title = "요청 실패",
  message = "알 수 없는 오류가 발생했습니다.",
  onClose,
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose?.()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Text whiteSpace="pre-wrap" color="gray.700">
                {message}
              </Text>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button onClick={onClose}>확인</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
