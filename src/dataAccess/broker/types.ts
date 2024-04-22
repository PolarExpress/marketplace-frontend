/* eslint-disable custom/enforce-copyright-comment */

export type ReceiveMessageI = {
  callID: string;
  status: string;
  type: string;
  value: Record<string, any>;
};

type keyTypeI =
  | "broadcastState"
  | "dbConnection"
  | "mpBackend"
  | "mpBackend"
  | "query"
  | "query"
  | "schema"
  | "state";
type subKeyTypeI =
  // Crud
  | "create"
  | "delete"
  | "deleteDbConnection"
  | "editDbConnection"
  | "get"
  | "getAll"
  // Custom
  | "getAllDbConnections"
  | "getDbConnection"
  | "getSchema"
  | "getSchemaStats"
  | "newDbConnection"
  | "runQuery"
  | "select"
  | "testConnection"
  | "update";

export type SendMessageI = {
  body?: any;
  key: keyTypeI;
  subKey?: subKeyTypeI;
};

export type SendMessageWithSessionI = {
  body?: string;
  callID: string;
  sessionID: string;
} & SendMessageI;

export type QueuedMessage = {
  callback?: Function;
  message: SendMessageI;
};

/**
 * Format for sending message to marketplace backend. Subkey does not matter.
 */
export type MpBackendMessage = {
  body: {
    [key: string]: any;
    action: MpBackendAction;
  };
  key: "mpBackend";
  subKey: "get";
} & SendMessageI;

/**
 * Types of possible actions to send to the marketplace backend.
 */
export type MpBackendAction =
  | "addons/get"
  | "addons/get-by-id"
  | "addons/get-by-user"
  | "addons/get-readme"
  | "addons/search"
  | "install"
  | "uninstall";
