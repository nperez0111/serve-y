import type { Message, ServerContext, StateVector, Update } from "match-maker";
import type { Document } from "match-maker/server";
/**
 * A storage interface for a document.
 */
export abstract class DocumentStorage {
  public readonly type = "document-storage";

  public encrypted = false;

  /**
   * Stores an update for a document.
   */
  abstract write(key: string, update: Update): Promise<void>;

  /**
   * Fetches the update and computes a state vector for a document.
   */
  abstract fetch(key: string): Promise<{
    update: Update;
    stateVector: StateVector;
  } | null>;

  /**
   * Unloads a document from storage.
   */
  abstract unload(key: string): Promise<void> | void;

  // /**
  //  * Creates a snapshot of a document.
  //  */
  // snapshot(
  //   key: string,
  //   name: string,
  // ): Promise<{
  //   id: string;
  //   meta: {
  //     name: string;
  //     createdAt: number;
  //   };
  // } | null>;

  // /**
  //  * Gets a snapshot of a document.
  //  */
  // getSnapshot(
  //   key: string,
  //   snapshotId: string,
  // ): Promise<{
  //   id: string;
  //   meta: {
  //     name: string;
  //     createdAt: number;
  //   };
  //   update: Update;
  //   stateVector: StateVector;
  // } | null>;

  // /**
  //  * Lists all snapshots of a document.
  //  */
  // getSnapshots(key: string): Promise<
  //   {
  //     id: string;
  //     meta: {
  //       name: string;
  //       createdAt: number;
  //     };
  //   }[]
  // >;

  // /**
  //  * Restores a document from a snapshot.
  //  */
  // restore(
  //   key: string,
  //   snapshotId: string,
  //   name: string,
  // ): Promise<{
  //   id: string;
  //   meta: {
  //     name: string;
  //     createdAt: number;
  //   };
  //   update: Update;
  //   stateVector: StateVector;
  // } | null>;
}

export abstract class LowLevelDocumentStorage {
  public readonly type = "low-level-document-storage";

  /**
   * Called when a message is received for a document.
   */
  abstract onMessage<Context extends ServerContext>(
    message: Message<Context>,
    document: Document<Context>,
  ): Promise<void> | void;

  /**
   * Called when a document is unloaded.
   */
  abstract onUnload<Context extends ServerContext>(
    document: Document<Context>,
  ): Promise<void> | void;
}
