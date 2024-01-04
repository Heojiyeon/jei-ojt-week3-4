import { Image } from '@/types/Image';
import axios from 'axios';

const { VITE_BASE_URL, VITE_TOKEN } = import.meta.env;

export const getImages = async () => {
  // 과목 전체 이미지 불러오기
  const images = await axios
    .get(`${VITE_BASE_URL}/editor/image/A1`, {
      headers: {
        Authorization: `Bearer ${VITE_TOKEN}`,
      },
    })
    .then(res => {
      return res.data;
    });

  return images;
};

// 히나의 이미지 가져오기
export const getTargetImage = async (image: Image) => {
  const images = await axios
    .get(`${VITE_BASE_URL}/images/A1/${image.imageId}.${image.extension}`, {
      headers: {
        Authorization: `Bearer ${VITE_TOKEN}`,
      },
    })
    .then(res => {
      return res.config.url;
    });

  return images;
};
