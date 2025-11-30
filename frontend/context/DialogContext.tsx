import Dialog from "@/components/Dialog/Dialog";
import React, { createContext, ReactNode, useContext } from "react";

/**
 * Opções para configurar o diálogo
 * @property title - Título do diálogo
 * @property message - Mensagem do diálogo
 * @property confirmText - Texto do botão de confirmação
 * @property cancelText - Texto do botão de cancelamento
 * @property onConfirm - Callback executado ao confirmar
 * @property dismissOnBackdropPress - Fechar ao clicar no fundo (padrão: true)
 */
type DialogOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  dismissOnBackdropPress?: boolean;
};

/**
 * Interface do contexto de diálogo
 * @property abrirDialog - Função para abrir o diálogo com opções
 * @property fecharDialog - Função para fechar o diálogo
 */
interface IDialogContext {
  abrirDialog: (options?: DialogOptions) => void;
  fecharDialog: () => void;
}

const DialogContexto = createContext<IDialogContext>({
  abrirDialog: () => {},
  fecharDialog: () => {},
});

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogVisivel, setDialogVisivel] = React.useState(false);
  const [title, setTitle] = React.useState<string | undefined>(undefined);
  const [message, setMessage] = React.useState<string | undefined>(undefined);
  const [confirmText, setConfirmText] = React.useState<string | undefined>(undefined);
  const [cancelText, setCancelText] = React.useState<string | undefined>(undefined);
  const [onConfirmCallback, setOnConfirmCallback] = React.useState<(() => void) | undefined>(undefined);
  const [dismissOnBackdropPress, setDismissOnBackdropPress] = React.useState<boolean>(true);

  function abrirDialog(options?: DialogOptions) {
    setTitle(options?.title);
    setMessage(options?.message);
    setConfirmText(options?.confirmText);
    setCancelText(options?.cancelText);
    setOnConfirmCallback(options?.onConfirm && (() => options?.onConfirm));
    setDismissOnBackdropPress(options?.dismissOnBackdropPress ?? true);
    setDialogVisivel(true);
  }

  function fecharDialog() {
    setDialogVisivel(false);
    // opcional: limpar callbacks/opções após fechar
    setOnConfirmCallback(undefined);
  }

  function confirmar() {
    try {
      if (onConfirmCallback) onConfirmCallback();
    } finally {
      fecharDialog();
    }
  }
  
  return (
    <DialogContexto.Provider value={{ abrirDialog, fecharDialog }}>
      <Dialog 
        visible={dialogVisivel}
        title={title}
        message={message}
        cancelText={cancelText}
        confirmText={confirmText}
        onCancel={fecharDialog}
        onConfirm={onConfirmCallback && confirmar}
        dismissOnBackdropPress={dismissOnBackdropPress}
      />

      {children}
    </DialogContexto.Provider>
  );
}


// hook customizado para facilitar o uso
export function useDialog(): IDialogContext {
  return useContext(DialogContexto);
}

// Exportar as interfaces para uso em outros componentes
export type { DialogOptions, IDialogContext };

