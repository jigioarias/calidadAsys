//lista de mensajes y etiquetas de aplicacion

export const messages = {
  //iconos para los mensajes
  success: 'success',
  error: 'error',
  warning: 'warning',
  //tamaño de la pantalla de mensajes
  widthWindowMessage: '300',
  // item crud
  editItemError: 'Error Actualizando el item',
  editItemSuccess: 'El item fue guardado exitosamente',
  //user crud
  editUserError: 'Error Actualizando el usuario',
  editUserSuccess: 'El usuario fue guardado exitosamente'

  //rooms crud

  // sale transaction

  //param crud
};

export class Messages {
  private static messages = {
    delete_confirm: '¿Estás seguro de eliminar el %0?',
    delete_success: 'El %0 fue eliminado exitosamente',

    priceDetail_info_incomplete:
      'Para definir un precio <b>personalizado</b>, debe definir por lo menos para que día aplicará y un precio por día u hora.',
    priceDetail_save_success: 'El tipo de habitación fue guardado exitosamente.',
    priceDetail_list_noContent: 'No se han definido tipos de habitación.',

    no_message: 'No existe mensaje con código %0'
  };

  static get(codigo: string, ...parametros: string[]): string {
    const message: string = this.messages[codigo];
    if (message) {
      return message.replace(/\%(\d+)/g, (match) => parametros[match.slice(1)] || match);
    } else {
      throw new Error(Messages.get('no_message', codigo));
    }
  }
}
