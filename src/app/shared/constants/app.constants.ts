export const APP_CONSTANTS = {
  DEBOUNCE_TIME_MS: 300,
  ERROR_NOTIFICATION_DURATION_MS: 5000,
  SUCCESS_NOTIFICATION_DURATION_MS: 3000,
  FORM_SUBMIT_DELAY_MS: 1500,
  API_TIMEOUT_MS: 30000
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  NOT_FOUND: 'Recurso no encontrado.',
  BAD_REQUEST: 'Solicitud inválida. Verifica los datos ingresados.',
  CONFLICT: 'El producto ya existe.',
  SERVER_ERROR: 'Error en el servidor. Intenta más tarde.',
  UNKNOWN_ERROR: 'Ocurrió un error inesperado.'
};

export const SUCCESS_MESSAGES = {
  PRODUCT_CREATED: 'Producto creado exitosamente',
  PRODUCT_UPDATED: 'Producto actualizado exitosamente',
  PRODUCT_DELETED: 'Producto eliminado exitosamente'
};
