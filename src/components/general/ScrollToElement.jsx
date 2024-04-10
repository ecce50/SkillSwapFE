import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ScrollToElement() {
  const { id } = useParams();
  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [id]);

  return null;
}

export default ScrollToElement;