import { useEffect, useState } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { getImages } from '../../API/gallery';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import s from './ImageGallery.module.css';

export const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { hits } =
          q &&
          (await getImages({
            q,
            page,
          }));

        setImages(prev => [...prev, ...hits]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (q) {
      getData();
    }
  }, [page, q]);

  const handleSearchText = text => {
    // this.setState({ q: text, images: [], page: 1 });
    setQ(text);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = e => {
    // this.setState(prevState => ({ page: prevState.page + 1 }));
    setPage(prev => prev + 1);
  };

  const openModal = url => {
    // this.setState({ url, modal: true });
    setUrl(url);
    setModal(true);
    window.addEventListener('keydown', onWindowEscape);
  };
  const onWindowEscape = e => {
    // console.log(e.code);
    if (e.code === 'Escape') {
      closeModal();
      window.removeEventListener('keydown', onWindowEscape);
    }
  };
  const closeModal = () => {
    // this.setState({ modal: false });
    setModal(false);
  };

  return (
    <div>
      {modal && <Modal url={url} close={closeModal} />}
      {error && <h1>{error}</h1>}
      <Searchbar onSubmit={handleSearchText} />
      {isLoading && <Loader />}
      <ul className={s.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            previewURL={image.previewURL}
            tags={image.tags}
            url={image.largeImageURL}
            openModal={openModal}
          />
        ))}
      </ul>
      {images.length >= 12 && <Button handleLoadMore={handleLoadMore} />}
    </div>
  );
};
