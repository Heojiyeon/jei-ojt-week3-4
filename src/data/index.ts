import { Problem } from '@/atoms/problem';
import {
  COMPLETE_TRANSACTION,
  DO_NOT_SUPPORT,
  FAILURE_TRANSACTION,
} from '@/constants/db';
import { GAME_TYPE_NUMBER, GAME_TYPE_SITUATION } from '@/constants/game';

type addIndexedDBProp = {
  gameType: string;
  problems: Problem[];
};

type getIndexedDBProp = {
  gameType: string;
};

/** @function
 * @description 현재 브라우저의 indexedDB 내 store를 생성하는 함수
 */
export const createIndexedDB = () => {
  const idxDB = window.indexedDB;

  if (!idxDB) {
    alert(DO_NOT_SUPPORT);
    return;
  }

  let db: IDBDatabase;
  const request = idxDB.open('content');

  /**
   * 저장소 내 objectStore 생성
   */
  request.onupgradeneeded = e => {
    db = (e.target as IDBOpenDBRequest).result;
    db.createObjectStore(GAME_TYPE_NUMBER);
    db.createObjectStore(GAME_TYPE_SITUATION);
  };

  /**
   * 저장소 내 에러 처리
   */
  request.onerror = e => console.error(e);
};

/** @function
 * @param gameType {string} 현재 게임 타입
 * @param problems {Problem[]} 추가될 문제 정보
 * @description 게임 타입에 따라 indexedDB store에 문제를 추가 및 저장하는 함수
 */
export const addIndexedDB = ({ gameType, problems }: addIndexedDBProp) => {
  const idxDB = window.indexedDB;

  if (!idxDB) {
    alert(DO_NOT_SUPPORT);
    return;
  }

  let db: IDBDatabase;
  const request = idxDB.open('content');
  /**
   * 트랜잭션(DB 상태 변화) 핸들링
   */

  request.onsuccess = e => {
    db = (e.target as IDBOpenDBRequest).result;

    if (gameType === GAME_TYPE_NUMBER) {
      const transaction = db.transaction([GAME_TYPE_NUMBER], 'readwrite');
      const numberGameStore = transaction.objectStore(GAME_TYPE_NUMBER);

      problems &&
        problems.map((problem: Problem) => {
          const modifiedProblem = {
            ...problem,
            content: JSON.stringify(problem.content),
            choice: JSON.stringify(problem.choice),
          };

          numberGameStore.add(modifiedProblem, problem.id);
        });

      // 트랜잭션 완료
      transaction.oncomplete = () => {
        console.log(COMPLETE_TRANSACTION);
      };

      // 트랜잭션 에러
      transaction.onerror = error => {
        console.error(FAILURE_TRANSACTION, error);
      };
    } else if (gameType === GAME_TYPE_SITUATION) {
      const transaction = db.transaction([GAME_TYPE_SITUATION], 'readwrite');
      const situationGameStore = transaction.objectStore(GAME_TYPE_SITUATION);

      problems &&
        problems.map((problem: Problem) => {
          const modifiedProblem = {
            ...problem,
            content: JSON.stringify(problem.content),
            choice: JSON.stringify(problem.choice),
          };

          situationGameStore.add(modifiedProblem, problem.id);
        });

      // 트랜잭션 완료
      transaction.oncomplete = () => {
        console.log(COMPLETE_TRANSACTION);
      };

      // 트랜잭션 에러
      transaction.onerror = error => {
        console.error(FAILURE_TRANSACTION, error);
      };
    }
  };
};

/** @function
 * @param gameType {string} 현재 게임 타입
 * @description 게임 타입에 따라 indexedDB에서 문제 정보를 가져오는 함수
 */
export const getIndexedDB = ({ gameType }: getIndexedDBProp) => {
  const idxDB = window.indexedDB;

  if (!idxDB) {
    alert(DO_NOT_SUPPORT);
    return;
  }

  return new Promise((resolve, reject) => {
    const request = idxDB.open('content');

    /**
     * 저장소 내 에러 처리
     */
    request.onerror = e => {
      console.error(e);
      reject((e.target as IDBOpenDBRequest).error);
    };

    /**
     * 트랜잭션(DB 상태 변화) 핸들링
     */
    request.onsuccess = () => {
      if (gameType === GAME_TYPE_NUMBER) {
        const problemStore = request.result
          .transaction([GAME_TYPE_NUMBER])
          .objectStore(GAME_TYPE_NUMBER);

        problemStore.getAll().onsuccess = e => {
          const problems = (e.target as IDBOpenDBRequest).result;

          resolve(problems);
        };
      } else if (gameType === GAME_TYPE_SITUATION) {
        const problemStore = request.result
          .transaction([GAME_TYPE_SITUATION])
          .objectStore(GAME_TYPE_SITUATION);

        problemStore.getAll().onsuccess = e => {
          const problems = (e.target as IDBOpenDBRequest).result;

          resolve(problems);
        };
      }
    };
  });
};
