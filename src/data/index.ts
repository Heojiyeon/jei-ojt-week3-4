import { Problem } from '@/atoms/problem';

export const createIndexedDB = () => {
  const idxDB = window.indexedDB;

  if (!idxDB) {
    alert('indexedDB를 지원하지 않는 브라우저입니다!');
    return;
  }

  let db: IDBDatabase;
  const request = idxDB.open('content');

  /**
   * 저장소 내 objectStore 생성
   */
  request.onupgradeneeded = e => {
    db = (e.target as IDBOpenDBRequest).result;
    db.createObjectStore('number-game');
    db.createObjectStore('situation-game');
  };

  /**
   * 저장소 내 에러 처리
   */
  request.onerror = e => console.error(e);
};

/**
 * 문제 저장하는 함수
 */
type addIndexedDBProp = {
  gameType: string;
  problems: Problem[];
};

export const addIndexedDB = ({ gameType, problems }: addIndexedDBProp) => {
  const idxDB = window.indexedDB;

  if (!idxDB) {
    alert('indexedDB를 지원하지 않는 브라우저입니다!');
    return;
  }

  let db: IDBDatabase;
  const request = idxDB.open('content');
  /**
   * 트랜잭션(DB 상태 변화) 핸들링
   */

  request.onsuccess = e => {
    db = (e.target as IDBOpenDBRequest).result;

    if (gameType === 'number-game') {
      const transaction = db.transaction(['number-game'], 'readwrite');
      const numberGameStore = transaction.objectStore('number-game');

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
        console.log('Transaction completed.');
      };

      // 트랜잭션 에러
      transaction.onerror = error => {
        console.error('Transaction error:', error);
      };
    } else if (gameType === 'situation-game') {
      const transaction = db.transaction(['situation-game'], 'readwrite');
      const situationGameStore = transaction.objectStore('situation-game');

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
        console.log('Transaction completed.');
      };

      // 트랜잭션 에러
      transaction.onerror = error => {
        console.error('Transaction error:', error);
      };
    }
  };
};

/**
 * 문제 가져오는 함수
 */
type getIndexedDBProp = {
  gameType: string;
};

export const getIndexedDB = ({ gameType }: getIndexedDBProp) => {
  const idxDB = window.indexedDB;

  if (!idxDB) {
    alert('indexedDB를 지원하지 않는 브라우저입니다!');
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
      if (gameType === 'number-game') {
        const problemStore = request.result
          .transaction(['number-game'])
          .objectStore('number-game');

        problemStore.getAll().onsuccess = e => {
          const problems = (e.target as IDBOpenDBRequest).result;

          resolve(problems);
        };
      } else if (gameType === 'situation-game') {
        const problemStore = request.result
          .transaction(['numbsituationer-game'])
          .objectStore('situation-game');

        problemStore.getAll().onsuccess = e => {
          const problems = (e.target as IDBOpenDBRequest).result;

          resolve(problems);
        };
      }
    };
  });
};
