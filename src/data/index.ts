import { Problem } from '@/atoms/problem';

type CreateIndexedDBProp = {
  problems: Problem[];
};

export const createIndexedDB = ({ problems }: CreateIndexedDBProp) => {
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
    db.createObjectStore('problem');
  };

  /**
   * 저장소 내 에러 처리
   */
  request.onerror = e => console.error(e);

  /**
   * 트랜잭션(DB 상태 변화) 핸들링
   */
  request.onsuccess = e => {
    db = (e.target as IDBOpenDBRequest).result;

    const transaction = db.transaction(['problem'], 'readwrite');

    // 문제 생성
    const problemStore = transaction.objectStore('problem');

    problems &&
      problems.map(problem => {
        const modifiedProblem = {
          ...problem,
          content: JSON.stringify(problem.content),
          choice: JSON.stringify(problem.choice),
        };

        problemStore.add(modifiedProblem);
      });

    // 트랜잭션 완료
    transaction.oncomplete = () => {
      console.log('Transaction completed.');
    };

    // 트랜잭션 에러
    transaction.onerror = error => {
      console.error('Transaction error:', error);
    };
  };
};
