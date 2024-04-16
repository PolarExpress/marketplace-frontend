/* eslint-disable custom/enforce-copyright-comment */

export type ReceiveMessageI = {
  callID: string;
  type: string;
  status: string;
  value: Record<string, any>;
};

export type keyTypeI =
  | "broadcastState"
  | "dbConnection"
  | "schema"
  | "query"
  | "state"
  | "mpBackend";
export type subKeyTypeI =
  // Crud
  | "create"
  | "getAll"
  | "delete"
  | "update"
  | "get"
  | "select"
  // Custom
  | "newDbConnection"
  | "editDbConnection"
  | "deleteDbConnection"
  | "getDbConnection"
  | "getAllDbConnections"
  | "testConnection"
  | "getSchema"
  | "getSchemaStats"
  | "runQuery";

export type SendMessageI = {
  key: keyTypeI;
  subKey?: subKeyTypeI;
  body?: any;
};

export type SendMessageWithSessionI = SendMessageI & {
  callID: string;
  sessionID: string;
  body?: string;
};

export type QueuedMessage = {
  message: SendMessageI;
  callback?: Function;
};

/**
 * Format for sending message to marketplace backend.
 * Subkey does not matter.
 */
export type MpBackendMessage = SendMessageI & {
  key: "mpBackend";
  subKey: "get";
  body: {
    action: MpBackendAction;
    [key: string]: any;
  };
};

/**
 * Types of possible actions to send to the marketplace backend.
 */
export type MpBackendAction =
  | "install"
  | "uninstall"
  | "addons/get"
  | "addons/get-by-id"
  | "addons/get-readme"
  | "addons/get-by-user";
