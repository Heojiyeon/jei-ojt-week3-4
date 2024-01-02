import mock_circle from '@/assets/images/mock_circle.png';
import { ChoiceOptionContent } from '@/types/Choice';

export const CHOICES: ChoiceOptionContent[] = [
  {
    id: 0,
    order: 1,
    name: 'mock_circle',
    imageUrl: mock_circle,
    isCorrect: true,
  },
  {
    id: 1,
    order: 2,
    name: 'mock_circle',
    imageUrl: mock_circle,
    isCorrect: false,
  },
  {
    id: 2,
    order: 3,
    name: 'mock_circle',
    imageUrl: mock_circle,
    isCorrect: false,
  },
];
